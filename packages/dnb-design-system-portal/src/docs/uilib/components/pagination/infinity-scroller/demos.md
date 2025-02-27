---
showTabs: true
---

import {
PaginationExampleInfinityLoadButton,
PaginationExampleInfinityIndicator,
PaginationExampleInfinityUnknown,
PaginationExampleInfinityTable,
} from 'Docs/uilib/components/pagination/infinity-scroller/Examples'

## Demos

### Infinity scroller with load button

A load button is shown at the bottom by having `use_load_button={true}` - but here we define our `startup_page={5}`, so we also get a load button on top.

<PaginationExampleInfinityLoadButton />

### Infinity scroller with custom load indicator

<PaginationExampleInfinityIndicator />

### Infinity scroller with unknown `page_count`

<PaginationExampleInfinityUnknown />

### Advanced Table infinity scroller

You can find the code either on [GitHub](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/Examples.js) or on [CodeSandbox](https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7)

<PaginationExampleInfinityTable />
