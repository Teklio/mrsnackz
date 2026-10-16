"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart, FiCalendar } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import OrderForm from "./Order";

import { storyblokEditable } from "@storyblok/react";

export default function Products({ blok, limit }: { blok?: any; limit?: number }) {
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<{ title: string; flavor: string; price: number; gram: string } | null>(null);

    // Retrieve Storyblok products provided via the 'blok' prop
    // Handles both singular 'product' and plural 'products' fields
    let dynamicItems = blok?.product || blok?.products || [];

    // If it's a Page component with body, look for Products in its body
    if (dynamicItems.length === 0 && blok?.body) {
        const productsBlok = blok.body.find((b: any) => b.component === "Products");
        if (productsBlok) {
            dynamicItems = productsBlok.product || productsBlok.products || [];
        }
    }

    // Show latest added products first
    dynamicItems = [...dynamicItems].reverse();

    dynamicItems = dynamicItems.map((p: any) => {
        const primaryImage = (Array.isArray(p.image) ? p.image[0]?.filename : p.image?.filename) ||
            (Array.isArray(p.images) ? (p.images[0]?.filename || p.images[0]) : "") ||
            "";
        return {
            ...p,
            image: { filename: primaryImage }
        };
    });

    let items = dynamicItems;

    const displayLimit = limit || blok?.limit;


    if (displayLimit) {
        items = items.slice(0, Number(displayLimit));
    }

    return (
        <section {...(blok ? storyblokEditable(blok) : {})} className="py-10 lg:py-10 px-6 max-w-7xl mx-auto w-full">
            <OrderForm
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct?.title}
                productFlavor={selectedProduct?.flavor}
                productPrice={selectedProduct?.price}
                productBaseWeight={selectedProduct?.gram}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center mb-16"
            >
                <div className="flex items-center gap-2 px-4 py-2 border border-[#EAB308]/30 rounded-full bg-white mb-6">
                    <FiCalendar className="w-4 h-4 text-[#EAB308]" />
                    <span className="text-[#EAB308] font-bold text-sm tracking-wide">
                        {blok?.title || "Curated Collection"}
                    </span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#27272A] leading-[1.1] tracking-tight mb-4">
                    {blok?.heading || "Authentic Kerala"} <br />
                    <span className="text-[#F39200]">{blok?.subheading || "Delights"}</span>
                </h2>

                <p className="text-base sm:text-lg text-zinc-500 max-w-2xl leading-relaxed">
                    {blok?.description || "Each snack is a journey through Kerala's rich culinary heritage, made with recipes passed down through generations."}
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((product: any, index: number) => (
                    <motion.div
                        key={product._uid}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-[32px] p-4 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] flex flex-col h-full group"
                    >

                        {/* Image Section */}
                        <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-[24px] overflow-hidden flex items-center justify-center mb-6">
                            {/* Top Badges */}
                            {/* <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                                {product.gram && (
                                    <div className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/80 backdrop-blur-md text-zinc-700 shadow-sm border border-black/5">
                                        {product.gram}
                                    </div>
                                )}
                                {product.flavor && (
                                    <div className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#FACC15] text-zinc-900 shadow-sm">
                                        {product.flavor}
                                    </div>
                                )}
                            </div> */}

                            <Image
                                src={product.image?.filename || ""}
                                alt={product.title || "Product"}
                                width={400}
                                height={400}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="flex flex-col flex-grow px-2">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex text-[#FACC15] text-[10px] sm:text-xs">
                                    {"★".repeat(Math.round(product.rating || 5))}
                                    {"☆".repeat(5 - Math.round(product.rating || 5))}
                                </div>
                                <span className="text-zinc-500 text-xs font-medium">{product.rating || "5.0"}</span>
                            </div>

                            <div className="flex justify-between items-start gap-4 mb-3">
                                <h3 className="font-bold text-[#27272A] text-lg sm:text-xl leading-tight">{product.title}</h3>
                                <span className="font-black text-[#F39200] text-xl">₹{product.price}</span>
                            </div>

                            <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-grow">
                                {product.description}
                            </p>

                            {/* Gram & Flavor Section */}
                            {(product.gram || product.flavor) && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.gram && (
                                        <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-xs font-bold text-zinc-600">
                                            {product.gram}
                                        </span>
                                    )}
                                    {product.flavor && (
                                        <span className="px-3 py-1 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-lg text-xs font-bold text-[#854D0E]">
                                            {product.flavor}
                                        </span>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-3 w-full mt-auto">
                                <button
                                    onClick={() => addToCart({
                                        id: product._uid,
                                        name: product.title,
                                        price: parseInt(product.price),
                                        image: product.image?.filename,
                                        gram: product.gram || product.weight,
                                        flavor: product.flavor
                                    })}
                                    className="w-12 sm:w-14 h-12 flex items-center justify-center shrink-0 rounded-full border-2 border-[#EAB308] text-[#EAB308] hover:bg-[#EAB308] hover:text-white transition-colors"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setSelectedProduct({
                                        title: product.title,
                                        flavor: product.flavor,
                                        price: parseInt(product.price),
                                        gram: product.gram || product.weight || "100g"
                                    })}
                                    className="flex-grow h-12 rounded-full font-bold text-white bg-[linear-gradient(90deg,#DF3920_0%,#EAB308_100%)] shadow-lg shadow-[#DF3920]/20 hover:scale-[1.02] transition-transform"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center mt-12 sm:mt-16">
                <Link href="/products" className="inline-flex items-center justify-center gap-2 border border-zinc-200 bg-white text-[#F39200] px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-zinc-50 transition-colors shadow-sm">
                    View All Products
                    <svg className="w-5 h-5 text-[#F39200]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

