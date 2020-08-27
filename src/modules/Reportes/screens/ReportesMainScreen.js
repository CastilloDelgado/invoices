import React from 'react'
import { Grid, Icon, Header, Container, Dropdown, Input, Checkbox, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { CustomLoader } from '../../_custom'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { reportesActions } from '../'
import { alertActions } from '../../Alert';
import { ReporteFactSinAut, ReporteOpinion } from '.'


class ReportesMainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtrofechasRango: ['', ''],
            checkRepSinaut: false,
            checkRepOpinion: false,
            ReportValue: null,
            filtro: {},
            agentes: [],
        };
        this.filtroschanged = this.filtroschanged.bind(this);
        this.onChecked = this.onChecked.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
    }


    filtroschanged(e, data) {
        const { filtro } = this.state;
        if (data.value != '')
            filtro[data.name] = data.value;
        else
            delete filtro[data.name];

    }

    onDateChanged = date => {
        const { filtro } = this.state;
        let fechasformateadas = [];
        if (date !== null) {
            date.forEach(dat => {
                let fechaform = '';
                let mes = (dat.getMonth()) + 1;
                let dia = dat.getDate()
                fechaform = dat.getFullYear() + '/' + (mes < 10 ? '0' + mes : mes) + '/' + (dia < 10 ? '0' + dia : dia)
                fechasformateadas.push(fechaform);
            });
            filtro.fecha_rango = fechasformateadas;
            this.setState({
                filtrofechasRango: fechasformateadas
            })
        }
        else {
            this.setState({
                filtrofechasRango: ['', '']
            })
            delete filtro.fecha_rango;
        }
    }


    handleFilterClick(e, data) {
        const { filtro, ReportValue } = this.state;
        if (ReportValue == 1) {
            this.props.getList(filtro);
        }
        if (ReportValue == 2) {
            this.props.getListOpinion(filtro)
        }
    }

    onChecked(e, data) {
        const { filtro } = this.state;
        this.setState({ ReportValue: data.value })
        if (data.name == 'repfactSinAut') {
            this.props.getList(filtro);
            this.setState({
                checkRepSinaut: true,
                checkRepOpinion: false
            })
        }
        else if (data.name == 'repOpinion') {
            this.props.getListOpinion(filtro)
            this.setState({
                checkRepSinaut: false,
                checkRepOpinion: true
            })
        }
    }

    renderSwitch(param) {
        const { reporte, requesting } = this.props;
        switch (param) {
            case 1:
                return <ReporteFactSinAut reporte={reporte} requesting={requesting} />;
            case 2:
                return <ReporteOpinion reporte={reporte} requesting={requesting} />;
        }
    }

    componentDidMount() {
        this.props.getAgentes();
        this.setState({
            agentes: this.props.agentes
        })
    }

    render() {
        const { agentes } = this.props;
        const { filtrofechasRango, ReportValue, checkRepSinaut, checkRepOpinion, filtro } = this.state;
        let options = null;
        if (agentes) { this.state.agentes = agentes }
        if (this.state.agentes) {
            let { agentes } = this.state.agentes;
            if (agentes) {
                options = agentes.map(x => {
                    return ({
                        key: x.key,
                        text: x.nombre,
                        value: x.key,
                    });
                });
            }
        }

        return (
            <Container fluid>
                <Header size="small" dividing>
                    <Icon name="list" />
                    <Header.Content>
                        Reportes
                        <Header.Subheader>Aquí se observan todos los reportes</Header.Subheader>
                    </Header.Content>
                </Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <h3>Filtros</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row >
                        <Grid.Column>
                            <DateRangePicker
                                onChange={this.onDateChanged}
                                locale={'es-419'}
                                format={'yyyy-MM-dd'}
                                value={filtrofechasRango}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Dropdown options={options}
                                search
                                selection
                                fluid
                                clearable
                                name='agente_filtro'
                                onChange={this.filtroschanged}
                                placeholder="Escribe el RFC del proveedor..." />
                        </Grid.Column>
                        <Grid.Column>
                            <Input icon='eye' type='text'
                                placeholder='Serie...'
                                name='serie'
                                disabled={ReportValue == 2 ? true : false}
                                onChange={this.filtroschanged}
                                pattern="(^\d+\.?\d+$)|(^\d+%$)" />
                        </Grid.Column>
                        <Grid.Column>
                            <Input icon='eye' type='text'
                                placeholder='Folio...'
                                name='folio'
                                disabled={ReportValue == 2 ? true : false}
                                onChange={this.filtroschanged}
                                pattern="(^\d+\.?\d+$)|(^\d+%$)" />
                        </Grid.Column>
                        <Grid.Column>
                            <Input icon='eye' type='text'
                                placeholder='cedi...'
                                name='cedi'
                                disabled={ReportValue == 2 ? true : false}
                                onChange={this.filtroschanged}
                                pattern="(^\d+\.?\d+$)|(^\d+%$)" />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        <Grid.Column>
                            <Checkbox name='repfactSinAut'
                                radio
                                checked={checkRepSinaut}
                                onChange={this.onChecked}
                                label='Reporte Facturas sin autorizar'
                                value={1}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Checkbox name='repOpinion'
                                radio
                                checked={checkRepOpinion}
                                onChange={this.onChecked}
                                label='Reporte Agentes Opinion positivas'
                                value={2}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button primary
                                disabled={ReportValue == null ? true : false}
                                onClick={this.handleFilterClick}
                            >Buscar</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                {
                    this.renderSwitch(ReportValue)
                }
            </Container >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        requesting: state.reporte.requesting,
        agentes: state.reporte.agentes,
        reporte: state.reporte.reporte
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAgentes: () => dispatch(reportesActions.getAgentes()),
        getList: (filtro) => dispatch(reportesActions.getListFactSinaut(filtro)),
        getListOpinion: (filtro) => dispatch(reportesActions.getListFactOpinion(filtro))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportesMainScreen)
