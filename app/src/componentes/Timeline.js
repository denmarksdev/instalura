import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';
import Header from './Header';
import PubSub from 'pubsub-js';
import { CSSTransitionGroup   } from 'react-transition-group'

export const CANAL_TIME_LINE = "timeline";

export default class Timeline extends Component {

    state = {
        fotos: [],
        login: this.props.match.params.id
    }
    login = this.props.match.params.id;

    componentWillReceiveProps(nextProps) {
        this.login = nextProps.match.params.id;
        this.carregaFotos();
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillMount() {
        PubSub.subscribe(CANAL_TIME_LINE, (topico, fotos) => {
            this.setState({ fotos })
        })
    }

    carregaFotos() {
        let urlPerfil = "";
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        }
        else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos }))
            .catch(erros => {
                console.log(erros);
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="fotos container">
                    <CSSTransitionGroup
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                        transitionName="timeline"
                        >
                            {
                                this.state.fotos.map(foto =>
                                    <FotoItem key={foto.id} foto={foto} />
                                )
                            }
                    </CSSTransitionGroup>
                </div>
            </div>
        )
    }
}