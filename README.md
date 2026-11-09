# Share your Open Source Contributions 🤍

Create a website with an RSS feed of your recent GitHub pull requests across the Open Source projects you contribute to.

![atinux-pull-requests](https://github.com/user-attachments/assets/cfa82cc2-51af-4fd4-9012-1f8517dd370f)

Demo: https://prs.atinux.com

## Features

- List the 50 most recent pull requests you've contributed to.
- RSS feed
- Only add your GitHub token to get started
- Runs on Cloudflare Workers

## Setup

Make sure to install the dependencies with [pnpm](https://pnpm.io/installation#using-corepack):

```bash
pnpm install
```

Copy the `.env.example` file to `.env` and fill in your GitHub token:

```bash
cp .env.example .env
```

Create a GitHub token with no special scope on [GitHub](https://github.com/settings/personal-access-tokens/new) and set it in the `.env` file:

```bash
NUXT_GITHUB_TOKEN=your-github-token
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

## Deploy

Create a KV namespace for the server cache:

```bash
pnpm wrangler kv namespace create CACHE
```

Put the namespace ID in the `CACHE` binding in `wrangler.jsonc`.

Set the GitHub token as a Worker secret:

```bash
pnpm wrangler secret put NUXT_GITHUB_TOKEN
```

Optional: set the organizations to exclude as a comma-separated list:

```bash
pnpm wrangler secret put NUXT_GITHUB_EXCLUDED_ORGS
```

Build the application and deploy it to Cloudflare Workers:

```bash
pnpm run deploy
```

Build the application and run the Worker locally:

```bash
pnpm preview
```

For `pnpm preview`, put local secrets in `.dev.vars`.

## Credits

This project is inspired by [Anthony Fu](https://github.com/antfu)'s [releases.antfu.me](https://github.com/antfu/releases.antfu.me) project.

## License

[MIT](./LICENSE)
