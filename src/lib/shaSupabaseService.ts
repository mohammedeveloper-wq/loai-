import { CERTIFICATE_REGISTRY, SAMPLE_INVOICES, type CertificateRecord } from '../data/shaData';
import { supabase } from './supabase';

export interface MembershipApplicationPayload {
  tierId: string;
  fullName: string;
  scfhsId: string;
  institution: string;
  email: string;
}

export interface CongressRegistrationPayload {
  delegatePass: string;
  fullName: string;
  email: string;
}

export interface CourseReservationPayload {
  courseCode: string;
  centerCode: string;
  centerName: string;
  sessionDate: string;
  traineeName: string;
  email: string;
}

export interface PaymentTransactionPayload {
  registrationType: 'course' | 'symposium' | 'membership';
  itemCode: string;
  itemTitle: string;
  fullName: string;
  email: string;
  phone: string;
  scfhsId: string;
  paymentMethod: 'mada_card' | 'sadad' | 'apple_pay';
  subtotalSar: number;
  discountSar: number;
  vatSar: number;
  totalSar: number;
}

export interface PaymentReceiptRecord {
  invoiceId: string;
  itemTitle: string;
  fullName: string;
  totalSar: number;
  paymentMethod: string;
  status: 'Paid' | 'Pending SADAD';
  date: string;
  persistedToSupabase?: boolean;
}

export interface SubmissionResult {
  referenceId: string;
  persistedToSupabase: boolean;
}

const LOCAL_INVOICES_KEY = 'sssh_payment_receipts_v1';

