import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="bg-[#564029] text-white/80 pt-20 pb-8 px-6 w-full relative">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">

                {/* Top Section: 4 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-4">

                    {/* Column 1: Brand & Socials (takes 4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6 lg:pr-10">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/assets/logo/logo.png"
                                alt="mrsnackz"
                                width={120}
                                height={60}
                                className="h-16 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm sm:text-base leading-relaxed text-white/70 max-w-sm">
                            Bringing the authentic taste of Kerala to your
                            doorstep. Handcrafted with love since 1975.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="https://www.instagram.com/mrsnackz_?igsh=MXg1d2swa3IwcHV1Mg==" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all">
                                <FaInstagram className="w-4 h-4 text-white/80" />
                            </a>
                            <a href="https://www.facebook.com/share/1JQX42Qean/" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all">
                                <FaFacebookF className="w-4 h-4 text-white/80" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 hover:border-white/40 transition-all">
                                <FaTwitter className="w-4 h-4 text-white/80" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links (takes 2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-5">
                        <h4 className="text-sm font-bold text-white tracking-widest uppercase">Quick Links</h4>
                        <nav className="flex flex-col gap-3.5 mt-1">
                            <Link href="/" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Home</Link>
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Products</Link>
                            <Link href="/story" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Our Story</Link>
                            <Link href="/contact" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Contact</Link>
                        </nav>
                    </div>

                    {/* Column 3: Our Snacks (takes 3 cols) */}
                    <div className="lg:col-span-3 flex flex-col gap-5">
                        <h4 className="text-sm font-bold text-white tracking-widest uppercase">Our Snacks</h4>
                        <nav className="flex flex-col gap-3.5 mt-1">
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Banana Chips</Link>
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Spicy Mixture</Link>
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Tapioca Chips</Link>
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Jackfruit Chips</Link>
                            <Link href="/products" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">Sharkara Varatti</Link>
                        </nav>
                    </div>

                    {/* Column 4: Contact Us (takes 3 cols) */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <h4 className="text-sm font-bold text-white tracking-widest uppercase mb-1">Contact Us</h4>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#8A6740] flex items-center justify-center shrink-0 border border-white/5">
                                <FiMapPin className="w-4 h-4 text-[#FDE68A]" />
                            </div>
                            <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                                Malappuram Kerala<br />679322
                            </p>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#8A6740] flex items-center justify-center shrink-0 border border-white/5">
                                <FiPhone className="w-4 h-4 text-[#FDE68A]" />
                            </div>
                            <div className="flex flex-col text-white/70 text-sm sm:text-base leading-relaxed">
                                <a href="tel:8590199698" className="hover:text-[#EAB308] transition-colors">85901 99698</a>
                                <a href="tel:9539016733" className="hover:text-[#EAB308] transition-colors">95390 16733</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#8A6740] flex items-center justify-center shrink-0 border border-white/5">
                                <FiMail className="w-4 h-4 text-[#FDE68A]" />
                            </div>
                            <a href="mailto:mrsnackzgroup@gmail.com" className="text-white/70 hover:text-[#EAB308] transition-colors text-sm sm:text-base">
                                mrsnackzgroup@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="border-t border-white/10 pt-8 mt-2 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-white/50">
                    <p>© 2025 Mr. Snackz. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
