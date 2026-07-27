import type { Metadata } from "next";
import Showroom from "./Showroom";

export const metadata: Metadata = {
  title: "BYD IL Corso with Ron Corona | Explore BYD Vehicles",
  description:
    "Explore the latest BYD electric and Super DM-i vehicles available in the Philippines, then request a personalized proposal from Ron Corona at BYD IL Corso.",
};

export default function Home() {
  return <Showroom />;
}
