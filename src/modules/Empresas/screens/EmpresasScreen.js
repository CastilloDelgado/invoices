import React from 'react';
import { Segment, Container, Image, Icon } from 'semantic-ui-react';
import EmpresasList from './EmpresasList';
import { Logo } from '../../../utils';

const EmpresasScreen = () => (
    <div>
        <Segment color='blue' basic inverted style={{ margin: '0em 0em 2em', position: 'absolute', top: 0, width: '100%'}}>
            <Container textAlign='right'>
                <Logo size='small' floated='left'/>
                <Icon name='copyright'/>{(new Date()).getFullYear()}
            </Container>
        </Segment>
        <Segment basic style={{ marginTop: '5em' }}>
            <Container>
                <EmpresasList/>
            </Container>        
        </Segment>
    </div>
)

export default EmpresasScreen;

