# FocusFlow

> **A calmer daily desk for people who want to protect attention and finish meaningful work.**

FocusFlow is a responsive, client-side task workspace built around a **Quiet Ledger** design system. It treats everyday planning as an editorial paper ritual rather than a noisy productivity dashboard: warm ruled sheets, ink-navy structure, handwritten-style annotations, and **Verdigris Note** active states guide the experience.

## What it includes

| Area | Included experience |
| --- | --- |
| Daily desk | A prioritised task page with focus prompts, a completion meter, context tags, and a clear separation between open and settled work. |
| Task actions | Create, complete, filter, search, and remove tasks directly in the browser. |
| Persistence | Tasks are stored in the browser’s local storage, so current work remains after a refresh on the same device and browser. |
| Alternate views | A task list, a seven-day calendar view, and lightweight attention insights are available from the workspace rail. |
| Responsive layout | The binder spine becomes a mobile navigation drawer, while the task desk adapts for narrow screens. |
| Visual system | Contemporary stationery details, including ruled pages, paper tabs, clipped notes, ink marks, and a custom FocusFlow mark. |

## Technology

FocusFlow is a static frontend built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS 4**. It does not require a backend service or database for the current version.

## Run locally

First install the project dependencies, then start the Vite development server.

```bash
pnpm install
pnpm dev
```

The terminal will print the local address. To run the project’s checks and create a production build, use:

```bash
pnpm check
pnpm build
```

## How to use the workspace

Use **Add task** or **Capture a thought** to add a new item. Choose its urgency level, then send it to the desk. Click the circular check mark to settle an item, use the filter chips to narrow the paper, and enter a keyword in the task finder to search titles, notes, and contexts.

> Task data is held locally in the browser. Clearing browser storage, using another browser, or changing devices will not carry the current list across in this version.

## Deployment

The project is configured for the included managed hosting workflow. In the project management interface, create or select a checkpoint and choose **Publish**. You may then configure the hosted address and, if needed, a custom domain from the project settings.

The source is maintained in the private GitHub repository: [bilel11111/focusflow](https://github.com/bilel11111/focusflow).

## Suggested next improvements

The next useful increment would be authentication and cloud synchronization, which would let a person keep the same task list across devices. Recurring tasks, due-date reminders, and drag-and-drop ordering would then expand the planning workflow without changing the product’s quieter character.

## Design direction

The chosen direction is **The Quiet Ledger**, a contemporary editorial-stationery interface. The guiding rule is simple: each major surface should reinforce the paper-planner metaphor with ruled lines, sheet layers, margin annotations, clipped tabs, and ink-like marks rather than generic application chrome.

## License

This project is currently maintained as a private repository. Add a license before distributing or accepting external contributions.

