import { MetadataRoute } from 'next'
import { getStoryblokApi } from '@/lib/storyblok'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.mrsnackz.com'
  
  let productUrls: MetadataRoute.Sitemap = []
  try {
    const storyblokApi = getStoryblokApi()
    const { data } = await storyblokApi.get('cdn/stories/products', {
      version: 'draft',
    })
    const products = data?.story?.content?.products || []
    productUrls = products.map((product: any) => ({
      url: `${baseUrl}/products/${product._uid}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (err) {
    // Continue with static pages if API is unreachable
  }
 
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/story`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    ...productUrls,
  ]
}
