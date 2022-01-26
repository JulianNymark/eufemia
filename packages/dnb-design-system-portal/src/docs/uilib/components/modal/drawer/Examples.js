/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
// import styled from '@emotion/styled'

export const ModalExampleDrawerHeader = () => (
  <ComponentBox data-visual-test="modal-drawer-header">
    {() => /* jsx */ `
<Modal
  mode="drawer"
  trigger_text="Open Drawer"
>
  <Modal.Bar>
    <Breadcrumb />
  </Modal.Bar>
  <Modal.Header>
    <H1 size="x-large" bottom>
      Title
    </H1>
    <P bottom>This is a lorem ipsum dolor</P>
    <Button bottom size="large" right>
      Lorem ipsum
    </Button>
    <Button bottom size="large" variant="secondary">
      Dolor sit
    </Button>
    <FormStatus state="info">This is a lorem ipsum dolor</FormStatus>
    <Tabs
      id="unique-linked-id"
      data={[
        {
          title: 'One',
          key: 'one',
        },
        {
          title: 'Two',
          key: 'two',
        },
      ]}
    />
  </Modal.Header>
  <Modal.Content>
    <Tabs.Content id="unique-linked-id">
      {({ title }) => {
        return (
          <H2>{title}</H2>
        )
      }}
    </Tabs.Content>
    <P top>
      Elementum eu suspendisse sit platea elit porttitor
      magna laoreet ad ultrices tempus urna curae parturient
      conubia quisque viverra eget vestibulum neque pulvinar
      semper vulputate id dis varius pellentesque nunc
      egestas risus amet mus aptent luctus imperdiet netus
      natoque cubilia mattis nostra proin ornare scelerisque
      sodales faucibus placerat sem bibendum pretium rutrum
      vitae sociis ligula inceptos morbi quam mi sed pharetra
      fermentum tortor ullamcorper ipsum tellus eros euismod
      volutpat nisl dui lectus fames suscipit phasellus
      praesent justo mollis montes velit taciti gravida lacus
      commodo senectus feugiat lorem etiam consequat
      penatibus cum hendrerit accumsan orci potenti purus
      nulla interdum metus sollicitudin magnis libero sapien
      habitant non class ridiculus consectetur congue nec
      litora sociosqu aliquet felis in rhoncus nascetur odio
      ultricies nullam a iaculis massa nisi ante nam cras
      aenean erat facilisi vivamus ut cursus auctor arcu
      lobortis himenaeos dictum habitasse tristique mauris at
      blandit sagittis nibh dignissim condimentum per integer
      duis lacinia malesuada est adipiscing maecenas donec
      eleifend turpis dictumst dapibus tempor fusce aliquam
      torquent hac ac curabitur venenatis et tincidunt augue
      porta vehicula enim facilisis posuere primis molestie
      convallis diam vel fringilla dolor leo quis diam cursus
      massa sapien tristique cum senectus sed tortor natoque
      amet hendrerit ut fusce ipsum quis
    </P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleDrawerBasic = () => (
  <ComponentBox data-visual-test="modal-drawer-basic">
    {() => /* jsx */ `
<Modal
  mode="drawer"
  title="Drawer Title"
  trigger_text="Open Drawer"
>
  <Modal.Content>
    <P top>This is a left aligned Drawer content.</P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)

export const ModalExampleCloseByCallback = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal mode="drawer" hide_close_button title="Title">
  {({ close }) => (
    <>
      <Button text="Close by callback" on_click={close} />
    </>
  )}
</Modal>
	`}
  </ComponentBox>
)

export const DrawerRealLifeExample = () => (
  <ComponentBox>
    {() => /* jsx */ `
<Modal mode="drawer" title="Velg hvilke kontoer du vil se på forsiden" trigger_text="Open Drawer">
  <Modal.Header>
    <P>Disse endringene er globale og vil gjelde for appen vår også.</P>
  </Modal.Header>
  <Modal.Content>
    <P>Elementum eu suspendisse sit platea elit porttitor
      magna laoreet ad ultrices tempus urna curae parturient
      conubia quisque viverra eget vestibulum neque pulvinar
      semper vulputate id dis varius pellentesque nunc
    </P>
  </Modal.Content>
</Modal>
	`}
  </ComponentBox>
)