import { CERTIFICATE_REGISTRY, type CertificateRecord } from '../data/shaData';
import { supabase } from './supabase';
export interface MembershipApplicationPayload { tierId:string; fullName:string; scfhsId:string; institution:string; email:string; }
export interface CongressRegistrationPayload { delegatePass:string; fullName:string; email:string; }
export interface CourseReservationPayload { courseCode:string; centerCode:string; centerName:string; sessionDate:string; traineeName:string; email:string; }
export interface PaymentTransactionPayload {
 registrationType:'course'|'symposium'|'membership'; itemCode:string; itemTitle:string; fullName:string; email:string; phone:string; scfhsId:string;
 paymentMethod:'mada_card'|'sadad'|'apple_pay'; subtotalSar:number; discountSar:number; vatSar:number; totalSar:number;
}
export interface PaymentReceiptRecord {
 invoiceId:string; itemTitle:string; fullName:string; totalSar:number; paymentMethod:string;
 status:'Paid'|'Pending SADAD'|'Pending Payment'; date:string; persistedToSupabase?:boolean;
}
export interface SubmissionResult { referenceId:string; persistedToSupabase:boolean; }
async function invokePortal<T>(action:string,payload:Record<string,unknown>={}):Promise<T>{
 if(!supabase) throw new Error('Supabase is not configured.');
 const {data,error}=await supabase.functions.invoke('sha-portal',{body:{action,...payload}});
 if(error) throw new Error(error.message||'Unable to complete request.');
 if(data?.error) throw new Error(data.error);
 return data as T;
}
export async function verifyNcprCertificate(certId:string):Promise<CertificateRecord|null>{
 const normalized=certId.trim().toUpperCase(); if(!normalized)return null;
 const {record}=await invokePortal<{record:any}>('verify-certificate',{certId:normalized});
 if(!record)return CERTIFICATE_REGISTRY.find(r=>r.id.toUpperCase()===normalized)??null;
 return {id:record.id,holderName:{en:record.holder_name_en,ar:record.holder_name_ar},course:record.course,
 center:{en:record.center_en,ar:record.center_ar},issuedDate:record.issued_date,expiryDate:record.expiry_date,
 status:record.status==='Renewal Due'?'Renewal Due':'Valid'};
}
export async function signInMemberWithEmail(email:string):Promise<{sent:boolean;errorMessage?:string}>{
 if(!supabase)return {sent:false,errorMessage:'Supabase is not configured.'};
 const {error}=await supabase.auth.signInWithOtp({email:email.trim(),options:{emailRedirectTo:window.location.origin}});
 return error?{sent:false,errorMessage:error.message}:{sent:true};
}
export async function submitMembershipApplication(payload:MembershipApplicationPayload):Promise<SubmissionResult>{
 return invokePortal('membership-submit',payload as unknown as Record<string,unknown>);
}
export async function submitCongressRegistration(payload:CongressRegistrationPayload):Promise<SubmissionResult>{
 return invokePortal('congress-submit',payload as unknown as Record<string,unknown>);
}
export async function submitCourseReservation(payload:CourseReservationPayload):Promise<SubmissionResult>{
 return invokePortal('course-submit',payload as unknown as Record<string,unknown>);
}
export async function submitPaymentTransaction(payload:PaymentTransactionPayload):Promise<PaymentReceiptRecord>{
 const {receipt}=await invokePortal<{receipt:PaymentReceiptRecord}>('payment-create',payload as unknown as Record<string,unknown>); return receipt;
}
export async function lookupInvoiceById(invoiceQuery:string):Promise<PaymentReceiptRecord|null>{
 const {receipt}=await invokePortal<{receipt:PaymentReceiptRecord|null}>('invoice-lookup',{invoiceId:invoiceQuery.trim().toUpperCase()}); return receipt;
}
export async function subscribeNewsletter(email:string):Promise<{persistedToSupabase:boolean}>{
 return invokePortal('newsletter-subscribe',{email});
}
