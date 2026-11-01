import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files from src/content/blog/.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// Short section label, e.g. "Crypto" or "Markets".
			category: z.string().default('Money'),
			tags: z.array(z.string()).default([]),
			// Hero image lives in src/assets and is optimized at build time.
			heroImage: z.optional(image()),
			heroAlt: z.string().default(''),
			// Optional social-share image path under /public (defaults to /og/default.png).
			ogImage: z.string().optional(),
			// Set true to keep a post out of the site, feed and sitemap while drafting.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
