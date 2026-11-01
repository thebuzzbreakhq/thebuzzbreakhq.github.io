// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// IMPORTANT: `site` is the single source of truth for canonical URLs, the
// sitemap, OpenGraph tags and the RSS feed.
//
// It currently points at the free GitHub Pages URL so the live site is correct
// from day one. When the custom domain is connected, do two things:
//   1. change the value below to  https://thebuzzbreak.com
//   2. add a file  public/CNAME  containing a single line:  thebuzzbreak.com
// Everything else (canonical, sitemap, OG, RSS) updates automatically.
const SITE = 'https://thebuzzbreak.com';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Headlines / on-screen text.
			provider: fontProviders.google(),
			name: 'Space Grotesk',
			cssVariable: '--font-heading',
			weights: [500, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		{
			// Body / captions.
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-body',
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-sans-serif', 'system-ui', 'sans-serif'],
		},
	],
});
