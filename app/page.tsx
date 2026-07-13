import LandingClient from "@/component/landing/LandingClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MediSlotBook — Find your doctor. Book today.",
  description:
    "Search by symptom, department, or doctor and book your appointment in minutes. Six departments, one directory.",
  openGraph: {
    title: "MediSlotBook — Find your doctor. Book today.",
    description:
      "Search by symptom, department, or doctor and book your appointment in minutes.",
    type: "website",
  },
};

export default function Home() {
  return <LandingClient />;
}