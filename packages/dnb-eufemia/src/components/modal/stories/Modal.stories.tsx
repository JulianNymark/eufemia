/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Global, css } from '@emotion/react'

import {
  HelpButton,
  Switch,
  Button,
  Input,
  Dropdown,
  Section,
  DatePicker,
  FormSet,
  FormRow,
  Tabs,
  FormStatus,
  ProgressIndicator,
  // Space,
  NumberFormat,
} from '../../'
import Modal from '../../modal/Modal'
import { ScrollView } from '../../../fragments'
import { H1, H2, P, Hr, Table } from '../../../elements'

export default {
  title: 'Eufemia/Components/Modal',
}

export const ModalSandbox = () => (
  <Wrapper>
    {/* <Global
      styles={css`
        :root {
          --modal-height-offset: 7rem;
        }
 `}
    /> */}

    <Box>
      <Modal title="Title">
        Posuere hac velit suscipit tempor a fames penatibus curae eget
        placerat iaculis augue tincidunt ligula etiam diam tempus pretium
        fusce primis himenaeos sem quisque facilisi mollis non congue
        rhoncus elit erat ornare litora netus orci mauris morbi mi
        dignissim quam platea id massa conubia amet eros sagittis at nisl
        varius cubilia faucibus euismod molestie torquent lacus tortor
        dictum lectus habitasse ante ultricies eleifend sed vehicula aenean
        fringilla commodo cum nostra in urna nam aptent vel pharetra
        convallis ad neque duis pulvinar vitae phasellus sociosqu ac dui
        egestas ultrices turpis hendrerit senectus sollicitudin consectetur
        odio interdum cras blandit nec est arcu
      </Modal>
    </Box>

    <Box>
      <ModalWithScrollableBox />
    </Box>

    <Box>
      <Modal
        title="1s close delay"
        trigger_text="Click me"
        focus_selector=".dnb-input__input:first-of-type"
        prevent_close="true"
        // hide_close_button="true"
        on_open={(e) => console.log('on_open', e)}
        on_close={(e) => console.log('on_close', e)}
        on_close_prevent={({ close, triggeredBy }) => {
          switch (triggeredBy) {
            case 'keyboard':
            case 'button':
              close()
              break
            case 'overlay': {
              const timeout = setTimeout(close, 1e3)
              return () => clearTimeout(timeout) // clear timeout on unmount
            }
          }
        }}
      >
        <P>This is a Modal Window with no close button.</P>
        <P>Click outside me, and I will be closed within 1 second.</P>
        <Section top spacing style_type="divider">
          <Input label="Focus:">Focus me with Tab key</Input>
        </Section>
      </Modal>
    </Box>

    <Box>
      <Modal
        // trigger_attributes={{
        //   'aria-label': 'My Label'
        // }}
        spacing={false}
        fullscreen={false}
        align_content="centered"
        hide_close_button
        trigger_text="Show"
        // prevent_close
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
      <Modal
        // trigger_attributes={{
        //   'aria-label': 'My Label'
        // }}
        spacing={false}
        fullscreen={false}
        align_content="centered"
        hide_close_button
        trigger_icon="bell"
        // prevent_close
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
    </Box>

    <Box>
      <Modal
        title="Modal Title"
        // fullscreen
        // open_state="opened"
        // no_animation
      >
        <Modal.Content spacing style_type="mint-green">
          <P>This is the modal text.</P>
        </Modal.Content>
      </Modal>
    </Box>

    <Box>
      <Input
        label="Input"
        placeholder="Placeholder ..."
        suffix={<HelpButton>Help text</HelpButton>}
      />
    </Box>

    <Box>
      <Modal
        title="Title 1"
        trigger_text="Modal in modal"
        // open_state="opened"
        style={{
          minHeight: '25rem',
        }}
      >
        <Modal
          title="Title 2 a"
          style={{
            minHeight: '15rem',
          }}
        >
          New content 2 a <Modal title="Title 3 a">New content 3 a</Modal>
        </Modal>
        <Modal
          title="Title 2 b"
          style={{
            minHeight: '15rem',
          }}
        >
          New content 2 b <Modal title="Title 3 b">New content 3 b</Modal>
        </Modal>
        {/* <FillContent /> */}
      </Modal>
    </Box>
    <Box>
      <Modal
        // min_width="90vw"
        // max_width="2rem"
        // open_state="opened"
        fullscreen
        title="Modal Title"
        trigger_variant="tertiary"
        // trigger_icon={null}
        trigger_text="Click me"
      >
        <FillContent />
      </Modal>
    </Box>
    <Box>
      <Modal
        // min_width="60vw"
        max_width="40rem"
        trigger_text="Open Modal"
        title="Modal Title"
        on_close={(e) => {
          console.log('on_close', e)
        }}
      >
        <Modal.Content spacing>
          <Hr />
          <H2 top>Some content</H2>
          <Input>Focus me with Tab key</Input>
          <Section top spacing>
            <P>
              <Switch label="Checked:" checked />
            </P>
          </Section>
        </Modal.Content>
      </Modal>
    </Box>
    <Box>
      <ModalRerenderExample />
    </Box>
    <Box>
      <ModalCloseExample />
    </Box>
    <Box>
      <ModalTriggerExample />
    </Box>
    <Box>
      <CloseWithAnimation />
    </Box>
    <Box>
      <CloseByCallback />
    </Box>
  </Wrapper>
)

