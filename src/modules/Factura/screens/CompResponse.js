import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { Header, Divider, Table, Image, Icon, Segment, Grid, Button, Modal} from 'semantic-ui-react';
import Currency from 'react-currency-formatter';


const square = { width: '100%' }

const CompResponse = ({response, agente}) => {
    const {status, data, message} = response;
    const [iconColor, setIconColor] = useState('green');
    const [iconName, setIconName] = useState('check');
    const [buttonType, setButtonType] = useState('positive');

    useEffect(() => {
      if(!response.status){
        setIconColor('red');
        setIconName('times');
        setButtonType('negative');
      }
    });

    return (
        <Grid centered padded style={square}>
          <Grid.Column>
            <Header as='h2' icon textAlign='center'>
                <Icon name={iconName} color={iconColor} circular />
                <Header.Content>{message}</Header.Content>
                <Divider horizontal> </Divider>
                  {(status && status !== "500")
                    ?
                    <div>
                      <Modal trigger={<Button className={buttonType}>Más Información</Button>} centered="false">
                        <Modal.Header>Información de Complemento</Modal.Header>
                        <Modal.Content>
                          <Table celled>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>Nombre del Cliente: </Table.Cell>
                                <Table.Cell>{agente.nombre}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>RFC: </Table.Cell>
                                <Table.Cell>{agente.rfc}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Monto Total: </Table.Cell>
                                <Table.Cell><Currency quantity={response.data ?
                                  data.complemento.total :
                                  ""
                                }/></Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Serie y Folio Actual: </Table.Cell>
                                <Table.Cell> {response.data ?
                                  data.complemento.serie :
                                  ""
                                } - {data ?
                                  data.complemento.folio :
                                  ""
                                }</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Fecha de Emisión</Table.Cell>
                                <Table.Cell>{
                                  data ?
                                  data.complemento.fecha_emision :
                                  ""
                                }</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                          <Divider horizontal>Descargas</Divider>
                          <Button.Group widths='4'>
                            <Button primary href={data ?
                              data.linkPdf :
                              ""
                            }>Descargar PDF</Button>
                            <Button.Or text="ó" />
                            <Button positive href={data ?
                              data.linkXml:
                              ""
                            }>Descargar XML</Button>
                          </Button.Group>
                        </Modal.Content>
                      </Modal>
                    </div>
                    :
                    <div>
                      <Modal trigger={<Button negative>Más Información</Button>} centered="false">
                        <Modal.Header>Información Del Error</Modal.Header>
                        <Modal.Content>
                          <Table celled>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell>Nombre del Cliente:</Table.Cell>
                                <Table.Cell>{agente.nombre}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>RFC</Table.Cell>
                                <Table.Cell>{agente.rfc}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Tipo de Error:</Table.Cell>
                                <Table.Cell>{message ? message : response.statusText}</Table.Cell>
                              </Table.Row>
                              <Table.Row>
                                <Table.Cell>Descripción de Error:</Table.Cell>
                                <Table.Cell>{data ? data.response.EFMessageError : status}</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </Modal.Content>)
                      </Modal>
                      </div>
                    }
                <Divider horizontal> </Divider>
                <Button href="../agentes/">Regresar</Button>
            </Header>
          </Grid.Column>
        </Grid>

    );
}

const mapStateToProps = (state) => {
    return {
        agente: state.factura.agente,
        response : state.factura.response
    }
}

export default connect(mapStateToProps)(CompResponse)
