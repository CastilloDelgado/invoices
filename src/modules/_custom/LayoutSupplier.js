import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Icon, Menu, Segment, Image, Popup } from 'semantic-ui-react'
import { Logo } from '../../utils';
import style from '../_css/VerticalLayout.css.js';


class LayoutSupplier extends Component {
    constructor(props){
        super(props);
        let user = JSON.parse(localStorage.getItem('supplier')).user;
        this.state = {
            user,
            activeItem: 'home'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem, user } = this.state;
        const { children, match } = this.props;
        const {status, opinion} = (JSON.parse(localStorage.getItem('supplier')));
        return (
            <div>
                {/* <Menu fixed='top' size='small' style={{backgroundColor: 'rgba(54, 61, 56, 0.6)'}}> */}
                    <Menu fixed='left' color='blue' size='small' vertical inverted style={style.flexContainer}>
                        <Menu.Item header>
                            <Logo/>
                        </Menu.Item>
                        {(status && opinion) ?
                            <div>
                                <Menu.Item
                                    as={Link}
                                    name='Inicio'
                                    to={`${match.url}/inicio`}
                                    active={activeItem === 'inicio'}
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    as={Link}
                                    name='Importar Facturas'
                                    to={`${match.url}/cargar-xml`}
                                    active={activeItem === 'cargar-xml'}
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    as={Link}
                                    name='Importar Complementos'
                                    to={`${match.url}/cargar-complementos`}
                                    active={activeItem === 'cargar-complementos'}
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    as={Link}
                                    name='Lista de Facturas'
                                    to={`${match.url}/lista-facturas`}
                                    active={activeItem === 'lista-facturas'}
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    as={Link}
                                    name='Importar Opinion'
                                    to={`${match.url}/opinion`}
                                    active={activeItem === 'opinion'}
                                    onClick={this.handleItemClick} />
                                <Menu.Item
                                    as={Link}
                                    name='Cambiar Contraseña'
                                    to={`${match.url}/change-password`}
                                    active={activeItem === 'change-password'}
                                    onClick={this.handleItemClick} />
                            </div>
                          :
                            <div>
                              <Menu.Item
                                  as={Link}
                                  name='Inicio'
                                  to={`${match.url}/inicio`}
                                  active={activeItem === 'inicio'}
                                  onClick={this.handleItemClick} />
                              <Menu.Item
                                  as={Link}
                                  name='Importar Complementos'
                                  to={`${match.url}/cargar-complementos`}
                                  active={activeItem === 'cargar-complementos'}
                                  onClick={this.handleItemClick} />
                              <Menu.Item
                                  as={Link}
                                  name='Lista de Facturas'
                                  to={`${match.url}/lista-facturas`}
                                  active={activeItem === 'lista-facturas'}
                                  onClick={this.handleItemClick} />
                              {
                                !opinion && (
                                  <Menu.Item
                                      as={Link}
                                      name='Importar Opinion'
                                      to={`${match.url}/opinion`}
                                      active={activeItem === 'opinion'}
                                      onClick={this.handleItemClick} />
                                )
                              }
                            </div>
                        }
                        <div style={style.bottomAligned}>
                            <Menu.Item
                                as={Link}
                                to={`/proveedor`}
                                active={activeItem === 'logout'}
                                onClick={this.handleItemClick}
                                color='red'
                            >
                                <Icon name='power off'/>Log Out:
                                <span style={{fontWeight : 'bold', marginLeft:'2px'}}>
                                    {`${user.nombre + " " + user.apellido_paterno}`}
                                </span>
                            </Menu.Item>
                        </div>

                    </Menu>
                    {/* <Menu.Menu position='right' size='tiny'>
                        <Popup trigger={
                            <Menu.Item
                                as={Link}
                                to={`/empresa`}
                                active={activeItem === 'empresa'}
                                onClick={this.handleItemClick}
                                color='red'
                                ><Icon name='trademark'/></Menu.Item>}
                            content={`Empresa: ${company.nombre}`}
                            basic
                        />
                    </Menu.Menu> */}
                { /* </Menu> */}
                <Segment basic style={{ marginLeft: '15em' }}>
                    {children}
                </Segment>
            </div>

        );
    }
}

export default LayoutSupplier;

// <Menu.Item
//     as={Link}
//     name='Importar Opinion'
//     to={`${match.url}/opinion`}
//     active={activeItem === 'opinion'}
//     onClick={this.handleItemClick} />
// <Menu.Item
//     as={Link}
//     name='Importar Lista Negra'
//     to={`${match.url}/cargar-lista`}
//     active={activeItem === 'cargar-lista'}
//     onClick={this.handleItemClick} />
// <Menu.Item
//     as={Link}
//     name='Lista de Facturas'
//     to={`${match.url}/lista-facturas`}
//     active={activeItem === 'lista-facturas'}
//     onClick={this.handleItemClick} />
