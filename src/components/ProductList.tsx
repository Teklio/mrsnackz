"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { FiShoppingCart, FiSearch, FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import OrderForm from "./Order";
import Link from "next/link";

export default function ProductList({ blok }: { blok?: any }) {
    const { addToCart } = useCart();
    const [selectedProduct, setSelectedProduct] = useState<{
        title: string;
        flavor: string;
        price: number;
        gram: string | string[];
        priceMapping?: Record<string, number>;
    } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    // Combine items
    let storyblokProducts = blok?.product || blok?.products || [];

    // If it's a Page component with body, look for Products in its body
    if (storyblokProducts.length === 0 && blok?.body) {
        const productsBlok = blok.body.find((b: any) => b.component === "Products");
        if (productsBlok) {
            storyblokProducts = productsBlok.product || productsBlok.products || [];
        }
    }

    const dynamicItems = storyblokProducts.map((p: any) => {
        const imageList = Array.isArray(p.image)
            ? p.image.map((img: any) => typeof img === "string" ? img : img?.filename).filter(Boolean)
            : (Array.isArray(p.images) ? p.images : []);
        const primaryImage = (Array.isArray(p.image) ? p.image[0]?.filename : p.image?.filename) ||
            (Array.isArray(p.images) ? (p.images[0]?.filename || p.images[0]) : "") ||
            "";

        return {
            ...p,
            image: { filename: primaryImage },
            images: imageList.length > 0 ? imageList : (primaryImage ? [primaryImage] : []),
            price: parseInt(p.price) || 0,
            rating: p.rating || 5.0,
            gram: p.gram || p.weight || "",
            flavor: p.flavor || "",
            category: p.category || "General"
        };
    });

    const allItems = useMemo(() => {
        return dynamicItems;
    }, [dynamicItems]);

    // Filtering logic
    const filteredItems = useMemo(() => {
        return allItems.filter((item: any) => {
            const matchesSearch = item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "All" || item.category === categoryFilter || item.flavor === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [allItems, searchQuery, categoryFilter]);

    const categories: string[] = ["All", "Masala", ...Array.from(new Set<string>(allItems.map((item: any) => String(item.category || "")))).filter(Boolean)];

    return (
        <section className="pb-12 pt-0 px-6 max-w-7xl mx-auto w-full">
            <OrderForm
                isOpen={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
                productName={selectedProduct?.title}
                productFlavor={selectedProduct?.flavor}
                productPrice={selectedProduct?.price}
                productBaseWeight={selectedProduct?.gram}
                priceMapping={selectedProduct?.priceMapping}
            />

            {/* Filters & Search Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between bg-white p-6 rounded-[32px] shadow-sm border border-black/5"
            >
                <div className="relative w-full md:max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search for snacks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-[#F39200] transition-colors"
                    />
                </div>

                <div className="flex flex-row gap-2 sm:gap-4 w-full md:w-auto pt-4 md:pt-0">
                    <div className="relative group flex-1 min-w-0">
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="appearance-none w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-2.5 sm:py-3 bg-zinc-50 border border-zinc-200 rounded-xl sm:rounded-2xl focus:outline-none focus:border-[#F39200] cursor-pointer font-medium text-zinc-700 text-xs sm:text-base truncate"
                        >
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                        <FiChevronDown className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 w-4 h-4" />
                    </div>
                </div>
            </motion.div>


            {/* Product Grid */}
            {filteredItems.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((product: any, index: number) => (
                            <motion.div
                                layout
                                key={product._uid}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{
                                    duration: 0.4,
                                    delay: index % 4 * 0.1,
                                    ease: [0.23, 1, 0.32, 1]
                                }}
                                className="bg-white rounded-[24px] sm:rounded-[32px] p-3 sm:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/[0.03] flex flex-col h-full group"
                            >

                                {/* Image Section */}
                                <div
                                    className="relative w-full aspect-[4/3] sm:aspect-square rounded-[18px] sm:rounded-[24px] overflow-hidden flex items-center justify-center mb-3 sm:mb-6"
                                    style={product.background ? { background: product.background } : { background: '#F4F4F5' }}
                                >
                                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start z-10">
                                        {product.gram && (
                                            <div className="hidden sm:block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[8px] sm:text-[10px] font-bold bg-white/80 backdrop-blur-md text-zinc-700 shadow-sm border border-black/5">
                                                {product.badge}
                                            </div>
                                        )}
                                        {product.flavor && (
                                            <div className="hidden sm:block px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full text-[8px] sm:text-xs font-bold bg-[#FACC15] text-zinc-900 shadow-sm">
                                                {product.flavor}
                                            </div>
                                        )}
                                    </div>

                                    <Image
                                        src={product.image?.filename || "/assets/logo/logo.png"}
                                        alt={product.title}
                                        width={400}
                                        height={400}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    <div className="flex items-center gap-1 sm:gap-2 mb-1.5 sm:mb-3">
                                        <div className="flex text-[#FACC15] text-[8px] sm:text-[10px]">
                                            {"★".repeat(Math.round(product.rating))}
                                            {"☆".repeat(5 - Math.round(product.rating))}
                                        </div>
                                        <span className="text-zinc-500 text-[8px] sm:text-xs font-medium">{product.rating}</span>
                                    </div>

                                    <h3 className="font-bold text-[#27272A] text-xs sm:text-lg leading-tight mb-1 sm:mb-2 line-clamp-2 sm:line-clamp-none">
                                        {product.title}
                                    </h3>

                                    <p className="text-[10px] sm:text-sm text-zinc-500 leading-relaxed sm:leading-relaxed mb-2 sm:mb-4 line-clamp-2">
                                        {product.description}
                                    </p>

                                    {/* Gram & Flavor Section (Desktop only to save mobile space) */}
                                    {(product.gram || product.flavor) && (
                                        <div className="hidden sm:flex flex-wrap gap-2 mb-6">
                                            {product.gram && (
                                                <span className="px-3 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">
                                                    {product.gram}
                                                </span>
                                            )}
                                            {product.flavor && (
                                                <span className="px-3 py-1 bg-[#FACC15]/10 border border-[#FACC15]/20 rounded-lg text-[10px] font-bold text-[#854D0E]">
                                                    {product.flavor}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Action Section */}
                                    <div className="mt-auto pt-3 sm:pt-5 border-t border-zinc-100/50">
                                        <div className="flex items-center justify-between mb-2 sm:mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tight">Price</span>
                                                <span className="font-black text-[#F39200] text-base sm:text-2xl leading-none">₹{product.price}</span>
                                            </div>
                                            <button
                                                onClick={() => addToCart({
                                                    id: product._uid,
                                                    name: product.title,
                                                    price: product.price,
                                                    image: product.image?.filename,
                                                    gram: product.gram,
                                                    flavor: product.flavor
                                                })}
                                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-[#F39200] hover:text-white hover:border-[#F39200] transition-all shadow-sm"
                                                title="Add to Cart"
                                            >
                                                <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link
                                                href={`/products/${product._uid}`}
                                                className="flex-1 h-9 sm:h-11 flex items-center justify-center rounded-xl sm:rounded-2xl border border-zinc-200 text-zinc-500 hover:border-[#F39200] hover:text-[#F39200] transition-all text-[10px] sm:text-xs font-black uppercase tracking-wider bg-white"
                                            >
                                                Details
                                            </Link>
                                            <button
                                                onClick={() => setSelectedProduct({
                                                    title: product.title,
                                                    flavor: product.flavor,
                                                    price: product.price,
                                                    gram: product.gram,
                                                    priceMapping: product.priceMapping
                                                })}
                                                className="flex-[2] h-9 sm:h-11 rounded-xl sm:rounded-2xl font-black text-white bg-[linear-gradient(90deg,#DF3920_0%,#EAB308_100%)] shadow-lg shadow-[#DF3920]/10 hover:shadow-[#DF3920]/20 active:scale-95 transition-all text-[10px] sm:text-xs uppercase tracking-wider"
                                            >
                                                Order Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-24 bg-zinc-50 rounded-[40px] border border-dashed border-zinc-200">
                    <p className="text-zinc-400 font-medium">No products found matching your criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setCategoryFilter("All"); }}
                        className="mt-4 text-[#F39200] font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </section>
    );
}