function generateReference(prefix: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-2026-${num}`;
}

function formatPaymentMethodLabel(method: PaymentTransactionPayload['paymentMethod']): string {
  if (method === 'sadad') return 'SADAD Biller 904';
  if (method === 'apple_pay') return 'Apple Pay';
  return 'mada / Credit Card';
}

export async function verifyNcprCertificate(certId: string): Promise<CertificateRecord | null> {
  const normalized = certId.trim().toUpperCase();
  if (!normalized) return null;

  if (supabase) {
    const { data, error } = await supabase
      .from('ncpr_certificates')
      .select('id, holder_name_en, holder_name_ar, course, center_en, center_ar, issued_date, expiry_date, status')
      .eq('id', normalized)
      .maybeSingle();

    if (!error && data) {
      return {
        id: data.id,
        holderName: { en: data.holder_name_en, ar: data.holder_name_ar },
        course: data.course,
        center: { en: data.center_en, ar: data.center_ar },
        issuedDate: data.issued_date,
        expiryDate: data.expiry_date,
        status: data.status === 'Renewal Due' ? 'Renewal Due' : 'Valid',
      };
    }
  }

  return CERTIFICATE_REGISTRY.find((r) => r.id.toUpperCase() === normalized) ?? null;
}

export async function signInMemberWithEmail(email: string): Promise<{ sent: boolean; errorMessage?: string }> {
  if (!supabase) {
    return { sent: true };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email.trim(),
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    return { sent: false, errorMessage: error.message };
  }

  return { sent: true };
}

export async function submitMembershipApplication(
  payload: MembershipApplicationPayload
): Promise<SubmissionResult> {
  const referenceId = generateReference('SSSH-MEM');

  if (supabase) {
    const { error } = await supabase.from('membership_applications').insert({
      reference_id: referenceId,
      tier_id: payload.tierId,
      full_name: payload.fullName.trim(),
      scfhs_id: payload.scfhsId.trim(),
      institution: payload.institution.trim(),
      email: payload.email.trim(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { referenceId, persistedToSupabase: true };
  }

  return { referenceId, persistedToSupabase: false };
}

export async function submitCongressRegistration(
  payload: CongressRegistrationPayload
): Promise<SubmissionResult> {
  const referenceId = generateReference('SSSH27-REG');

  if (supabase) {
    const { error } = await supabase.from('congress_registrations').insert({
      reference_id: referenceId,
      delegate_pass: payload.delegatePass,
      full_name: payload.fullName.trim(),
      email: payload.email.trim(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { referenceId, persistedToSupabase: true };
  }

  return { referenceId, persistedToSupabase: false };
}

export async function submitCourseReservation(
  payload: CourseReservationPayload
): Promise<SubmissionResult> {
  const referenceId = generateReference('SSSH-SEAT');

  if (supabase) {
    const { error } = await supabase.from('ncpr_course_reservations').insert({
      reference_id: referenceId,
      course_code: payload.courseCode,
      center_code: payload.centerCode,
      center_name: payload.centerName,
      session_date: payload.sessionDate,
      trainee_name: payload.traineeName.trim(),
      email: payload.email.trim(),
    });

    if (error) {
      throw new Error(error.message);
    }

    return { referenceId, persistedToSupabase: true };
  }

  return { referenceId, persistedToSupabase: false };
}

export async function submitPaymentTransaction(
  payload: PaymentTransactionPayload
): Promise<PaymentReceiptRecord> {
  const invoiceId = generateReference('INV-SSSH');
  const status: PaymentReceiptRecord['status'] =
    payload.paymentMethod === 'sadad' ? 'Pending SADAD' : 'Paid';
  const methodLabel = formatPaymentMethodLabel(payload.paymentMethod);
  const date = new Date().toISOString().slice(0, 10);

  const receipt: PaymentReceiptRecord = {
    invoiceId,
    itemTitle: payload.itemTitle,
    fullName: payload.fullName.trim(),
    totalSar: payload.totalSar,
    paymentMethod: methodLabel,
    status,
    date,
    persistedToSupabase: false,
  };

  try {
    const existingRaw = localStorage.getItem(LOCAL_INVOICES_KEY);
    const existing: PaymentReceiptRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    localStorage.setItem(LOCAL_INVOICES_KEY, JSON.stringify([receipt, ...existing].slice(0, 20)));
  } catch {
    // Ignore localStorage quota issues
  }

  if (supabase) {
    const { error } = await supabase.from('payment_transactions').insert({
      invoice_id: invoiceId,
      registration_type: payload.registrationType,
      item_code: payload.itemCode,
      item_title: payload.itemTitle,
      full_name: payload.fullName.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      scfhs_id: payload.scfhsId.trim(),
      payment_method: methodLabel,
      subtotal_sar: payload.subtotalSar,
      discount_sar: payload.discountSar,
      vat_sar: payload.vatSar,
      total_sar: payload.totalSar,
      status,
    });

    if (error) {
      throw new Error(error.message);
    }

    receipt.persistedToSupabase = true;
  }

  return receipt;
}

export async function lookupInvoiceById(invoiceQuery: string): Promise<PaymentReceiptRecord | null> {
  const normalized = invoiceQuery.trim().toUpperCase();
  if (!normalized) return null;

  if (supabase) {
    const { data, error } = await supabase
      .from('payment_transactions')
      .select('invoice_id, item_title, full_name, total_sar, payment_method, status, created_at')
      .eq('invoice_id', normalized)
      .maybeSingle();

    if (!error && data) {
      return {
        invoiceId: data.invoice_id,
        itemTitle: data.item_title,
        fullName: data.full_name,
        totalSar: Number(data.total_sar),
        paymentMethod: data.payment_method,
        status: data.status === 'Pending SADAD' ? 'Pending SADAD' : 'Paid',
        date: String(data.created_at).slice(0, 10),
        persistedToSupabase: true,
      };
    }
  }

  try {
    const existingRaw = localStorage.getItem(LOCAL_INVOICES_KEY);
    const localList: PaymentReceiptRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
    const localMatch = localList.find((r) => r.invoiceId.toUpperCase() === normalized);
    if (localMatch) return localMatch;
  } catch {
    // Ignore storage read error
  }

  const sampleMatch = SAMPLE_INVOICES.find((s) => s.invoiceId.toUpperCase() === normalized);
  return sampleMatch ?? null;
}

export async function subscribeNewsletter(email: string): Promise<{ persistedToSupabase: boolean }> {
  if (supabase) {
    const { error } = await supabase.from('newsletter_subscribers').upsert(
      {
        email: email.trim().toLowerCase(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      throw new Error(error.message);
    }

    return { persistedToSupabase: true };
  }

  return { persistedToSupabase: false };
}
