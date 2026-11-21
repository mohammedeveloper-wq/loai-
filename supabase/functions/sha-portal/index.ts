import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

function required(value: unknown, label: string, max = 300): string {
  if (typeof value !== "string") throw new Error(`${label} is required`);
  const result = value.trim();
  if (!result || result.length > max) throw new Error(`${label} is invalid`);
  return result;
}

function email(value: unknown): string {
  const result = required(value, "Email", 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) throw new Error("Email is invalid");
  return result;
}

function reference(prefix: string): string {
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 24).toUpperCase();
  return `${prefix}-${new Date().getUTCFullYear()}-${random}`;
}

function getServiceKey(): string {
  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (legacy) return legacy;
  try {
    const secretKeys = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    const envName = secretKeys.default;
    if (typeof envName === "string") {
      const value = Deno.env.get(envName);
      if (value) return value;
    }
  } catch {
    // Fall through to the legacy alias.
  }
  const fallback = Deno.env.get("SUPABASE_SECRET_KEY");
  if (fallback) return fallback;
  throw new Error("Supabase server key is not configured");
}

const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseAdmin = createClient(supabaseUrl, getServiceKey(), {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function requireUser(req: Request) {
  const auth = req.headers.get("Authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) throw new Error("Authentication required");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new Error("Authentication required");
  return data.user;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const action = required(body.action, "Action", 80);

    if (action === "verify-certificate") {
      const id = required(body.certId, "Certificate ID", 80).toUpperCase();
      const { data, error } = await supabaseAdmin
        .from("ncpr_certificates")
        .select("id, holder_name_en, holder_name_ar, course, center_en, center_ar, issued_date, expiry_date, status")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return json({ record: data });
    }

    if (action === "membership-submit") {
      const referenceId = reference("SSSH-MEM");
      const { error } = await supabaseAdmin.from("membership_applications").insert({
        reference_id: referenceId,
        tier_id: required(body.tierId, "Membership tier", 80),
        full_name: required(body.fullName, "Full name", 200),
        scfhs_id: required(body.scfhsId, "SCFHS ID", 80),
        institution: typeof body.institution === "string" ? body.institution.trim().slice(0, 200) : "",
        email: email(body.email),
      });
      if (error) throw error;
      return json({ referenceId, persistedToSupabase: true });
    }

    if (action === "congress-submit") {
      const referenceId = reference("SSSH27-REG");
      const { error } = await supabaseAdmin.from("congress_registrations").insert({
        reference_id: referenceId,
        delegate_pass: required(body.delegatePass, "Delegate pass", 80),
        full_name: required(body.fullName, "Full name", 200),
        email: email(body.email),
      });
      if (error) throw error;
      return json({ referenceId, persistedToSupabase: true });
    }

    if (action === "course-submit") {
      const referenceId = reference("SSSH-SEAT");
      const { error } = await supabaseAdmin.from("ncpr_course_reservations").insert({
        reference_id: referenceId,
        course_code: required(body.courseCode, "Course code", 80),
        center_code: required(body.centerCode, "Center code", 80),
        center_name: required(body.centerName, "Center name", 200),
        session_date: required(body.sessionDate, "Session date", 80),
        trainee_name: required(body.traineeName, "Trainee name", 200),
        email: email(body.email),
      });
      if (error) throw error;
      return json({ referenceId, persistedToSupabase: true });
    }

    if (action === "newsletter-subscribe") {
      const { error } = await supabaseAdmin.from("newsletter_subscribers").upsert(
        { email: email(body.email) },
        { onConflict: "email" },
      );
      if (error) throw error;
      return json({ persistedToSupabase: true });
    }

    if (action === "invoice-lookup") {
      const invoiceId = required(body.invoiceId, "Invoice reference", 100).toUpperCase();
      const { data, error } = await supabaseAdmin
        .from("payment_transactions")
        .select("invoice_id, item_title, full_name, total_sar, payment_method, status, created_at")
        .eq("invoice_id", invoiceId)
        .maybeSingle();
      if (error) throw error;
      const receipt = data
        ? {
            invoiceId: data.invoice_id,
            itemTitle: data.item_title,
            fullName: data.full_name,
            totalSar: Number(data.total_sar),
            paymentMethod: data.payment_method,
            status: data.status,
            date: String(data.created_at).slice(0, 10),
            persistedToSupabase: true,
          }
        : null;
      return json({ receipt });
    }

    if (action === "payment-create") {
      const registrationType = required(body.registrationType, "Registration type", 30);
      const paymentMethod = required(body.paymentMethod, "Payment method", 30);
      if (!["course", "symposium", "membership"].includes(registrationType)) {
        throw new Error("Registration type is invalid");
      }
      if (!["mada_card", "sadad", "apple_pay"].includes(paymentMethod)) {
        throw new Error("Payment method is invalid");
      }
      const subtotalSar = Number(body.subtotalSar);
      const discountSar = Number(body.discountSar);
      const vatSar = Number(body.vatSar);
      const totalSar = Number(body.totalSar);
      if (![subtotalSar, discountSar, vatSar, totalSar].every(Number.isFinite) ||
          subtotalSar < 0 || discountSar < 0 || vatSar < 0 || totalSar < 0 ||
          Math.abs(totalSar - (subtotalSar - discountSar + vatSar)) > 0.02) {
        throw new Error("Payment amounts are invalid");
      }

      const invoiceId = reference("INV-SSSH");
      // No payment gateway is connected yet. Never report card or wallet payments as paid.
      const status = paymentMethod === "sadad" ? "Pending SADAD" : "Pending Payment";
      const methodLabel = paymentMethod === "sadad"
        ? "SADAD Biller 904"
        : paymentMethod === "apple_pay" ? "Apple Pay" : "mada / Credit Card";
      const fullName = required(body.fullName, "Full name", 200);
      const { error } = await supabaseAdmin.from("payment_transactions").insert({
        invoice_id: invoiceId,
        registration_type: registrationType,
        item_code: required(body.itemCode, "Item code", 100),
        item_title: required(body.itemTitle, "Item title", 250),
        full_name: fullName,
        email: email(body.email),
        phone: typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "",
        scfhs_id: typeof body.scfhsId === "string" ? body.scfhsId.trim().slice(0, 80) : "",
        payment_method: methodLabel,
        subtotal_sar: subtotalSar,
        discount_sar: discountSar,
        vat_sar: vatSar,
        total_sar: totalSar,
        status,
      });
      if (error) throw error;
      return json({
        receipt: {
          invoiceId,
          itemTitle: body.itemTitle,
          fullName,
          totalSar,
          paymentMethod: methodLabel,
          status,
          date: new Date().toISOString().slice(0, 10),
          persistedToSupabase: true,
        },
      });
    }

    if (action === "site-content-save" || action === "site-content-reset") {
      const user = await requireUser(req);
      if (!body.value || typeof body.value !== "object" || Array.isArray(body.value)) {
        throw new Error("Site content is invalid");
      }
      const { error } = await supabaseAdmin.from("site_content").upsert(
        {
          key: "main",
          value: body.value,
          updated_at: new Date().toISOString(),
          updated_by: user.id,
        },
        { onConflict: "key" },
      );
      if (error) throw error;
      return json({ savedToSupabase: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    const status = message === "Authentication required" ? 401 : 400;
    console.error("sha-portal error:", error);
    return json({ error: status === 401 ? message : message }, status);
  }
});
