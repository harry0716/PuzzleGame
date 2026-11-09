# Art direction — Engineering Rescue Team

## Visual pillars

1. Bright campus energy: warm off-white surfaces, teal for helpful controls, coral only for faults and warnings.
2. Equipment you can read: a dark monitor is the visual stage; the surrounding interface stays light and calm.
3. One visual language: all scenes use geometric HTML/CSS artwork, consistent rounded corners, simple chip traces and small status labels. The portal previews the collectible card silhouettes; each unlocked card uses its own mint, lime, blue, orange, or violet palette.

## Palette and lighting

- Page: `#f7fbff` to `#fff9ef` to `#f2fcf8`.
- Main text: `#17354a`; secondary text: `#3e6171`.
- Action teal: `#0a8080`; mint buttons: `#6fe2c7`.
- Error coral: `#d25f65`; success green: `#0b937b`.
- Monitor: navy `#0b1023` with case-specific blue, green and gold art.

## Composition and UI

- Desktop: one monitor beside one action panel, so the cause and the effect stay visible together.
- Mobile: monitor above actions, with buttons large enough to tap and no horizontal scrolling.
- Three named steps per case at most. Show case and step progress separately. Give each case its own career card immediately after completion, then show the five-card collection.
- Use text, icon and shape together for status; no success or failure relies on color alone.

## Motion and effects

- Small hover lift and short transitions only. Disable transitions when reduced motion is requested.
- Noise and calibration visuals respond directly to the player's slider or selection.
- Decorative effects must not obscure readouts or chip defects.

## Asset origins

- All illustrations and chip motifs are original HTML/CSS shapes and Unicode symbols created for this prototype.
- No third-party images, characters, or music are included. The portal requests Google Fonts when online and falls back to system fonts offline.

## Review checks

- Inspect the opening, interaction and result views at desktop and mobile widths.
- Verify chip trace gaps, meter values, clues and controls remain distinguishable without relying only on color.
- Run the success, failure, retry and case-transition paths in a browser.
