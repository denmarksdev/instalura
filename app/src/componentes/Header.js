import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {
    REINICIA_LISTAGEM_FOTOS,
    CANAL_TIME_LINE
} from '../shared/Constantes';

export default class Header extends Component {

    pesquisa = (event) => {
        event.preventDefault();

        if (this.loginPesquisado.value.length === 0){
            PubSub.publish(CANAL_TIME_LINE, REINICIA_LISTAGEM_FOTOS );
            return
        }

        fetch(`http://localhost:8080/api/public/fotos/${this.loginPesquisado.value}`)
            .then(response => response.json())
            .then(fotos => {

                console.log(fotos);

                if (fotos) {
                    PubSub.publish(CANAL_TIME_LINE, fotos);
                }
            })
            .catch(erro => console.log(erro));
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form lpformnum="1" className="header-busca" onSubmit={this.pesquisa} >
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>
                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <a href="/logout">
                                ♡ 
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}