---
showTabs: true
---

import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
import ModalExample from './assets/modal-example.svg'
import ModalExampleButtons from './assets/modal-example-buttons.svg'

## Description

The Dialog component is a [Modal](/uilib/components/modal) variation that appears at the center of the screen. The Dialog has similar functionality as a traditional popup window and is mostly used for informational purposes (for example explaining a word on the page). Similar to Modal, it has to be triggered by the user to appear. Typical usage would be to read an explanation, then closing it.

### Parts in Dialog

To provide custom content to parts of the Dialog, a set of component parts are provided:

- `<Dialog.Navigation>`: The navigation field at the top of the component, default with a close button (Equal to the prop `navContent`).
- `<Dialog.Header>`: The header field of the component, where the `title` will appear (Equal to the prop `headerContent`).
- `<Dialog.Body>`: The body of the Dialog, provided with a section background color, default `black-3` (Equal to the prop `modalContent`).

### Design Patterns

The Dialog component follow these design patterns when used with `spacing`.

<InlineImg src={ModalExample} caption="Modal with header, text and close button (spacing suggestions in blue and pink)" alt="Image showing Modal with header" />

<InlineImg src={ModalExampleButtons} caption="Modal with header, text, buttons and close button" alt="Image showing Modal with header and close button" />

### More detailed information

For more details regarding the component functionality, check out the [Modal documentation](/uilib/components/modal).
