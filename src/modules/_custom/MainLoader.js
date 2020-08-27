import React from 'react'
import { Dimmer, Loader, Segment, Image } from 'semantic-ui-react'
import { krono } from '../../utils';

const square = { height: '100vh', width: '100%' }
export const MainLoader = () => (
    <Segment textAlign='center' style={square}>
        <Dimmer active inverted>
            <Loader size='big' inverted>
                <Image src={krono} wrapped/>
            </Loader>
        </Dimmer>
    </Segment>
)