/**
 * ATTENTION: This file is auto generated by using "makeDemosFactory".
 * Do not change the content!
 *
 * "Patterns" Demo setup
 * Ready for imporing in page
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import ItemWrapper from '../../../shared/parts/uilib/ItemWrapper'
import DemoComponent, {
  Example as CodeComponent
} from 'dnb-ui-lib/src/patterns/grid/Example'
import Description from 'dnb-ui-lib/src/patterns/grid/description.md'
import Details from 'dnb-ui-lib/src/patterns/grid/details.md'
import ExampleCode from 'raw-loader!../examples/Grid.txt'

export default class GridDemo extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    id: PropTypes.string,
    Description: PropTypes.func,
    Details: PropTypes.func,
    DemoComponent: PropTypes.func,
    CodeComponent: PropTypes.func,
    hideTabs: PropTypes.bool
  }
  static defaultProps = {
    title: 'Grid',
    id: 'grid',
    ExampleCode,
    Description,
    Details,
    DemoComponent,
    CodeComponent,
    callback: CodeComponent.AdditionalCallback || null,
    hideTabs: false
  }
  render() {
    return <ItemWrapper {...GridDemo.defaultProps} {...this.props} />
  }
}