export const ModalV2Sandbox = () => (
  <Modal
    openState={true}
    title="hellooo"
    triggerAttributes={{ text: 'Custom' }}
  >
    The informational content
  </Modal>
)

export const DrawerSandbox = () => (
  <Wrapper>
    <Global
      styles={css`
        /* :root {
          --modal-height-offset: 10rem;
        } */
        .custom-inner {
          padding-top: 1.5rem;
        }
      `}
    />

    <Box>
      {/* <Button variant="tertiary" text="Button" /> */}
      <Modal
        // no_animation
        // open_state="opened"
        mode="drawer"
        // fullscreen
        // container_placement="left"
        // align_content="right"
        // align_content="center"
        // drawer_offset={}
        title="Original title"
        // title={<span className="dnb-sr-only">Test</span>}
        // min_width="20vw"
        // max_width="40vw"
        // overlay_class="overlay_class"
        // content_class="content_class"
        // class="inner_class"
        // header_content={
        //   <>
        //     <P bottom>This is a lorem ipsum dolor</P>
        //     <Button bottom size="large">
        //       Lorem ipsum
        //     </Button>
        //     <Button bottom size="large" variant="secondary">
        //       Dolor sit
        //     </Button>
        //     <FormStatus state="info">
        //       This is a lorem ipsum dolor
        //     </FormStatus>
        //     <Tabs
        //       id="unique-linked-id"
        //       data={[
        //         {
        //           title: 'One',
        //           key: 'one',
        //         },
        //         {
        //           title: 'Two',
        //           key: 'two',
        //         },
        //       ]}
        //     >
        //       content
        //     </Tabs>
        //   </>
        // }
      >
        <Modal.Bar>
          <Button
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            wrap
          >
            Tilbake ipsum Praesent rutrum
          </Button>
          {/* Tilbake Lorem ipsum Praesent rutrum ipsum Praesent rutrum ipsum
          Praesent rutrum ipsum Praesent rutrum ipsum Praesent rutrum */}
        </Modal.Bar>
        <Modal.Header>
          <div>
            {/* <h1>Custom heading</h1> */}
            <H1 size="x-large" bottom>
              Custom heading
            </H1>
          </div>
          <P bottom>This is a lorem ipsum dolor</P>
          <Button bottom size="large">
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
                <>
                  <H2>{title}</H2>
                  <P top>This is a left aligned Drawer content.</P>
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
                </>
              )
            }}
          </Tabs.Content>
          <FillContent />
        </Modal.Content>
      </Modal>
    </Box>

    <Box>
      <Modal
        mode="drawer"
        title="Drawer Title"
        trigger_text="Open Drawer"
        trigger_title="Click me"
      >
        <Modal.Content>
          <P top>This is a left aligned Drawer content.</P>
        </Modal.Content>
      </Modal>
    </Box>

    <Box>
      {/* <Button variant="tertiary" text="Button" /> */}
      <Modal
        // no_animation
        // open_state="opened"
        mode="drawer"
        trigger_text="Drawer in Drawer"
        // fullscreen
        // container_placement="left"
        // align_content="right"
        // align_content="center"
        // drawer_offset={}
        title="Tertiary test"
        // title={<span className="dnb-sr-only">Test</span>}
        // min_width="20vw"
        // max_width="40vw"
        // overlay_class="overlay_class"
        // content_class="content_class"
        // class="inner_class"
      >
        <Modal.Content style_type="pistachio">
          Modal.Content
          <Modal mode="drawer" title="Title 2" open_state="opened">
            New content 2 <Modal title="Title 3">New content 3</Modal>
          </Modal>
          {/* <FillContent /> */}
        </Modal.Content>
      </Modal>
    </Box>
    <Box>
      <Modal
        mode="drawer"
        title="Top drawer"
        container_placement="top"
        modal_content="something"
      />
    </Box>
  </Wrapper>
)

