---
showTabs: true
---

## Properties

| Properties                                  | Description                                                                                                                                                                                                                                                                            |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `selected_key`                              | _(optional)_ in case one of the tabs should be opened by a `key`.                                                                                                                                                                                                                      |
| `align`                                     | _(optional)_ to align the tab list on the right side `align="right"`. Default to `left`.                                                                                                                                                                                               |
| `content_style`                             | _(optional)_ to enable the visual helper `.dnb-section` on to the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.                                                                                    |
| `content_spacing`                           | _(optional)_ to modify the `spacing` onto the content wrapper. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `true`.                                                                                                        |
| `tabs_style`                                | _(optional)_ to enable the visual helper `.dnb-section` inside the tabs list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `null`.                                                                                         |
| `tabs_spacing`                              | _(optional)_ to modify the `spacing` inside the tab list. Use a supported modifier from the [Section component](/uilib/components/section/properties). Defaults to `false`.                                                                                                            |
| `tab_element`                               | _(optional)_ define what HTML element should be used. You can provide e.g. `tab_element={GatsbyLink}` – you may then provide the `to` property inside every entry (`data={[{ to: 'url', ... }]}`). Defaults to `<button>`.                                                             |
| `data`                                      | _(required)_ defines the data structure to load as a JSON. e.g. `[{title: '...', content: 'Current tab', key                                                                                                                                                                           | hash: '...'}]` |
| `children` or `content`                     | _(required)_ the content to render. Can be a function, returning the current tab content `(key) => ('Current tab')`, a React Component or an object with the keys and content `{key1: 'Current tab'}`.                                                                                 |
| `prerender`                                 | _(optional)_ if set to `true`, the Tabs content will pre-render all contents. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Defaults to `false`.                                                                                             |
| `prevent_rerender`                          | _(optional)_ if set to `true`, the Tabs content will stay in the DOM. The visibility will be handled by using the `hidden` and `aria-hidden` HTML attributes. Similar to `prerender`, but in contrast, the content will render once the user is activating a tab. Defaults to `false`. |
| `scroll`                                    | _(optional)_ if set to `true`, the content will scroll on tab change, until all tabs will be visible on the upper side of the browser window view. Defaults to `false`.                                                                                                                |
| `no_border`                                 | _(optional)_ if set to `true`, the default horizontal border line under the tablist will be removed. Defaults to `false`.                                                                                                                                                              |
| `nav_button_edge`                           | _(optional)_ if set to `true`, the navigation icons will have a straight border at their outside. This feature is meant to be used when the Tabs component goes all the way to the browser window. Defaults to `false`.                                                                |
| `skeleton`                                  | _(optional)_ if set to `true`, an overlaying skeleton with animation will be shown.                                                                                                                                                                                                    |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                                                                                                                                                                  |

## Key

The key can be a string or a number.
But if the key is a number (integer), we have to deliver the content directly in the tab item:

```js
const tabsDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> },
]
```

## Example Data

```js
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' },
]
```

## Current tab

The current Tab content can be a `string`, a function returning content or a `React component`.
