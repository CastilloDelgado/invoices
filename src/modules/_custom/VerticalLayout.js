import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Menu, Segment, Image, Popup, Dropdown } from 'semantic-ui-react'

import { Logo } from '../../utils';
import style from '../_css/VerticalLayout.css.js';
import { configActions } from '../Config';
import { MainLoader } from './MainLoader';


const VerticalLayout = ({ children, match, userConfig, requestUserConfig, _getUserConfig }) => {

    const [user] = useState(JSON.parse(localStorage.getItem('user')).user);
    const [activeItem, setActiveItem] = useState('home');

    const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name });

    useEffect(() => {
        if (!userConfig) {
            _getUserConfig(user.id);
        }
    }, [userConfig])

    if (requestUserConfig || typeof userConfig == 'undefined') {
        return <MainLoader />
    }
    else {
        return (
            <div>
                {/* <Menu fixed='top' size='small' style={{backgroundColor: 'rgba(54, 61, 56, 0.6)'}}> */}
                <Menu fixed='left' color='blue' size='small' vertical inverted style={style.flexContainer}>
                    <Menu.Item header>
                        <Logo />
                    </Menu.Item>
                    {
                        userConfig.submodules.map((submodule) => {
                            if (submodule.path == null) {
                                return (
                                    <Dropdown item text={`${submodule.name}`}>
                                        <Dropdown.Menu>
                                            {
                                                submodule.subroutes.map((subroute) => {
                                                    return <Dropdown.Item
                                                        as={Link}
                                                        name={`${subroute.name}`}
                                                        to={`${match.url}${subroute.path}`}
                                                        active={activeItem === subroute.path}
                                                        onClick={handleItemClick}
                                                    >{subroute.name}
                                                    </Dropdown.Item>
                                                })
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>);
                            }
                            else {
                                return (
                                    <Menu.Item
                                        as={Link}
                                        name={submodule.name}
                                        to={`${match.url}${submodule.path}`}
                                        active={activeItem === submodule.path}
                                        onClick={handleItemClick} />
                                )
                            }
                        })
                    }
                    <div style={style.bottomAligned}>
                        <Menu.Item
                            as={Link}
                            to={`/logout`}
                            active={activeItem === 'logout'}
                            onClick={handleItemClick}
                            color='red'
                        >
                            <Icon name='power off' />Log Out:
                                <span style={{ fontWeight: 'bold', marginLeft: '2px' }}>
                                {`${user.username}`}
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

// <Menu.Item
//     as={Link}
//     name='Cuentas'
//     to={`${match.url}/cuentas`}
//     active={activeItem === 'cuentas'}
//     onClick={this.handleItemClick} />
// <Menu.Item
//     as={Link}
//     name='Facturas'
//     to={`${match.url}/facturas`}
//     active={activeItem === 'facturas'}
//     onClick={this.handleItemClick} />

const mapStateToProps = (state) => {
    const { config } = state
    return {
        userConfig: config.userConfig,
        requestUserConfig: config.requestUserConfig
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        _getUserConfig: (idUser) => dispatch(configActions.getUserConfig(idUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerticalLayout);
