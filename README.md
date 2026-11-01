# The Buzz Break

The money and tech news that actually matters — explained in plain English, with
the sources. No hype, no jargon.

A fast, SEO-first static blog built with [Astro](https://astro.build) and hosted
free on GitHub Pages.

---

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview  # preview the built site
```

Node 22+ is required.

---

## Publish a new post

Every post is one file in `src/content/blog/`. To add the next one:

1. **Create the file.** Name it with a descriptive, URL-friendly slug — it becomes
   the post's web address:

   ```
   src/content/blog/your-post-slug.md
   ```

   The file name `your-post-slug.md` publishes at `/blog/your-post-slug/`.

2. **Add the frontmatter** at the top of the file:

   ```yaml
   ---
   title: "Your headline (also the SEO title)"
   description: "One or two sentences — this is the meta description and the social-share text."
   pubDate: 2026-11-02
   category: "Crypto"            # short section label, e.g. Crypto / Markets / AI
   tags: ["binance", "security"] # optional
   heroImage: "../../assets/your-hero.png"  # optional; see "Images" below
   heroAlt: "Plain description of the hero image for accessibility."
   ogImage: "/og/your-card.png"  # optional social-share image; defaults to /og/default.png
   draft: false                   # set true to keep it off the live site while writing
   ---
   ```

3. **Write the body** in Markdown below the frontmatter. Don't repeat the title as
   an `# H1` — the layout adds it. Use `##` and `###` for sections.

4. **Commit and push.** GitHub Actions rebuilds and deploys automatically:

   ```bash
   git add .
   git commit -m "Add post: your headline"
   git push
   ```

That's it. Reading time, the sitemap, the RSS feed, and the SEO tags are all
generated for you.

### Want an affiliate box or an in-article ad inside the post?

Use the `.mdx` extension instead of `.md` (e.g. `your-post-slug.mdx`) and import
the components at the top of the file, under the frontmatter:

```mdx
import AffiliateBox from '../../components/AffiliateBox.astro';
import AdSlot from '../../components/AdSlot.astro';
import { AFFILIATE } from '../../consts';

<AdSlot placement="in-article" />

<AffiliateBox
  title="If you decide to try X"
  intro="A short, honest framing."
  links={[
    { label: 'Product — buy direct', href: AFFILIATE.partners.ledger, note: 'buy from the official site' },
  ]}
/>
```

See the first post, `binance-6-3-billion-hack-is-your-money-safe.mdx`, for a full
working example.

---

## Images

- **Post heroes and social cards** are generated from brand templates:

  ```bash
  node scripts/generate-images.mjs
  ```

  Edit `scripts/generate-images.mjs` to add a new hero or card, then re-run it.
  Heroes go to `src/assets/` (reference them from frontmatter); social cards go to
  `public/og/`.

- **Inline charts / graphics** live in `public/img/` as SVG and are referenced in
  posts with a normal image tag, e.g. `![scale](/img/your-chart.svg)`.

Images are optimized and lazy-loaded automatically.

---

## Configuration — `src/consts.ts`

One file controls the brand, social links, and all monetization:

| Setting | What it does |
| --- | --- |
| `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_TAGLINE` | Site identity and default SEO text |
| `CONTACT_EMAIL`, `TWITTER_HANDLE` | Brand contact and card attribution |
| `SOCIAL_LINKS` | Header/footer icons — delete any profile that isn't live yet |
| `FEATURES.ads` | Master on/off switch for display ads (keep **off** for now — see below) |
| `FEATURES.newsletter` | Show the email-capture box |
| `ADS` | AdSense publisher ID + ad slot IDs |
| `NEWSLETTER` | Email provider username / form URL |
| `AFFILIATE` | Affiliate links + disclosure text |

### Affiliate links

Set your real referral URLs in `AFFILIATE.partners` (e.g. from the Ledger and
Trezor affiliate programs). Until you do, the affiliate box shows a clear
"link coming soon" state instead of a dead link. Affiliate links use
`rel="sponsored nofollow"` and are always disclosed.

### Email newsletter

The email box is wired for [Buttondown](https://buttondown.com) (free, no
tracking). Create a free account, then set `NEWSLETTER.buttondownUsername` in
`src/consts.ts`. Until it's set, the box shows a tidy "sign-up opens soon" state.
To use MailerLite instead, set `NEWSLETTER.provider` to `'mailerlite'` and paste
your embed form's action URL into `NEWSLETTER.mailerliteActionUrl`.

### Display ads — read this first

`FEATURES.ads` is **off on purpose.** Google AdSense (and most ad networks) will
**not approve a brand-new site** with little original content and no traffic. Keep
ads off, publish a dozen-plus solid posts, build some steady readership, and *then*
apply. Once you're approved, put your IDs in `ADS` and flip `FEATURES.ads` to
`true` — the in-article and footer slots are already in place.

---

## How it deploys

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on
every push to `main`. In the repository settings, **Settings → Pages → Build and
deployment → Source** must be set to **GitHub Actions**.

### Custom domain

The site is configured to publish at the GitHub Pages URL. To move it to a custom
domain once DNS is ready:

1. In `astro.config.mjs`, change `site` to `https://yourdomain.com`.
2. Add a file `public/CNAME` containing a single line: `yourdomain.com`.
3. In **Settings → Pages**, set the custom domain and enable **Enforce HTTPS**.

Canonical URLs, the sitemap, OpenGraph tags, and RSS all update from `site`
automatically.

---

© The Buzz Break. Content and brand all rights reserved.
