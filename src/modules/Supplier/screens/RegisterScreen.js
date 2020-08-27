import React from 'react';
import { Segment, Container, Icon } from 'semantic-ui-react';
import { Logo } from '../../../utils';
import { RegisterPage } from './';

const RegisterScreen = () => (
    <div>
        <Segment color='blue' basic inverted style={{ margin: '0em 0em 2em', position: 'absolute', top: 0, width: '100%'}}>
            <Container textAlign='right'>
                <Logo/>
                <Icon name='copyright'/>{(new Date()).getFullYear()}
            </Container>
        </Segment>
        <Segment basic style={{ marginTop: '5em' }}>
            <Container fluid>
                <RegisterPage/>
            </Container>        
        </Segment>
    </div>
)

export {RegisterScreen};

