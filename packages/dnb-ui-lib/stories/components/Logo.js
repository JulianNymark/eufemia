/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'

import { Logo } from 'dnb-ui-lib/src/components'

export const Logos = () => {
  return (
    <Wrapper>
      <Box>
        <Logo size="80" style={{ color: 'var(--color-fire-red)' }} />
      </Box>
      <Box>
        <h1 className="dnb-h--xx-large">
          H1 with the DNB Logo <Logo size="auto" />
        </h1>
        <p className="dnb-p">
          Text with the DNB Logo <Logo />
        </p>
      </Box>
    </Wrapper>
  )
}