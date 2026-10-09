import Link from "next/link";
import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`brand${footer ? " brand-footer" : ""}`} href="/" aria-label="SK Securities home">
      <span className="brand-mark" aria-hidden="true">
        <Image src="/images/sk-securities-logo.png" alt="" width={48} height={48} priority />
      </span>
      <span className="brand-copy">
        <strong>SK Securities</strong>
        <span>PRIVATE LIMITED</span>
      </span>
    </Link>
  );
}