class ModalRerenderExample extends React.PureComponent {
  state = {
    title: 'Modal Title',
    trigger_text: 'Open Modal',
  }
  timeout

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ title: 'New Title' })
      this.setState({ trigger_text: 'New Open Modal' })
    }, 1e3)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    return (
      <Modal
        // open_state="opened"
        trigger_text={this.state.trigger_text}
        title={this.state.title}
        // trigger_disabled
        // trigger_hidden
      >
        <Modal.Content spacing>
          {/* <Hr /> */}
          {/* <Box>
          <H2>Some content</H2>
          <Input>Focus me with Tab key</Input>
        </Box> */}
          <DatePicker label="DatePicker" right />
          <Dropdown
            label="Dropdown"
            data={dropdownData}
            right
            direction="top"
          />
          {/* <Switch label="Checked:" checked right /> */}
        </Modal.Content>
      </Modal>
    )
  }
}

const dropdownData = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: <>Brukskonto - Kari Nordmann</>,
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        44445678902
      </NumberFormat>,
      'Sparekonto - Ole Nordmann A',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        12345623902
      </NumberFormat>,
      'Sparekonto - Ole Nordmann B',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        55555672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann C',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        77775672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann D',
    ],
  },
  {
    content: [
      <NumberFormat key={15349648901} ban>
        99995672302
      </NumberFormat>,
      'Sparekonto - Ole Nordmann E',
    ],
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      <NumberFormat key={15349648901} ban>
        11345678962
      </NumberFormat>,
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    ],
  },
  {
    selected_value: <>Custom selected {'🔥'}</>,
    content: [
      <NumberFormat key={15349648901} ban>
        15349648901
      </NumberFormat>,
      <>Custom content {'🔥'}</>,
    ],
  },
]

const ModalCloseExample = () => {
  const [open_state, setOpenState] = React.useState(null)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let timeout

    if (open_state === 'opened') {
      timeout = setTimeout(() => {
        console.log('count:', count)
        setCount(count + 1)
      }, 1e3)
    }

    return () => clearTimeout(timeout)
  })

  return (
    <>
      <Button
        text="Set opened state"
        on_click={() => setOpenState('opened')}
      />
      <Modal
        // trigger_hidden
        trigger_text="Open Modal and auto close"
        title="Modal Title"
        open_state={open_state}
        open_modal={(open) => {
          const timeout = setTimeout(open, 3e3)
          return () => clearTimeout(timeout)
        }}
        // hide_close_button
        close_modal={(close) => {
          let timeout

          if (open_state !== 'opened') {
            console.log('Modal was opened')
            timeout = setTimeout(close, 3e3)
          }

          return () => clearTimeout(timeout)
        }}
        on_open={(e) => {
          console.log('on_open', e)
        }}
        on_close={(e) => {
          console.log('on_close', e)
          // clearTimeout(timeoutId)
          setOpenState('closed')
        }}
      >
        <Hr />
        <Section spacing>
          <H2>Some content {count}</H2>
          <Input>Focus me with Tab key</Input>
        </Section>
        <Section spacing>
          <P>
            <Switch label="Checked:" checked />
          </P>
        </Section>
      </Modal>
    </>
  )
}

