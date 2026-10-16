"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiShoppingCart, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import OrderForm from "./Order";

interface ProductDetailProps {
    product: {
        _uid: string;
        title: string;
        description: string;
        price: number;
        priceMapping?: Record<string, number>;
        image?: { filename: string } | Array<{ filename: string }> | string;
        badge?: string;
        rating: number;
        gram: string | string[];
        flavor: string;
        category: string;
        background?: string;
        images?: string[];
        origin?: string;
        oil?: string;
        shelfLife?: string;
        storage?: string;
        weight?: string;
        features?: string[];
    };
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [isOrderOpen, setIsOrderOpen] = useState(false);

    // Use product images if provided, fallback to repeating the main image
    const rawImages = (Array.isArray(product.images) && product.images.length > 0)
        ? product.images
        : (Array.isArray(product.image) && product.image.length > 0
            ? product.image
            : [typeof product.image === "object" && !Array.isArray(product.image) ? product.image?.filename : product.image].filter(Boolean));

    const images = rawImages.map((img: any) => typeof img === "string" ? img : img?.filename).filter(Boolean);
    const displayImages = images.length > 0 ? images : ["/assets/logo/logo.png"];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <OrderForm
                isOpen={isOrderOpen}
                onClose={() => setIsOrderOpen(false)}
                productName={product.title}
                productFlavor={product.flavor}
                productPrice={product.price}
                productBaseWeight={product.gram}
                priceMapping={product.priceMapping}
            />

            <Link href="/products" className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#F39200] transition-colors mb-8 group">
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-bold">Back to Collection</span>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Left: Images */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative aspect-square rounded-[40px] overflow-hidden flex items-center justify-center"
                        style={{ background: product.background || '#F4F4F5' }}
                    >
                        <Image
                            src={displayImages[selectedImage] || displayImages[0]}
                            alt={product.title}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>

                    <div className="grid grid-cols-3 gap-4">
                        {displayImages.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all bg-zinc-50 ${selectedImage === idx ? 'border-[#F39200] scale-95' : 'border-transparent hover:border-zinc-200'
                                    }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.title} thumbnail ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
                            {product.title}
                        </h1>
                        <p className="text-[#F39200] text-xl font-bold mb-6">
                            The gold standard of Kerala's snack heritage.
                        </p>
                        <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-10">
                            {(product.features || [
                                "Made with hand-selected Nendran bananas",
                                "Fried in 100% pure coconut oil",
                                "No preservatives or artificial additives",
                                "Traditional Kerala family recipe",
                                "Small-batch handcrafted preparation",
                                "Farm-fresh ingredients sourced locally"
                            ]).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-zinc-700 font-medium">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                        <FiCheck className="text-green-600 w-3.5 h-3.5" />
                                    </div>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>

                        {/* Product Details Card */}
                        <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm mb-10">
                            <h3 className="text-xs font-black tracking-widest text-zinc-400 uppercase mb-8">Product Details</h3>
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Origin</p>
                                    <p className="font-black text-zinc-900">{product.origin || "Kerala, India"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Oil Used</p>
                                    <p className="font-black text-zinc-900">{product.oil || "Pure Coconut Oil"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Shelf Life</p>
                                    <p className="font-black text-zinc-900">{product.shelfLife || "6 Months"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Storage</p>
                                    <p className="font-black text-zinc-900">{product.storage || "Cool & dry place"}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-1">Weight</p>
                                    <p className="font-black text-zinc-900">{product.weight ? (Array.isArray(product.weight) ? product.weight.join(", ") : product.weight) : (Array.isArray(product.gram) ? product.gram.join(", ") : product.gram) || "150g"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setIsOrderOpen(true)}
                                className="flex-1 py-5 rounded-2xl font-black text-white bg-[linear-gradient(90deg,#DF3920_0%,#F39200_100%)] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-[#F39200]/20 text-lg"
                            >
                                Order Now
                            </button>
                            <button
                                onClick={() => addToCart({
                                    id: product._uid,
                                    name: product.title,
                                    price: product.price,
                                    image: displayImages[0],
                                    gram: product.gram,
                                    flavor: product.flavor
                                })}
                                className="flex-1 py-5 rounded-2xl font-black text-zinc-900 bg-white border-2 border-zinc-100 hover:bg-zinc-50 hover:border-zinc-200 transition-all text-lg flex items-center justify-center gap-3"
                            >
                                <FiShoppingCart />
                                Add to Cart
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
