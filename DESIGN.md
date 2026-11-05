---
name: Awesome Kanban Board
description: A working Kanban board drawn as a signed engineering sheet in diazo-print indigo.
colors:
  primary: "#1f2a6b"
  primary-hover: "#2f3d8f"
  on-primary: "#ffffff"
  shell: "#1f2a6b"
  shell-line: "#5a68b8"
  on-shell: "#ffffff"
  on-shell-muted: "#c9d0ee"
  revision: "#b82a1a"
  danger: "#b82a1a"
  danger-hover: "#96200f"
  on-danger: "#ffffff"
  bg: "#e9edf5"
  surface: "#fbfcfe"
  surface-muted: "#dde3f0"
  text: "#101536"
  text-muted: "#454e7c"
  line: "#1f2a6b"
  line-soft: "#aeb7d4"
  scrim: "rgba(16, 21, 54, 0.6)"
  primary-negative: "#c7d0ff"
  primary-hover-negative: "#dde3ff"
  on-primary-negative: "#0e1433"
  revision-negative: "#ff9d8a"
  danger-negative: "#ff9d8a"
  danger-hover-negative: "#ffb9aa"
  on-danger-negative: "#0e1433"
  bg-negative: "#0e1433"
  surface-negative: "#151c45"
  surface-muted-negative: "#1e2758"
  text-negative: "#e9edfb"
  text-muted-negative: "#aeb7de"
  line-negative: "#8e9ce6"
  line-soft-negative: "#3b4682"
typography:
  display:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1.35
  headline:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.2
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 800
    lineHeight: 1.2
  title-block-value:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
    lineHeight: 1.35
  card-title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.35
  control:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.35
  meta:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.35
  hint:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.35
  measure:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: "22px"
  measure-small:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1.35
  measure-large:
    fontFamily: "Overpass Mono, ui-monospace, monospace"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: 1.35
rounded:
  none: "0px"
spacing:
  xxs: "4px"
  xs: "6px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "24px"
  sheet: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
    height: "38px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
    height: "38px"
  button-secondary-hover:
    backgroundColor: "{colors.surface-muted}"
  button-add:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
    height: "38px"
  button-add-hover:
    backgroundColor: "{colors.surface}"
  button-danger:
    backgroundColor: "transparent"
    textColor: "{colors.danger}"
    typography: "{typography.control}"
    rounded: "{rounded.none}"
    padding: "7px 14px"
    height: "38px"
  button-danger-hover:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "7px 10px"
    height: "38px"
  task-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  done-stamp:
    backgroundColor: "transparent"
    textColor: "{colors.revision}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 6px"
  dimension-value:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.text}"
    typography: "{typography.measure}"
    padding: "0 8px"
    height: "22px"
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.none}"
    padding: "16px 24px 24px"
    width: "560px"
  header:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.on-shell}"
    typography: "{typography.title}"
    padding: "0 32px"
    height: "56px"
  title-block:
    backgroundColor: "{colors.shell}"
    textColor: "{colors.on-shell}"
    typography: "{typography.meta}"
    padding: "12px 24px"
---

# Design System: Awesome Kanban Board

## Overview

**Creative North Star: "The Signed Drawing"**

The board is a signed engineering sheet in diazo print: work is measured, the author is named, limits are written as notes. Flat indigo fields hold the header and the title block, and the sheet between them is a tinted whiteprint ground drawn in 1.5px indigo line. Every column count is a dimension line, and the sheet closes on a title block that says who drew it.

The density is that of a working tool, not a showcase. Controls are standard web controls in square outlines, type stays at working sizes, and the only flourish in the whole system is functional: during a drag, the dimension lines strike their old count and write the new one in revision red. The dark theme is the same sheet in negative, reached by swapping token values alone.

The system rejects the category's default arrangement of a coloured canvas carrying white rounded cards. Depth comes from line weight, emphasis from line and ink colour, and motion stays short and exists only to confirm a measurement.

**Key Characteristics:**
- Flat indigo shell above and below a tinted paper sheet
- Linework instead of shadows, and square corners everywhere
- Overpass for words, Overpass Mono for measured values
- Revision red as the only colour besides indigo
- Column counts drawn as live dimension lines
- A title block that signs the sheet and states its limits

