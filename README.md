<div align="center">

[![license](https://img.shields.io/badge/license-Apache%202-blue)](/LICENSE.md)
[![Follow on Twitter](https://img.shields.io/twitter/follow/inverternetwork.svg?label=follow+INVERTER)](https://twitter.com/inverternetwork)

</div>

## Inverter / Next.js Web3 Template

App Router + Chakra UI Next.js + Redux + Wagmi ( Viem ) + Dynamic + PWA + PipeLine

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

```bash
cp .env.example .env
```

Edit the `/.env` file with the necessary settings.

## Quick Start

```bash
# Install dependencies

bun i

# Run the development server

bun dev

# Run the production server

bun run build && bun start
```

## AWS Deploy Configuration

For automated processes like CI/CD using AWS CodePipeline:

1. Edit line 41 in `/.github/.workflows/aws-ecr.yml` to match your AWS ECR_REPOSITORY Name.
2. Add non `NEXT_PUBLIC_` environment variables to the env vars of the running EC2 instance.

## GitHub Secrets Configuration

For automated processes like CI/CD using GitHub Actions:

1. Navigate to your GitHub repository and access the `Settings` tab.
2. Locate the `Secrets` option in the left sidebar.
3. Use the `New repository secret` button to add new secrets.
4. Specifically, add secrets for `DYNAMIC_ID_DEV`, and `DYNAMIC_ID_PROD` .
