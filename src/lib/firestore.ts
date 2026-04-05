import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export type BookingStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";

export interface Booking {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  device: string;
  service: string;
  location: string;
  issue?: string;
  status: BookingStatus;
  createdAt?: Timestamp;
}

export interface ContactMessage {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  device?: string;
  location?: string;
  message: string;
  smsOptIn: boolean;
  createdAt?: Timestamp;
}

export interface Review {
  id?: string;
  name: string;
  rating: number;
  text: string;
  service: string;
  location: string;
  approved: boolean;
  createdAt?: Timestamp;
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export async function createBooking(data: Omit<Booking, "id" | "createdAt" | "status">) {
  return addDoc(collection(db, "bookings"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

export async function getBookings() {
  const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking));
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  return updateDoc(doc(db, "bookings", id), { status });
}

// ─── Contact Messages ─────────────────────────────────────────────────────────

export async function createContactMessage(data: Omit<ContactMessage, "id" | "createdAt">) {
  return addDoc(collection(db, "messages"), {
    ...data,
    createdAt: serverTimestamp(),
  });
}

export async function getContactMessages() {
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ContactMessage));
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export async function getApprovedReviews() {
  const q = query(collection(db, "reviews"), where("approved", "==", true), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Review));
}

export async function getAllReviews() {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Review));
}

export async function approveReview(id: string) {
  return updateDoc(doc(db, "reviews", id), { approved: true });
}
