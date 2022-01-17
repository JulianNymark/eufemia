/**
 * ATTENTION: This file is auto generated by using "prepareTemplates".
 * Do not change the content!
 *
 */

/**
 * Library Index template to autogenerate all the components and extensions
 * Used by "prepareTemplates"
 */

import { registerElement } from '../shared/component-helper'

// import all the available components
import Accordion from './accordion/Accordion'
import Autocomplete from './autocomplete/Autocomplete'
import Avatar from './avatar/Avatar'
import Badge from './badge/Badge'
import Breadcrumb from './breadcrumb/Breadcrumb'
import Button from './button/Button'
import Checkbox from './checkbox/Checkbox'
import DatePicker from './date-picker/DatePicker'
import Dropdown from './dropdown/Dropdown'
import FormLabel from './form-label/FormLabel'
import FormRow from './form-row/FormRow'
import FormSet from './form-set/FormSet'
import FormStatus from './form-status/FormStatus'
import GlobalError from './global-error/GlobalError'
import GlobalStatus from './global-status/GlobalStatus'
import Heading from './heading/Heading'
import HelpButton from './help-button/HelpButton'
import Icon from './icon/Icon'
import IconPrimary from './icon-primary/IconPrimary'
import Input from './input/Input'
import InputMasked from './input-masked/InputMasked'
import Logo from './logo/Logo'
import Modal from './modal/Modal'
import NumberFormat from './number-format/NumberFormat'
import Pagination from './pagination/Pagination'
import ProgressIndicator from './progress-indicator/ProgressIndicator'
import Radio from './radio/Radio'
import Section from './section/Section'
import Skeleton from './skeleton/Skeleton'
import Slider from './slider/Slider'
import Space from './space/Space'
import StepIndicator from './step-indicator/StepIndicator'
import Switch from './switch/Switch'
import Tabs from './tabs/Tabs'
import Tag from './tag/Tag'
import Textarea from './textarea/Textarea'
import ToggleButton from './toggle-button/ToggleButton'
import Tooltip from './tooltip/Tooltip'

// define / export all the available components
export {
  Accordion,
  Autocomplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  FormLabel,
  FormRow,
  FormSet,
  FormStatus,
  GlobalError,
  GlobalStatus,
  Heading,
  HelpButton,
  Icon,
  IconPrimary,
  Input,
  InputMasked,
  Logo,
  Modal,
  NumberFormat,
  Pagination,
  ProgressIndicator,
  Radio,
  Section,
  Skeleton,
  Slider,
  Space,
  StepIndicator,
  Switch,
  Tabs,
  Tag,
  Textarea,
  ToggleButton,
  Tooltip,
}

export const getComponents = () => {
  return {
    Accordion,
    Autocomplete,
    Avatar,
    Badge,
    Breadcrumb,
    Button,
    Checkbox,
    DatePicker,
    Dropdown,
    FormLabel,
    FormRow,
    FormSet,
    FormStatus,
    GlobalError,
    GlobalStatus,
    Heading,
    HelpButton,
    Icon,
    IconPrimary,
    Input,
    InputMasked,
    Logo,
    Modal,
    NumberFormat,
    Pagination,
    ProgressIndicator,
    Radio,
    Section,
    Skeleton,
    Slider,
    Space,
    StepIndicator,
    Switch,
    Tabs,
    Tag,
    Textarea,
    ToggleButton,
    Tooltip,
  }
}

let webComponentsAreEnabled = false
export const enableWebComponents = () => {
  if (webComponentsAreEnabled) return false
  webComponentsAreEnabled = true
  const components = getComponents()
  // register this component to work with custom element
  for (const c in components) {
    if (components?.[c]?.tagName) {
      registerElement(
        components[c].tagName,
        components[c],
        components[c].defaultProps
      )
    }
  }
}
