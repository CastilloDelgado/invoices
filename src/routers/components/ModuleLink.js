import React from 'react';
import {  Link } from 'react-router-dom';
import { Logo } from '../../utils'
import '../scss';

export const ModuleLink = ({module}) => {
    return (
        <div className="xop-left">
            <article>
                <Logo/>
                <h1>{module.name}</h1>
                {
                    module.links.map((item, i) => {
                        return <Link className='xop-button' to={item.to}>{item.title}</Link>
                    })
                }
            </article>
        </div>
    )
}