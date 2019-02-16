import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';

export default class Timeline extends Component {

    state = {
        fotos: []
    }

    componentDidMount() {

        fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }))
            .catch(erros => {
                console.log(erros);
            })
    }

    render() {

        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto =>
                        <FotoItem key={foto.id} foto={foto} />
                    )
                }

            </div>
        )
    }

}