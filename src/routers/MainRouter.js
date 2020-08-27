import React from 'react';
import { ModuleLink } from './components'
import './scss';
import { connect } from 'react-redux';

const MainRouter = ({json}) => {
    return (
        <div className='MainRouter'>
            <section className="xop-container">
            {
                json.modules.map((x, i) => {
                    return <ModuleLink module={x}/>
                })
            }
            </section>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { config } = state;
    return {
        json : config.json
    }
}

const connectedRouter = connect(mapStateToProps)(MainRouter)
export { connectedRouter as MainRouter}