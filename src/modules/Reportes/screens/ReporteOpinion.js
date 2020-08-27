import React from 'react'
import { Grid, Icon, Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { CustomLoader } from '../../_custom'

class ReporteOpinion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const { reporte, requesting } = this.props;
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width="13">
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS"
                        />
                        <Table id="table-to-xls"
                            celled
                            size="small"
                        >
                            <Table.Header>
                                <Table.HeaderCell width="1">Razon Social</Table.HeaderCell>
                                <Table.HeaderCell width="1">RFC</Table.HeaderCell>
                                <Table.HeaderCell width="1">Fecha</Table.HeaderCell>
                                <Table.HeaderCell width="1">Resultado_opinion</Table.HeaderCell>
                            </Table.Header>
                            {requesting
                                ?
                                <Table.Body>
                                    <Table.Row>
                                        <CustomLoader />
                                    </Table.Row>
                                </Table.Body>
                                :
                                (
                                    <Table.Body>
                                        {reporte ? (reporte.map(re => {
                                            //const valuejobs = this.stringExplode(factura.job);
                                            return (
                                                <Table.Row>
                                                    <Table.Cell>{re.nombre}</Table.Cell>
                                                    <Table.Cell>{re.rfc}</Table.Cell>
                                                    <Table.Cell>{re.fecha_archivo}</Table.Cell>
                                                    <Table.Cell>{re.resultado_opinion}</Table.Cell>
                                                </Table.Row>
                                            )
                                        })) : (null)
                                        }
                                    </Table.Body>
                                )
                            }
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}


export default ReporteOpinion