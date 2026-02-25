import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white" style={{ borderBottom: "1px solid #0095ff" }}>
      <div className="mx-auto flex h-14 items-center justify-between px-4">
        <div>
          <Image
            src="/images/caregp-logo.png"
            alt="care-gp-logo"
            width={120}
            height={60}
          />
        </div>

        <div></div>

        <div className="text-xl" style={{ color: "#0095ff" }}>
          Samantha Demo
        </div>
      </div>
    </header>
  );
}
