import type { Metadata } from "next";
import Showroom from "./Showroom";

export const metadata: Metadata = {
  title: "BYD Cebu | Explore BYD Vehicles",
  description:
    "Explore the latest BYD electric and Super DM-i vehicles available in the Philippines, then request a personalized proposal from a Certified Sales Consultant at BYD Cebu.",
};

export default function Home() {
  return <Showroom />;
}