const ModalTriggerExample = () => {
  const [count, setCount] = React.useState(0)

  return (
    <FormSet>
      <FormRow>
        <Button
          variant="secondary"
          text="Count"
          on_click={() => setCount(count + 1)}
        />

        <Button
          id="custom-triggerer"
          text="Custom trigger Button"
          on_click={() => {
            // console.log('on_click', e)
            return (
              <Modal
                title="Modal Title"
                trigger_hidden="true"
                open_state="opened"
                labelled_by="custom-triggerer"
              >
                <Section spacing style_type="divider">
                  <P>This Modal was opened by a custom trigger button.</P>
                </Section>
              </Modal>
            )
          }}
        />
        {count}
      </FormRow>
    </FormSet>
  )
}

function FillContent() {
  return (
    <>
      This is the modal text. Triggered by a tertiary button. Hac eleifend
      consectetur massa lobortis diam netus congue a nibh dolor faucibus
      vivamus taciti neque accumsan urna varius dis egestas
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        skip_portal
        // direction="top"
      />
      montes tempus tortor mi aptent enim cursus venenatis cras ornare nisl
      pretium tincidunt et imperdiet sapien luctus vel volutpat risus dui
      himenaeos nec est turpis ridiculus posuere sollicitudin nostra
      habitant torquent class laoreet rhoncus hendrerit primis curae
      malesuada dictumst cum penatibus libero viverra lorem aenean integer
      amet interdum tristique auctor vulputate quam scelerisque lacus erat
      adipiscing mus felis lacinia elementum per sed habitasse inceptos
      conubia eget mattis ultricies sodales fringilla fermentum eu sociis
      sem litora proin vestibulum ante potenti molestie phasellus praesent
      justo elit cubilia vitae rutrum suspendisse nam aliquam ipsum
      facilisi id orci nascetur eros at porttitor leo porta sagittis
      ullamcorper iaculis dapibus duis natoque pharetra tellus pellentesque
      pulvinar magnis gravida fames convallis aliquet consequat quis tempor
      dignissim suscipit commodo ut metus nunc vehicula platea mollis
      parturient blandit semper euismod non ac facilisis augue ligula magna
      placerat morbi sociosqu nullam quisque maecenas senectus ad fusce
      curabitur nulla nisi velit etiam arcu feugiat lectus ultrices dictum
      donec bibendum mauris in sit purus odio condimentum donec gravida
      sollicitudin pretium vel porttitor ut purus praesent posuere dis
      luctus tempus eget parturient mi primis massa lectus iaculis faucibus
      dictum placerat cum nisi neque ipsum risus duis adipiscing amet
      viverra blandit litora sed nulla proin ridiculus mattis dictumst
      auctor vestibulum convallis molestie tortor conubia quam semper
      ultrices commodo justo enim cursus magna aliquam erat fermentum
      inceptos felis torquent fringilla pellentesque rutrum dignissim nisl
      sociosqu varius vulputate vivamus consectetur penatibus venenatis
      potenti mauris ante ultricies hendrerit curae nunc odio aenean
      accumsan nam id natoque tincidunt aliquet malesuada tellus integer
      augue nostra turpis senectus bibendum cras magnis rhoncus aptent
      sociis class suspendisse metus eu et nec phasellus lacus condimentum
      mus fames himenaeos orci feugiat tristique nascetur arcu porta etiam
      taciti scelerisque volutpat dui imperdiet diam lorem at est quis
      habitasse vehicula ullamcorper sit sapien pharetra platea habitant
      ornare dolor quisque urna elementum ac eros curabitur nullam interdum
      velit sem lobortis hac egestas leo ad netus in per montes lacinia
      ligula maecenas elit vitae cubilia sodales laoreet facilisi dapibus
      pulvinar mollis libero morbi nibh suscipit congue euismod tempor
      consequat facilisis eleifend a fusce sagittis non aptent hendrerit
      quisque tellus consectetur fringilla curae praesent nullam vulputate
      nostra leo cum consequat sit ridiculus ad inceptos cras facilisis
      pretium natoque libero nulla interdum pellentesque viverra turpis
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        // direction="top"
      />
      vestibulum maecenas molestie dolor morbi vehicula ultrices diam quis
      velit etiam dictum feugiat sed lacinia placerat euismod magna sapien
      luctus eget tempus rutrum faucibus et suspendisse aliquam felis
      elementum netus condimentum proin habitant habitasse aenean augue per
      potenti aliquet lobortis quam commodo magnis dictumst dapibus gravida
      pharetra dis facilisi ut suscipit nam nibh odio metus varius volutpat
      fermentum massa posuere fames ipsum penatibus porta purus torquent
      nascetur mollis in cursus venenatis sociis primis arcu blandit vitae
      elit dui tincidunt urna class ante mauris integer erat phasellus nunc
      non egestas tristique vel platea risus ac eu vivamus id congue hac
      rhoncus sodales amet auctor justo neque enim laoreet malesuada lacus
      montes nec nisl ullamcorper a mi orci scelerisque sociosqu bibendum
      tempor eros iaculis nisi senectus lorem est pulvinar sagittis
      dignissim conubia donec litora curabitur ornare mattis duis ultricies
      mus cubilia sollicitudin at ligula sem imperdiet adipiscing porttitor
      convallis eleifend taciti fusce accumsan himenaeos lectus semper
      parturient tortor facilisis montes diam placerat at est hendrerit
      nunc platea mollis viverra fames luctus nam venenatis cubilia orci
      maecenas faucibus nibh pulvinar bibendum tortor nulla mauris cum
      laoreet feugiat iaculis class leo ipsum egestas nullam ridiculus
      vulputate duis sapien pretium vitae non tincidunt vel adipiscing
      blandit ligula sociosqu malesuada accumsan etiam rhoncus taciti neque
      nec mi praesent fusce pharetra cras molestie varius senectus sociis
      augue eget ante elit a sit massa tempus lorem convallis consectetur
      felis sed lacus hac tempor dignissim ultricies posuere quis
      scelerisque torquent magna amet aliquet facilisi euismod eros lacinia
      pellentesque fringilla nisi aenean ornare suspendisse parturient
      imperdiet vehicula quisque suscipit vestibulum ad metus nisl ultrices
      inceptos conubia lobortis potenti lectus phasellus habitasse
      sollicitudin habitant tristique dui ac proin odio per consequat purus
      auctor tellus erat libero in urna condimentum sem donec litora semper
      congue penatibus gravida eleifend porta porttitor dictum elementum
      nostra aliquam justo quam fermentum id primis enim dis volutpat dolor
      himenaeos dictumst sodales curae ut magnis sagittis curabitur netus
      vivamus rutrum morbi mus velit eu commodo aptent interdum et natoque
      dapibus cursus arcu mattis turpis ullamcorper risus integer nascetur
      leo rutrum iaculis neque consectetur vitae auctor sociosqu tempus
      conubia commodo semper fusce at metus morbi dolor ultrices eu rhoncus
      ridiculus facilisi platea dictumst elementum class facilisis
      consequat purus suscipit quisque cum per orci mi tincidunt mus
      himenaeos aliquet posuere eros placerat et integer venenatis lacinia
      scelerisque a aptent varius phasellus nam dapibus justo litora non
      massa laoreet fringilla porttitor condimentum enim penatibus cras
      mauris convallis donec quis ad montes pharetra nisi ac sodales
      natoque habitant hendrerit sem feugiat sapien parturient nullam
      accumsan imperdiet amet molestie egestas ultricies tortor curae dis
      vehicula nec cubilia hac porta ante velit sollicitudin pellentesque
      vivamus cursus vestibulum felis tempor diam nibh tellus torquent
      fames urna interdum vel curabitur etiam lobortis aliquam in eleifend
      libero eget congue ornare fermentum aenean arcu nostra duis inceptos
      pretium turpis ut netus bibendum dui ligula id taciti proin quam
      viverra gravida erat senectus nisl dignissim vulputate est sed ipsum
      sagittis suspendisse primis risus nunc mattis tristique dictum lorem
      magnis maecenas habitasse malesuada ullamcorper nulla sit adipiscing
      lacus luctus odio augue faucibus praesent sociis nascetur magna
      blandit euismod mollis volutpat lectus pulvinar elit potenti dapibus
      consequat fermentum consectetur viverra lacus etiam ut mollis purus
      auctor sodales vitae urna enim sollicitudin ad lorem habitant
      pulvinar magnis justo facilisis vulputate semper nam duis conubia
      nunc ridiculus nibh felis porta malesuada non quisque mattis ultrices
      integer blandit molestie elit eget elementum cum sociosqu eros
      suspendisse est mauris massa sed metus lectus rhoncus amet platea
      dolor fusce nostra orci turpis velit fames a porttitor quis mi rutrum
      inceptos volutpat phasellus ornare nisi tortor lobortis ligula
      ultricies ante proin
      <Dropdown
        label="Dropdown"
        data={dropdownData}
        right
        // direction="top"
      />
    </>
  )
}

