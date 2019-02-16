import React, { Component } from 'react';
import Foto from '../componentes/Foto';

export default class Timeline extends Component {

    render() {
        return (
            <div className="fotos container">
                <Foto />
            </div>
        )
    }

}