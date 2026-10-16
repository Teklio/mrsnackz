import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Products from "@/components/Products";

export const getStoryblokApi = storyblokInit({
    accessToken: process.env.STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
        Products: Products,
    },
});
