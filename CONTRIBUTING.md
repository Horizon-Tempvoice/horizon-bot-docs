# Contributing to Horizon Bot Docs

Thanks for your interest in contributing to the Horizon Bot documentation!

## How to contribute

### Adding new documentation

1.  New docs should be added to the `content/docs` directory as MDX files (`.mdx`).
2.  Add a frontmatter section to each file with `title` and `description`.
3.  For non-English documentation, use the `.de.mdx` (for German) or similar suffix.

### Using MDX

We use [Fumadocs](https://fumadocs.dev) which supports MDX. You can use standard Markdown as well as React components in your documentation files.

### Style Guide

- Use clear and concise language.
- Use headings correctly (H1 for title, H2 for main sections, etc.).
- Ensure all code snippets are properly formatted with language tags.

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- `pnpm` (recommended) or `npm`

### Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/horizon-bot/horizon-bot-docs.git
    cd horizon-bot-docs
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Run the development server:
    ```bash
    pnpm dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Submission Process

1.  Create a new branch for your changes: `git checkout -b feature/my-new-docs`.
2.  Commit your changes: `git commit -m 'Add documentation for X'`.
3.  Push your changes: `git push origin feature/my-new-docs`.
4.  Open a Pull Request on GitHub.

Thank you for your contributions!
