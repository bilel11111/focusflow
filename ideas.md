# FocusFlow — Design Exploration

## Three directions

### 1. The Quiet Ledger
**Very Brief Intro:** A warm editorial workspace that makes planning feel like arranging a thoughtful paper journal. Its calm material cues encourage deliberate attention rather than frantic productivity.

**Probability:** 0.07

### 2. Signal Garden
**Very Brief Intro:** A luminous dark interface where task progress behaves like a living landscape. It feels atmospheric and optimistic without becoming a generic neon dashboard.

**Probability:** 0.03

### 3. Transit Studio
**Very Brief Intro:** A compact, high-contrast operational board inspired by wayfinding systems and public timetables. It brings crisp visual momentum to busy workdays.

**Probability:** 0.09

---

# Selected Direction: The Quiet Ledger

## Design Movement

**Contemporary editorial stationery**: the tactility and calm hierarchy of a well-made paper planner translated into an adaptive digital workspace.

## Core Principles

1. **Plan at a human pace.** Generous breathing room, low visual noise, and explicit task priority help people decide what matters next.
2. **Make progress tangible.** Fine ruled lines, paper-like panels, and inked checkmarks turn abstract task management into a reassuring physical ritual.
3. **Prioritize with contrast, not clutter.** One deep ink color and a small family of semantic pigments create hierarchy without a grid of competing widgets.
4. **Reveal the day as a sequence.** The main board follows a vertical rhythm of intention, focus, and completion rather than a conventional card-grid dashboard.

## Color Philosophy

The canvas is **warm oat paper**, which lowers the intensity of a screen-bound planning session. **Ink navy** carries durable structure and readability. The signature **Verdigris Note** green signals the present, active progress, and an intermittent **terracotta** accent makes due dates and high-priority items unmistakable. The colors should feel printed, not emitted.

## Layout Paradigm

An asymmetric **desk spread**: a narrow left rail acts as a personal notebook spine; the central column reads as a daily sheet; a right-hand field of smaller “margin notes” surfaces calendar and habits. On small screens, the spine becomes a compact header and the margin notes become a horizontal strip.

## Signature Elements

- A dark **binder-spine rail** with a vertical date stamp and oversized, offset brand mark.
- Soft **paper sheets** with a low-contrast rule-line texture and occasional clipped-corner tabs.
- Rounded-square **ink checkmarks** and small hand-drawn-style underline strokes that mark focus and completion.

## Interaction Philosophy

Every interaction should feel like handling a personal planner: checking a task gently settles its text; adding a task opens a concise writing surface; filters shift the visible page content rather than presenting an app-like wall of controls. Keyboard flows remain instant, clear, and accessible.

## Animation

Use a 160–220ms custom ease-out for task state changes, hover lifts, and drawers. Completed tasks crossfade into a muted ink tone while the check icon has a restrained 0.95-to-1 scale response. The daily sheet and rail appear with a short staggered upward fade on load, only when reduced motion is not requested. No looping or ornamental animation.

## Typography System

**DM Serif Display** is reserved for the date, selected task title, and reflective statements; it gives the page its editorial humanism. **Manrope** is the operational sans for labels, controls, statistics, and task copy. Title scale is deliberately dramatic (42–58px desktop); interface labels are compact, tracked uppercase; body text uses 14–16px and comfortable line-height.

## Brand Essence

**FocusFlow is a calmer daily desk for people who want to protect attention and finish meaningful work.**

Personality: **considered, encouraging, composed**.

## Brand Voice

The voice is precise, quietly supportive, and never performative. Headlines name the next useful action; controls speak in short, natural verbs.

Examples:

> “Make room for what matters.”

> “Capture the next thing before it interrupts you.”

## Wordmark & Logo

The mark is an offset, solid **F** built from two interlocking paper tabs: one vertical ink stroke and a folded verdigris corner. It appears without text in the rail and favicon, while the wordmark combines a custom-style serif “Focus” with a restrained sans “Flow”.

## Signature Brand Color

**Verdigris Note — #0C8B78**. This is FocusFlow’s unmistakable active-state color.

## Style Decisions

- Decorative imagery must read as paper, ink, folded tabs, printed inserts, or softly photographed stationery; glossy dashboard-photo treatments are excluded.
- The FocusFlow mark must read immediately as an offset paper-tab “F”, paired with a visibly contrasting serif “Focus” and restrained sans “Flow”.
- Every major content surface must reinforce the planner metaphor with ruled paper, sheet layering, clipped tabs, margin annotations, or ink marks rather than generic application cards.
