import {
  Activity,
  ArrowUpRight,
  BookOpen,
  Building2,
  ChartNoAxesCombined,
  Grid2X2,
  Layers3,
  Scale,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { services } from "@/lib/content";

const icons = {
  chart: ChartNoAxesCombined,
  layers: Layers3,
  activity: Activity,
  scale: Scale,
  building: Building2,
  workflow: Workflow,
  grid: Grid2X2,
  book: BookOpen,
};

export function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const Icon = icons[service.icon];
  return (
    <article className="service-card">
      <div className="service-card-top">
        <span className="service-icon"><Icon size={21} strokeWidth={1.65} /></span>
        <span className="service-number">{service.number}</span>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <Link href="/services" aria-label={`Learn about ${service.title}`}>Explore service <ArrowUpRight size={15} /></Link>
    </article>
  );
}
