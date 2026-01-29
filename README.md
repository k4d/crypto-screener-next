# Crypto Screener Next

## Project Overview

This is a Next.js web application designed to function as a cryptocurrency screener. The primary goal of this application is to provide users with a tool to filter and search for cryptocurrencies based on a variety of criteria, such as market capitalization, price, and trading volume. It aims to present this data in a clear and user-friendly interface.

The project is built with a modern web stack, utilizing:

*   **Framework:** [Next.js](https://nextjs.org/) (a React framework)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [HeroUI](https://www.heroui.com/) (v3 beta)
*   **Icons:** [Heroicons](https://heroicons.com/)
*   **Linting/Formatting:** [Biome](https://biomejs.dev/)
*   **Git Hooks:** [Husky](https://typicode.github.io/husky/) + [lint-staged](https://github.com/okonet/lint-staged)
*   **Package Manager:** [Bun](https://bun.sh/)

The application architecture follows the standard Next.js App Router paradigm.

## Building and Running

### Development

To run the application in a local development environment:

1.  Install dependencies:
    ```bash
    bun install
    ```
2.  Start the development server:
    ```bash
    bun run dev
    ```

The application will be accessible at `http://localhost:3000` (or another available port).

### Production

To build and run the application in a production environment:

1.  Build the application:
    ```bash
    bun run build
    ```
2.  Start the production server:
    ```bash
    bun run start
    ```

## Development Conventions

### Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for code linting and formatting to ensure code quality and consistency.

*   To check for linting errors:
    ```bash
    bun run lint
    ```
*   To automatically format the code:
    ```bash
    bun run format
    ```

It is recommended to run these commands before committing any changes. For automatic enforcement, Git hooks are configured.

### Git Hooks (Husky + lint-staged)

This project uses [Husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged) to automate code quality checks before each commit.

*   **`pre-commit` hook:**
    *   Automatically runs `biome format --write` on staged `.{ts,tsx}` files to fix formatting issues.
    *   Then, runs `biome check --staged` on staged `.{ts,tsx}` files to check for linting errors.

This ensures that only properly formatted and lint-free code is committed to the repository.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.