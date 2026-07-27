import type { Metadata } from "next";
import HeroAdmin from "./HeroAdmin";

export const metadata: Metadata = {
  title: "Hero Dashboard | BYD Cebu",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <HeroAdmin />;
}
