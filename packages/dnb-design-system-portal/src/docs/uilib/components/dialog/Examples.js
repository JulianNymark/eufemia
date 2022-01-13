/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

export const DialogExampleDefault = () => (
  <ComponentBox data-visual-test="dialog-default">
    {() => /* jsx */ `
<Dialog title="Modal Title">
  <Dialog.Body spacing styleType="mint-green">
    <P>This is the modal text. Triggered by the help button.</P>
  </Dialog.Body>
</Dialog>
	`}
  </ComponentBox>
)

export const DialogExampleHelpButton = () => (
  <ComponentBox data-visual-test="dialog-help-button">
    {() => /* jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Dialog>
      <Dialog.Body spacing styleType="pistachio">
        <P>Help text</P>
      </Dialog.Body>
    </Dialog>
  }
/>
	`}
  </ComponentBox>
)

export const DialogExampleFullscreen = () => (
  <ComponentBox data-visual-test="dialog-fullscreen">
    {() => /* jsx */ `
<Dialog
  title={<span className="dnb-sr-only">"Hidden" Dialog title</span>}
  fullscreen
  triggerAttributes={{
      variant: "tertiary",
      text: "Click me",
      icon: "bell"
  }}
  modalContent="This is the modal text. Triggered by a tertiary button."
/>
	`}
  </ComponentBox>
)

export const DialogExampleDelayClose = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Dialog
  title="1s close delay"
  triggerAttributes={{
      text: "Click me"
  }}
  focusSelector=".dnb-input__input:first-of-type"
  preventClose
  hideCloseButton
  onOpen={(e) => console.log('on_open', e)}
  onClose={(e) => console.log('on_close', e)}
  onClosePrevent={({ close, triggeredBy }) => {
    console.log('triggeredBy', triggeredBy)
    const timeout = setTimeout(close, 1e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <P>This is a Dialog with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Dialog.Body top spacing>
    <Input label="Focus:">Focus me with Tab key</Input>
  </Dialog.Body>
</Dialog>
	`}
  </ComponentBox>
)

export const DialogExampleCustomTrigger = () => (
  <ComponentBox data-visual-test="dialog-custom-trigger">
    {() => /* jsx */ `
<Dialog
  title="Modal Title"
  trigger={(props) => (
    <Button {...props} variant="primary" icon="information">Custom trigger button</Button>
  )}
>
  <Dialog.Body spacing>
    <P>This Modal was opened by a custom trigger component.</P>
  </Dialog.Body>
</Dialog>
	`}
  </ComponentBox>
)

export const DialogExampleProgressIndicator = () => (
  <ComponentBox data-visual-test="dialog-progress-indicator">
    {() => /* jsx */ `
<Dialog
  spacing={false}
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerText="Show"
  preventClose={false}
  maxWidth="12rem"
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Dialog>
	`}
  </ComponentBox>
)

export const FullDialogExample = () => (
  <ComponentBox
    data-visual-test="full-dialog"
    scope={{ handleBack: () => {} }}
  >
    {() => /* jsx */ `
<Dialog
  title="Custom title"
  >
  <Dialog.Navigation>
    <Breadcrumb onClick={handleBack} />
  </Dialog.Navigation>
  <Dialog.Header>
    <P bottom>This is a lorem ipsum dolor</P>
  </Dialog.Header>
  <Dialog.Body spacing>
    <Button bottom size="large">
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
  </Dialog.Body>
</Dialog>
`}
  </ComponentBox>
)
