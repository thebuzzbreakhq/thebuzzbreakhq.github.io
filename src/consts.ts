// Central configuration for the whole site.
// Brand, SEO, monetization and social links all live here so there is one place
// to edit. Nothing in this file should ever contain a personal name, personal
// email, or phone number — this repository is public.

// Canonical site URL. Mirrors `site` in astro.config.mjs (kept in sync via Vite's
// import.meta.env.SITE, with a literal fallback for safety).
export const SITE_URL = (import.meta.env.SITE ?? 'https://thebuzzbreak.com').replace(/\/$/, '');

export const SITE_TITLE = 'The Buzz Break';
export const SITE_DESCRIPTION =
	'The money and tech news that actually matters — explained in plain English, with the sources. No hype, no jargon.';
export const SITE_TAGLINE = 'The money and tech that actually matters.';
export const SITE_LOCALE = 'en_US';
export const SITE_LANG = 'en';

// Brand contact. A name-free alias only — never a personal address.
export const CONTACT_EMAIL = 'thebuzzbreak@proton.me';

// Handle used for Twitter / X card attribution.
export const TWITTER_HANDLE = '@thebuzzbreakhq';

// Social links for the header and footer. Delete any line for a profile that is
// not live yet so the site never ships a dead link.
export const SOCIAL_LINKS = [
	{ label: 'YouTube', key: 'youtube', href: 'https://www.youtube.com/@thebuzzbreak' },
	{ label: 'Instagram', key: 'instagram', href: 'https://www.instagram.com/thebuzzbreak' },
	{ label: 'TikTok', key: 'tiktok', href: 'https://www.tiktok.com/@thebuzzbreak' },
	{ label: 'X', key: 'x', href: 'https://x.com/thebuzzbreakhq' },
];

// Feature flags.
export const FEATURES = {
	// Display ads (Google AdSense). Keep this OFF. Brand-new sites with little
	// original content and no traffic are NOT approved for AdSense — apply only
	// once you have a dozen-plus posts and steady visitors, then flip to true.
	ads: false,
	// Email capture box.
	newsletter: true,
};

// Display-ad configuration — only used when FEATURES.ads is true.
export const ADS = {
	adsenseClient: 'ca-pub-XXXXXXXXXXXXXXXX', // your AdSense publisher ID
	slots: {
		inArticle: 'XXXXXXXXXX',
		footer: 'XXXXXXXXXX',
	},
};

// Newsletter. Buttondown by default: free tier, privacy-friendly, no tracking,
// and it needs only your username (the form posts straight to Buttondown).
// To go live: create a free account at buttondown.com and put your username
// below. MailerLite alternative is documented in the README.
export const NEWSLETTER = {
	provider: 'buttondown' as 'buttondown' | 'mailerlite',
	buttondownUsername: 'YOUR_BUTTONDOWN_USERNAME',
	mailerliteActionUrl: '', // if using MailerLite, paste the embed form's action URL here
};

// Affiliate programs. Replace the placeholder URLs with your real referral links
// (e.g. from the Ledger and Trezor affiliate programs). Leave them as-is and the
// affiliate box renders a clear "link coming soon" state instead of a dead link.
export const AFFILIATE = {
	// Shown wherever an affiliate link appears, for FTC-style disclosure.
	disclosure:
		'Some links below are affiliate links. If you buy through them we may earn a commission at no extra cost to you. It never changes what we cover.',
	partners: {
		ledger: 'YOUR-LEDGER-AFFILIATE-LINK',
		trezor: 'YOUR-TREZOR-AFFILIATE-LINK',
	},
};