## Colors

One indigo family carries paper, ink, and line, and one revision red marks everything that needs a second look.

### Primary
- **Diazo Indigo** (#1f2a6b positive, #c7d0ff negative): Filled primary actions, text selection, and the caret. Hover lifts it to #2f3d8f positive and #dde3ff negative. Text on it is white in positive and Cyanotype Ground in negative.

### Secondary
- **Revision Red** (#b82a1a positive, #ff9d8a negative): High priority, overdue dates, revised measurements during a drag, the Done stamp, validation errors, and invalid field borders.
- **Danger** (#b82a1a positive, #ff9d8a negative): The same ink under a separate role for destructive buttons, deepening on hover to #96200f positive and #ffb9aa negative.

### Neutral
- **Shell Indigo** (#1f2a6b in both themes): The header and title-block fields. It does not invert.
- **Shell Line** (#5a68b8): Hairline dividers in the title block and the hover fill on header controls.
- **On-Shell White** (#ffffff) and **On-Shell Lilac** (#c9d0ee): Values and labels on the shell, at 13.1:1 and 8.6:1.
- **Whiteprint Ground** (#e9edf5 positive) and **Cyanotype Ground** (#0e1433 negative): The sheet itself.
- **Paper White** (#fbfcfe positive, #151c45 negative): Cards, inputs, the modal, the profile card, and menus.
- **Tinted Paper** (#dde3f0 positive, #1e2758 negative): The active drop column, secondary hover, and profile rows.
- **Ink** (#101536 positive, #e9edfb negative): Body text and titles.
- **Faded Ink** (#454e7c positive, #aeb7de negative): Hints, card metadata, and placeholders, at no less than 6.2:1 on any ground.
- **Drawing Line** (#1f2a6b positive, #8e9ce6 negative): All structural linework, control outlines, and the focus ring.
- **Construction Line** (#aeb7d4 positive, #3b4682 negative): The scrollbar, the empty-column outline, and the rule under the profile list. It sits at 1.7:1 and 2.0:1 on the ground, so it never carries meaning alone.
- **Scrim** (rgba(16, 21, 54, 0.6)): The modal backdrop in both themes.

### Named Rules
**The Flat Indigo Field Rule.** The header and the title block are solid Shell Indigo in both themes. They are the only large colour fields on the sheet, with no gradient, texture, or image.

**The Revision Red Rule.** Red is ink, not paint: it marks text, lines, and outlines on a mark-up, and it fills a shape only on the hover of a destructive button. It is never a brand colour or a resting fill.

**The Negative Sheet Rule.** Dark theme is a change of token values on the root and nothing else. Components carry no theme-specific styles.

## Typography

**Display Font:** Overpass (with system-ui, sans-serif)
**Body Font:** Overpass (with system-ui, sans-serif)
**Label/Mono Font:** Overpass Mono (with ui-monospace, monospace)

**Character:** Overpass descends from highway signage, so it reads as public, engineered lettering rather than editorial type. Overpass Mono is its measuring hand: the same voice set to a fixed pitch for numbers. The font request loads Overpass at 400, 600, and 800, and Overpass Mono at 500 only.

### Hierarchy
- **Display** (800, 40px, 1.35): The large line on the 404 and crash screens.
- **Headline** (800, 26px, 1.2): The profile card heading.
- **Title** (800, 22px, 1.2): Column titles, the modal title, and the header name, which sits on the body line height and drops to 15px at 1.1 on phones.
- **Title-block value** (800, 20px, 1.35): The signature in the title block, falling to 16px on phones.
- **Card title** (600, 16px, 1.3): Task titles, which wrap anywhere instead of truncating.
- **Body** (400, 16px, 1.35): Default text and field values.
- **Control** (600, 15px): Button labels. Menu items use the same size at 400.
- **Label** (600, 14px): Field labels and title-block labels.
- **Meta** (400, 14px): Card metadata, hints beside the search field, and title-block notes, which are capped at 75ch.
- **Hint** (400, 13px): Field hints and, at 600, field errors.
- **Measure** (500, 15px on a 22px line): The count inside a dimension line.
- **Measure small** (500, 13px): Due dates on cards.
- **Measure large** (500, 20px): Status counts and the version number in the title block.

### Named Rules
**The Measuring Hand Rule.** Overpass Mono appears only on measured values: counts, dates, and version numbers. Labels, titles, and prose stay in Overpass.

**The Sentence Case Rule.** Every label is written in sentence case at default tracking. Hierarchy comes from weight and size alone.

## Layout

The app is a single sheet in a full-height column: sticky header, the working area, then a title block pushed to the bottom of the viewport however little the board holds.

The shell holds a 56px minimum height with a 32px page margin. The board shares that margin, with 20px above the toolbar and 20px between the toolbar and the columns. The search field stops at 340px and Clear examples sits beside it.

Columns sit in one row of equal tracks, at least 220px wide, with 8px of padding inside each and 8px between them. An 8px negative margin on the row keeps column content flush with the toolbar. Below 768px each column becomes 82vw of a horizontal scroller with proximity snap, so the next column always shows at the edge. The page margin narrows to 16px.

The rhythm is 4, 6, 8, 12, 16, 20, 24, and 32px, written as literal values in the stylesheets. Controls sit on their own optical insets of 7px by 10 to 14px.

The title block is a grid of notes taking the remaining width, then content-sized cells. Below 768px the notes take a full row and start collapsed, and the remaining cells share one row, tightening again below 400px. Centred single-purpose screens narrow to 380px for the profile card and 560px for the modal.

Touch devices are detected by `pointer: coarse`, not width: controls grow from 38px to 44px and cards gain a 48px drag handle.

### Named Rules
**The Left-to-Right Rule.** Columns stay in one row at every width and scroll sideways rather than wrap, so progress always reads left to right.

## Elevation & Depth

The system has no shadows at all. Depth is drawn: a surface above the sheet carries a heavier line, and the only layer that alters what is beneath it is the modal scrim. Toast shadows are explicitly removed. Transient state uses opacity: 0.4 on the card being dragged, 0.55 on columns not involved in a drag, and 0.5 on disabled buttons.

### Named Rules
**The Line Weight Rule.** Line weight is elevation. Resting surfaces and controls use 1.5px, and anything lifted above the sheet (modal, profile menu, dragged card) uses 3px. Hairlines of 1px only divide cells and lists inside a surface.

## Shapes

Every surface and control is a square-cornered rectangle, and the radius token is zero. Dimension lines end in vertical extension ticks rather than arrowheads. Icons are inline SVG line drawings at 12 to 20px with round stroke caps; the drag handle is a block of six square dots.

### Named Rules
**The Square Corner Rule.** Surfaces, controls, and focus rings are square. This binds containers only: the round caps of icon strokes and the circle of the sun icon are drawn marks, not corners.

**The Unbuilt Dash Rule.** A dashed outline marks a place where something has not been drawn yet: the Add card button and an empty column. Everything that exists is solid, and Add card turns solid on hover.

## Components

### Buttons
Square outlined actions in a single size.
- **Shape:** Square (0px), 1.5px line, 38px minimum height, 44px on touch.
- **Primary:** Diazo Indigo fill with on-primary text, lightening on hover. Used for Add, Save, Create profile, and crash recovery.
- **Secondary:** Transparent with a Drawing Line outline, gaining a Tinted Paper fill on hover.
- **Add:** Dashed outline with an inline plus, turning solid on a Paper White fill on hover.
- **Danger:** Red outline and red label at rest, filling with Danger on hover.
- **Focus / Disabled:** A 2px Drawing Line outline at 2px offset for every focusable element, on-shell white inside the shell and inset by 2px on profile menu items. Disabled buttons drop to 0.5 opacity.
- **Profile row:** A left-aligned row on Tinted Paper with a transparent outline that turns to Drawing Line on hover.

### Cards / Containers
The task card is an outline on Paper White, not a raised tile.
- **Corner Style:** Square (0px).
- **Background:** Paper White.
- **Shadow Strategy:** None. See Elevation & Depth.
- **Border:** 1.5px Drawing Line at rest, 3px while dragged, with padding reduced by 1.5px to hold the content still.
- **Internal Padding:** 10px by 12px, with 6px between the title and the metadata row.
- **Metadata:** Priority is a word, never a pill: Low in Faded Ink, Medium in Ink, High in Revision Red at 600. Overdue dates turn red and say so in words.
- **Title:** The title is the edit target, underlining on hover. The rest of the card is the drag surface, with a grab cursor.
- **Touch:** A 48px full-height handle at the right edge starts the drag, so a swipe on the card still scrolls the page.

### Done Stamp
A sign-off mark on finished cards: the word Done in a 1.5px Revision Red box, pushed to the far end of the metadata row.

### Inputs / Fields
- **Style:** Native inputs, textarea, select, and date picker in a 1.5px Drawing Line outline on Paper White, 38px minimum height, 44px on touch, 7px by 10px padding.
- **Focus:** The global 2px outline at 2px offset.
- **Error / Disabled:** Invalid fields turn the outline Revision Red, with a 13px weight 600 message below, linked to the field by its error id.
- **Labels:** Label type above the field with a 4px gap. Placeholders use Faded Ink at full opacity.

### Navigation
- **Header:** A sticky Shell Indigo band with the product name left, then the theme toggle and profile menu right. Header controls are unfilled and take a Shell Line fill on hover.
- **Profile menu:** A Paper White panel in a 3px Drawing Line, with 4px inner padding and full-width items that take Tinted Paper on hover.

### Modal
A native dialog on Paper White in a 3px Drawing Line, up to 560px wide and 32px narrower than the viewport, over the Scrim. Its header is a 22px title and a borderless 38px close button. Actions keep Delete left and Save right. The discard guard replaces that row with a plain inline question.

### Dimension Line
The signature component and the sheet's measuring instrument. Each column carries a full-width horizontal line with 14px extension ticks at both ends, in 1.5px Drawing Line, with the count centred on a mask matching the ground behind it. When a drag would change a column's count, the line and the number turn Revision Red, the old count is struck through, and the new count drops in from 6px above over 280ms. The destination column takes a Tinted Paper ground and its mask follows. Line and number recolour over 220ms, column ground and opacity over 180ms, all on `cubic-bezier(0.16, 1, 0.3, 1)`. Reduced-motion settings collapse these durations to effectively zero.

### Title Block
The drawing's sign-off, always the last thing on the sheet. A full-width Shell Indigo band of cells split by 1px Shell Line dividers: a collapsible Notes cell written in the author's first person, then Status on board screens, then Source with the linked version number, then Drawn by with the linked author name. Labels use On-Shell Lilac; values use the title-block scale, with Measure large on numbers.

### Toasts
Toasts sit top-right, 68px from the top and 16px from the right, clearing the header. They follow the app's theme and use the system's surface, text and line colours, Overpass, square corners and no shadow; the Undo action is a compact square button.

## Do's and Don'ts

### Do:
- **Do** bind every colour to a theme token so the sheet inverts without component overrides.
- **Do** draw edges with the 1.5px line token, and use 3px only for layers lifted above the sheet.
- **Do** give any new measured value Overpass Mono at weight 500, and keep its neighbouring label in Overpass.
- **Do** match a dimension value's mask to the ground behind it whenever the line sits on a new surface.
- **Do** keep every focusable element on the shared 2px outline, with on-shell white inside the shell.
- **Do** raise new controls to 44px under `pointer: coarse`, and keep drag handles to touch devices.
- **Do** state system limits as first-person notes in the title block.

### Don't:
- **Don't** return to a coloured canvas with white rounded cards.
- **Don't** add `box-shadow`, gradients, or blur to any surface. Depth is line weight.
- **Don't** round any surface, control, or focus ring.
- **Don't** fill a shape with Revision Red at rest, or show priority as a coloured pill.
- **Don't** use Construction Line for a control outline or as the only sign of a state; it stays under 3:1.
- **Don't** introduce a third hue. Indigo and revision red are the whole palette.
- **Don't** wrap columns onto a second row at any width.
- **Don't** use Overpass Mono for labels, titles, or prose.
