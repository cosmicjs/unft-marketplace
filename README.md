## Build an uNFT marketplace with Next.js, Cosmic and Stripe integration

For building this uNFT marketplace app we are going to use Next.js, Cosmic, and Stripe. After we are done, you will be equipped with a foundation to build your own ideas and projects using these powerful, modern tools.

## Tools we’ll be using

[Next.js](https://nextjs.org/) - scalable and high-performance **React.js** framework for modern web development. Provides a large set of features, such as hybrid rendering, route prefetching, automatic image optimization, and internationalization, out of the box.
[Cosmic](https://www.cosmicjs.com/) - fast, fully managed [headless CMS](https://www.cosmicjs.com/headless-cms) that enables us to quickly manage and create website content including UGC (user-generated content).
[Stripe](https://stripe.com/) - payments infrastructure that provides API tools to receive one-time and subscription payments.

### TL;DR

[Check out the code](https://github.com/cosmicjs/unft-marketplace)
[View the live demo](https://unft-marketplace-cosmicjs.vercel.app/)
[Install the App Template](https://www.cosmicjs.com/apps/unft-marketplace)

![template](https://imgix.cosmicjs.com/f4ec2670-0089-11ed-b9bb-f5281b8ef713-Cosmic-uNFT.gif)

## Getting started

```bash
git clone https://github.com/cosmicjs/unft-marketplace.git
cd unft-marketplace
npm install
# or
yarn
```

## Environment Variables

You'll need to create an .env file in the root of the project. Log in to [Cosmic](https://app.cosmicjs.com/) and from **Bucket Settings > API Access** take the following values:

```bash
//.env
NEXT_PUBLIC_COSMIC_BUCKET_SLUG=your_cosmic_slug
NEXT_PUBLIC_COSMIC_READ_KEY=your_cosmic_read_key
COSMIC_WRITE_KEY=your_cosmic_write_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

The same way log in to [Stripe](https://dashboard.stripe.com/) and **for developers** section take your keys.

## Then run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Deploy on Vercel

<p>Use the following button to deploy to <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">Vercel</a>. You will need to add your Bucket API access keys as environment variables. Find these in <em>Bucket Settings &gt; API Access</em><em>.</em></p>
<p>
<a href="https://vercel.com/import/git?c=1&s=https://vercel.com/import/git?c=1&s=https://github.com/cosmicjs/nextjs-restaurant-website-cms&env=COSMIC_BUCKET_SLUG,COSMIC_READ_KEY" rel="noopener noreferrer" target="_blank"><img src="https://cdn.cosmicjs.com/d3f0d5e0-c064-11ea-9a05-6f8a16b0b14c-deploy-to-vercel.svg" style="width: 100px;" class="fr-fic fr-dib fr-fil"></a>
</p>

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Your feedback and contributions are welcome!