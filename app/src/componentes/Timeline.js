import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';

export default class Timeline extends Component {

    state = {
        fotos: []
    }

    componentDidMount() {

        fetch('http://localhost:8080/api/public/fotos/rafael')
            .then(response => response.json())
            .then( fotos => this.setState({ fotos }) )
            .catch(erros => {
                console.log(erros);
            })
    }

    render() {

        console.log(this.state.fotos);

        return (
            <div className="fotos container">
            {
                this.state.fotos.map( foto => 
                    <FotoItem foto={foto} />
                )
            }
                
            </div>
        )
    }

}