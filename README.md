<div align="center">

[![license](https://img.shields.io/badge/License-LGPL%20v3-blue)](/LICENSE.md)
[![Follow on Twitter](https://img.shields.io/twitter/follow/inverternetwork.svg?label=follow+INVERTER)](https://twitter.com/inverternetwork)

</div>

## Inverter / Next.js Web3 Template

A Next.js template with a focus on Web3 and DeFi applications. This template includes a variety of tools and libraries to help you get started with your project.

## Features

- App Router
- Daisy UI
- Redux / React Query
- Wagmi 2 (Viem 2)
- Dynamic 2
- Mongoose
  - Session
  - Dynamic Proxy Auth
  - Cache
  - Api Keys
  - WebHooks
- PWA
- PipeLine

## Configuration

**Install Bun**:

```bash
# Supported on macOS, Linux, and WSL

curl -fsSL https://bun.sh/install | bash

# Upgrade Bun every once in a while

bun upgrage

```

**Recommended Editor**: VsCode. For the best experience, install the Eslint and Prettier extensions.

Start by setting up your environment:

## Environment Variables

```bash
cp .env.example .env
```

Edit the `/.env` file with the necessary settings.

- You will have to optain the `NEXT_PUBLIC_DYNAMIC_ID` from [DYNAMIC XYZ APP](https://app.dynamic.xyz/)
- `MONGO_URI` - MongoDB connection string ( optional ).
- `SESSION_SECRET` - Session secret key ( optional ).
- `DYNAMIC_PUBLIC_KEY` - Dynamic public key ( optional ).

These optional settings are only required if you plan to use the Mongoose session, and Dynamic Proxy Auth features.

## Quick Start

```bash
# Install dependencies

bun i

# Run the development server

bun dev

# Run the production server

bun run build && bun start
```

## Vercel Deploy Configuration

For automated code deployments, you can use the Vercel platform. To deploy your project, you will need to set up the environment variables as mentioned in the `.env.example` file.

The optional settings are only required if you plan to use the Mongoose session, and Dynamic Proxy Auth features.

1. Navigate to the deploy section of the vercel dasboard or find the settings env vars section of an already deployed code and input the variables.
2. And you are ready to go.
