import React, { Component } from 'react';
import TimelineApi from '../api/TimelineApi';
import { URL_FOTO_USUARIO }  from '../shared/Constantes';

export default class Header extends Component {

    state = {
        msg:  ''
    }

    componentDidMount(){
        this.props.store.subscribe(() =>{
            this.setState({msg: this.props.store.getState().notificacao})
        })
    }

    pesquisa = (event) => {
        event.preventDefault();

        if (this.loginPesquisado.value.length === 0){
            this.props.store.dispatch(TimelineApi.lista(URL_FOTO_USUARIO));
            return;
        }

        this.props.store.dispatch(TimelineApi.pesquisa(this.loginPesquisado.value))
    }

    render() {


        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                </h1>

                <form lpformnum="1" className="header-busca" onSubmit={this.pesquisa} >
                    <input type="text" name="search" placeholder="Pesquisa" 
                    className="header-busca-campo" ref={input => this.loginPesquisado = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>
                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                        <span className="header-msg" >{ this.state.msg }</span>
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