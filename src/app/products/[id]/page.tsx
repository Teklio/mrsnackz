import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { getStoryblokApi } from "@/lib/storyblok";
import { Metadata } from "next";

async function getProductById(id: string) {
    try {
        const storyblokApi = getStoryblokApi();
        const { data } = await storyblokApi.get("cdn/stories/products", {
            version: "draft",
        });
        const sbProducts = data?.story?.content?.products || [];
        const found = sbProducts.find((p: any) => p._uid === id || p.title?.toLowerCase().replace(/\s+/g, '-') === id);
        if (found) {
            const imageList = Array.isArray(found.image)
                ? found.image.map((img: any) => typeof img === "string" ? img : img?.filename).filter(Boolean)
                : (Array.isArray(found.images) ? found.images : []);
            const primaryImage = (Array.isArray(found.image) ? found.image[0]?.filename : found.image?.filename) || imageList[0] || "";

            return {
                ...found,
                price: parseInt(found.price) || 0,
                rating: found.rating || 5.0,
                image: { filename: primaryImage },
                images: imageList.length > 0 ? imageList : (primaryImage ? [primaryImage] : []),
                gram: found.gram || found.weight || "",
                features: Array.isArray(found.features)
                    ? found.features
                    : (typeof found.features === 'string' ? found.features.split('\n').filter(Boolean) : [])
            };
        }
    } catch (err) {
        // Silently continue
    }
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductById(id);

    if (product) {
        return {
            title: `${product.title} | Mrsnackz`,
            description: product.description,
        };
    }
    return {
        title: "Product Not Found | Mrsnackz",
    };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <main className="min-h-screen pt-28 bg-[#FEF9F2] flex flex-col items-center justify-center">
                <Header />
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <p className="text-zinc-500 mb-8">We couldn't find the snack you're looking for.</p>
                <a href="/products" className="text-[#F39200] font-bold hover:underline">Back to products</a>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-28 bg-[#FEF9F2]">
            <Header />
            <ProductDetail product={product} />
            <Footer />
        </main>
    );
}
