import { CERTIFICATE_REGISTRY, type CertificateRecord } from '../data/shaData';
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

export interface SubmissionResult {
  referenceId: string;
  persistedToSupabase: boolean;
}

function generateReference(prefix: string): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-2026-${num}`;
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
  const referenceId = generateReference('SHA-MEM');

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
  const referenceId = generateReference('SHA37-REG');

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
  const referenceId = generateReference('NCPR-SEAT');

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
