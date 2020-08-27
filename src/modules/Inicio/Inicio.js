import React from 'react'
import { Message, Grid, Icon, Container, Header } from 'semantic-ui-react'

const Inicio = () => {
  const {status, opinion} = (JSON.parse(localStorage.getItem('supplier')));
  console.log(status, opinion)
  return(
    <Container fluid>
      <Header size="small" dividing>
        <Icon name="user"/>
        <Header.Content>
          Inicio
          <Header.Subheader>Aquí encontraras información fundamental sobre tu cuenta.</Header.Subheader>
        </Header.Content>
      </Header>
      <Grid>
        <Grid.Column width="10">
          {
            (status === true && opinion === true)
            ?
              <Message color="blue">
                <Message.Header>
                  <Icon name="check"/>
                    Cuenta habilitada
                </Message.Header>
                <p>Esta cuenta se encuentra al corriente con sus pagos y obligaciones.</p>
              </Message>
            :
              null
          }

          {
            (status === false)
            ?
              <Message color="red">
                <Message.Header>
                  <Icon name="times"/>
                    Cuenta Limitada - Complementos de pago pendientes de cargar.
                </Message.Header>
                <p>Esta cuenta está limitada porque tienes pagos pendientes.</p>
              </Message>
            :
              null
          }
          {
            (opinion===false)
            ?
              <Message color="red">
                <Message.Header>
                  <Icon name="times"/>
                    Cuenta Limitada - Opinion positiva no registrada
                </Message.Header>
                <p>Esta cuenta está limitada porque no haz cargado tu opinión positiva de este mes.</p>
              </Message>
            :
              null
          }
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default Inicio