function ModalWithScrollableBox() {
  return (
    <>
      {/* <ScrollView /> */}
      <Modal
      // fullscreen={true}
      // open_state="opened"
      >
        <SimScrollView />
      </Modal>
    </>
  )
}

function SimScrollView() {
  return (
    <div
      style={{
        width: '100%',
        // height: '100vh',
        height: '20rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'yellow',
      }}
    >
      <ScrollView
        style={{
          width: '50%',
          height: '50%',
          // overflowY: 'auto',
          maxHeight: '12rem',
        }}
      >
        <div
          style={{
            height: '62rem',
            width: '40rem',
            background: 'linear-gradient(#e66465, #9198e5)',
          }}
        />
      </ScrollView>
    </div>
  )
}

function CloseWithAnimation() {
  const [modalOpen, setModalOpen] = React.useState(false)
  return (
    <Modal
      trigger_text="CloseWithAnimation"
      hide_close_button
      open_state={modalOpen}
      on_open={() => setModalOpen(true)}
      on_close={() => setModalOpen(false)}
    >
      <Button
        text="Close from inside modal"
        on_click={() => setModalOpen(false)}
      />
    </Modal>
  )
}

function CloseByCallback() {
  return (
    <Modal mode="drawer" trigger_text="CloseByCallback" hide_close_button>
      {({ close }) => <Button text="Close by callback" on_click={close} />}
    </Modal>
  )
}

