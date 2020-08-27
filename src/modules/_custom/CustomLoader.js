import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const square = { height: 150, width: '100%' }
const defaultText = 'Working on it...';
export const CustomLoader = ({text}) => (
    <Segment textAlign='center' style={square} inverted>
      <Dimmer active>
        <Loader size='large' inverted>{text ? text : defaultText}</Loader>
      </Dimmer>
    </Segment>
)