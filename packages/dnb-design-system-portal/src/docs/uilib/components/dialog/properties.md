---
showTabs: true
---

## Properties

### `Dialog` properties

| Properties (\* = required) | Description                                                                                                                                                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `containerPlacement`       | Defines the placement on what side the Dialog should be opened. Can be set to `left`, `right`, `top` and `bottom`. Defaults to `right`.                                                                                         |
| `title`                    | The dialog title. Displays on the very top of the content.                                                                                                                                                                      |
| `minWidth`                 | The minimum Dialog content width, defined by a CSS width value like `50vw` (50% of the viewport). Be careful on using fixed `minWidth` so you don't break responsiveness. Defaults to `30rem` (average width is set to `60vw`). |
| `maxWidth`                 | The maximum Dialog content width, defined by a CSS width value like `20rem`. Defaults to `60rem` (average width is set to `60vw`).                                                                                              |
| `className`                | Give the Dialog content a class name (maps to `dnb-dialog`).                                                                                                                                                                    |
| `class`                    | Give the Dialog content a class (maps to `dnb-dialog`).                                                                                                                                                                         |
| `spacing`                  | If set to `false` then the dialog content will be shown without any spacing. Defaults to `true`.                                                                                                                                |
| `preventCoreStyle`         | By default the dialog content gets added the core style class `dnb-core-style`. Use `false` to disable this behavior.                                                                                                           |
| `navContent`               | The content which will appear in the navigation, above the header, and side-by-side the close button.                                                                                                                           |
| `headerContent`            | The content which will appear in the header of the dialog.                                                                                                                                                                      |
| `modalContent`             | The content which will appear when triggering the dialog.                                                                                                                                                                       |
| `alignContent`             | Define the inner horizontal alignment of the content. Can be set to `left`, `center`, `right` and `centered`. If `centered`, then the content will also be centered vertically. Defaults to `left`.                             |
| `fullscreen`               | If set to `true` then the dialog content will be shown as fullscreen, without showing the original content behind. Can be set to `false` to omit the auto fullscreen. Defaults to `auto`.                                       |
| `noAnimation`              | If set to `true`, no open/close animation will be shown. Defaults to false.                                                                                                                                                     |
| `noAnimationOnMobile`      | Same as `noAnimation`, but gets triggered only if the viewport width is less than `40em`. Defaults to false.                                                                                                                    |