const LargeListOfTrs = () => {
  const list = []

  for (let i = 0, l = 10000; i < l; ++i) {
    // for (let i = 0, l = 4; i < l; ++i) {
    list.push(
      <tr key={i}>
        <td>Row {i} Column 1</td>
        <td>Row {i} Column 2</td>
        <td>Row {i} Column 3</td>
        <td align="right">Row {i} Column 4</td>
      </tr>
    )
  }

  return list
}

export const ModalPerformance = () => (
  <div>
    <Modal mode="drawer" trigger_text="Open Drawer" bottom>
      Content
    </Modal>

    <Table
    //  className="dnb-modal--bypass_invalidation_deep"
    >
      <caption>A Table Caption</caption>
      <thead>
        <tr>
          <th scope="col" colSpan={2} className="dnb-table--no-wrap">
            Header
          </th>
          <th
            scope="col"
            className="dnb-table--sortable dnb-table--reversed"
          >
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Sortable"
              title="Sort table column"
              wrap="true"
            />
          </th>
          <th
            scope="col"
            align="right"
            className="dnb-table--sortable dnb-table--active"
          >
            <Button
              variant="tertiary"
              icon="arrow-down"
              text="Active"
              title="Sort table column"
              wrap="true"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <p className="dnb-p" aria-hidden="true">
              Column 1 <b>width p</b> <Button text="Focus me" />
            </p>
          </td>
          <td>
            <code className="dnb-code">Column 2 with code</code>
          </td>
          <td>
            <span>Column 3 with span</span>
          </td>
          <td align="right">Column 4</td>
        </tr>
        <tr>
          <td colSpan={2}>Column which spans over two columns</td>
          <td>Column 3</td>
          <td align="right">
            Column 4 <Button text="Focus me" />
            const template ={' '}
          </td>
        </tr>
        {LargeListOfTrs}
      </tbody>
    </Table>
  </div>
)
