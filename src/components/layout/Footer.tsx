import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-midnight text-dune/50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-12 mb-12">
                    <div>
                        <Link href="/" className="text-sm uppercase tracking-[0.3em] text-dune font-sans font-light">
                            Oasis Resort
                        </Link>
                        <p className="mt-3 text-xs text-dune/40 font-sans max-w-xs leading-relaxed">
                            A private RV resort community in Osoyoos, British Columbia. Canada&rsquo;s pocket desert.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-x-16 gap-y-3 text-xs font-sans">
                        <Link href="#about" className="hover:text-dune transition-colors">Our Story</Link>
                        <Link href="#listings" className="hover:text-dune transition-colors">Real Estate</Link>
                        <Link href="#amenities" className="hover:text-dune transition-colors">Amenities</Link>
                        <Link href="#events" className="hover:text-dune transition-colors">Events</Link>
                        <Link href="#documents" className="hover:text-dune transition-colors">Documents</Link>
                        <Link href="#portal" className="hover:text-dune transition-colors">Owner Portal</Link>
                    </div>
                </div>
                <div className="border-t border-dune/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dune/30 font-sans">
                        &copy; {new Date().getFullYear()} Oasis Resort Osoyoos. All rights reserved.
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-dune/30 font-sans">
                        Designed with care
                    </p>
                </div>
            </div>
        </footer>
    );
}
