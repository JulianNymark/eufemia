/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
// import styled from '@emotion/styled'

export const ModalExampleDefault = () => (
  <ComponentBox data-visual-test="modal-trigger-default">
    {() => /* jsx */ `
<Modal title="Modal Title">
  <Modal.Content spacing style_type="mint-green">
    <P>This is the modal text. Triggered by the help button.</P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleHelpButton = () => (
  <ComponentBox data-visual-test="modal-help-button">
    {() => /* jsx */ `
<Input
  label="Input"
  placeholder="Placeholder ..."
  suffix={
    <Modal>
      <Modal.Content spacing style_type="pistachio">
        <P>Help text</P>
      </Modal.Content>
    </Modal>
  }
/>
	`}
  </ComponentBox>
)

export const ModalExampleFullscreen = () => (
  <ComponentBox data-visual-test="modal-fullscreen">
    {() => /* jsx */ `
<Modal
  title={<span className="dnb-sr-only">"Hidden" Modal title</span>}
  fullscreen="true"
  trigger_variant="tertiary"
  trigger_text="Click me"
  trigger_icon="bell"
  modal_content="This is the modal text. Triggered by a tertiary button."
/>
	`}
  </ComponentBox>
)

export const ModalExampleDelayClose = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="1s close delay"
  trigger_text="Click me"
  focus_selector=".dnb-input__input:first-of-type"
  prevent_close="true"
  hide_close_button="true"
  on_open={(e) => console.log('on_open', e)}
  on_close={(e) => console.log('on_close', e)}
  on_close_prevent={({ close, triggeredBy }) => {
    console.log('triggeredBy', triggeredBy)
    const timeout = setTimeout(close, 1e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <P>This is a Modal Window with no close button.</P>
  <P>Click outside me, and I will be closed within 1 second.</P>
  <Section top spacing style_type="divider">
    <Input label="Focus:">Focus me with Tab key</Input>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleCustomTrigger = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="Modal Title"
  trigger={(props) => <Button {...props}>Custom trigger Button</Button>}
>
  <Section spacing style_type="divider">
    <P>This Modal was opened by a custom trigger component.</P>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleStateOnly = () => (
  <ComponentBox useRender>
    {() => /* jsx */ `
const Component = () => {
  const [modalIsActive, setModalState] = React.useState(false)
  return (
    <>
      <Button
        id="custom-triggerer"
        text="Custom trigger Button"
        on_click={() => setModalState((s) => !s)}
      />
      <Modal
        title="Modal Title"
        trigger_hidden={true}
        open_state={modalIsActive}
        labelled_by="custom-triggerer"
        on_close={() => setModalState(false)}
      >
        <Section spacing style_type="divider">
          <P>This Modal was opened by a custom trigger button.</P>
        </Section>
      </Modal>
    </>
  )
}
render(<Component />)
	`}
  </ComponentBox>
)

export const ModalExampleCloseByHandler = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal
  title="Auto close"
  trigger_text="Click me"
  align_content="center"
  max_width="40rem"
  close_modal={close => {
    const timeout = setTimeout(close, 3e3)
    return () => clearTimeout(timeout) // clear timeout on unmount
  }}
>
  <Section spacing style_type="emerald-green">
    <P>This Modal will close in 3 seconds.</P>
  </Section>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleProgressIndicator = () => (
  <ComponentBox data-visual-test="modal-no-spacing">
    {() => /* jsx */ `
<Modal
  spacing={false}
  fullscreen={false}
  align_content="centered"
  hide_close_button
  trigger_text="Show"
  prevent_close={false}
  max_width="12rem"
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleModeCustom = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal mode="custom">
  <div style={{ padding: '2rem', backgroundColor: 'white' }}>
    <H1>A custom component</H1>
    <P>
      This is a Modal mode that you can use to make custom variations
    </P>
  </div>
</Modal>
	`}
  </ComponentBox>
)
