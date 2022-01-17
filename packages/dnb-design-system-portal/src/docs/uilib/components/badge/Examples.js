/**
 * UI lib Component Example
 *
 */

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'
import {
  card as Card,
  email as Email,
  confetti as Confetti,
} from '@dnb/eufemia/src/icons'
import PaymentCard from '@dnb/eufemia/src/extensions/payment-card'

export const BadgeSizeDefault = () => (
  <ComponentBox hideCode data-visual-test="badge-size-default">
    {() => /* jsx */ `
<Badge content={1}>
  <Avatar>A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeSizeSmall = () => (
  <ComponentBox hideCode data-visual-test="badge-size-small">
    {() => /* jsx */ `
<Badge content={45} size="small">
  <Avatar size="small">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeSizeMedium = () => (
  <ComponentBox hideCode data-visual-test="badge-size-medium">
    {() => /* jsx */ `
<Badge content={123} size="medium">
  <Avatar size="medium">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeSizeLarge = () => (
  <ComponentBox hideCode data-visual-test="badge-size-large">
    {() => /* jsx */ `
<Badge content={11} size="large">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeSizeXLarge = () => (
  <ComponentBox hideCode data-visual-test="badge-size-x-large">
    {() => /* jsx */ `
<Badge content={99} size="x-large">
  <Avatar size="x-large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeVariantDefault = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-default">
    {() => /* jsx */ `
<Badge content={451} size="large"><Avatar size="large">A</Avatar></Badge>
  `}
  </ComponentBox>
)

export const BadgeVariantPrimary = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-primary">
    {() => /* jsx */ `
<Badge content={0} variant="primary" size="large">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeVariantSecondary = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-secondary">
    {() => /* jsx */ `
<Badge content={-9} variant="secondary" size="large">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeVariantTertiary = () => (
  <ComponentBox hideCode data-visual-test="badge-variant-tertiary">
    {() => /* jsx */ `
<Badge content={-123} variant="tertiary" size="large">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeHorizontalVerticalDefault = () => (
  <ComponentBox
    hideCode
    data-visual-test="badge-horizontal-vertical-default"
  >
    {() => /* jsx */ `
<Badge content={3} size="large">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeTopLeft = () => (
  <ComponentBox hideCode data-visual-test="badge-top-left">
    {() => /* jsx */ `
<Badge content={66} size="large" vertical="top" horizontal="left">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeTopRight = () => (
  <ComponentBox hideCode data-visual-test="badge-top-right">
    {() => /* jsx */ `
<Badge content={1} size="large" vertical="top" horizontal="right">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgeBottomLeft = () => (
  <ComponentBox hideCode data-visual-test="badge-bottom-left">
    {() => /* jsx */ `
<Badge content={13} size="large" vertical="bottom" horizontal="left">
  <Avatar size="large">A</Avatar>
</Badge>
      `}
  </ComponentBox>
)

export const BadgeBottomRight = () => (
  <ComponentBox hideCode data-visual-test="badge-bottom-right">
    {() => /* jsx */ `
<Badge content={58} size="large" vertical="bottom" horizontal="right">
  <Avatar size="large">A</Avatar>
</Badge>
  `}
  </ComponentBox>
)

// ALTERNATIVES

export const BadgeAvatar = () => (
  <ComponentBox
    hideCode
    scope={{ Card }}
    data-visual-test="badge-alternative-avatar"
  >
    {() => /* jsx */ `
<Badge 
  content={<Avatar src="https://avatars.githubusercontent.com/u/1501870?v=4" alt="Profile picture"/>} 
  variant="secondary" 
  size="x-large"
>
  <Avatar size="x-large">T</Avatar>
</Badge>
  `}
  </ComponentBox>
)

export const BadgePaymentCard = () => (
  <ComponentBox
    hideCode
    scope={{ PaymentCard }}
    data-visual-test="badge-alternative-payment-card"
  >
    {() => /* jsx */ `
<Badge content="New" size="large" variant="tertiary" vertical="top" horizontal="right">
  <PaymentCard product_code="VK2" card_number="************1337" />
</Badge>
  `}
  </ComponentBox>
)

export const BadgeMailIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Email }}
    data-visual-test="badge-alternative-icon"
  >
    {() => /* jsx */ `
<Badge content={99} variant="secondary" vertical="top" horizontal="right">
  <Icon icon={Email} size="large" />
</Badge>
  `}
  </ComponentBox>
)

export const BadgeImgWithIcon = () => (
  <ComponentBox
    hideCode
    scope={{ Confetti }}
    data-visual-test="badge-alternative-img"
  >
    {() => /* jsx */ `
<Badge size="large" content={<Icon icon={Confetti} />} variant="secondary">
  <Img 
  src="https://avatars.githubusercontent.com/u/1501870?v=4" 
  alt="Profile picture" 
  height="64"
  width="64"
/>
</Badge>
  `}
  </ComponentBox>
)
