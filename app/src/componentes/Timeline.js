import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';
import Header from './Header';
import { CSSTransitionGroup } from 'react-transition-group'
import { REINICIA_LISTAGEM_FOTOS} from '../shared/Constantes';
import  TimeLineApi from '../api/TimelineApi'

export const CANAL_NOVO_COMENTARIO = 'novos-comentarios';

export default class Timeline extends Component {

    state = {
        fotos: [],
    }
    login = this.props.login;

    componentWillReceiveProps(nextProps) {
        this.login = nextProps.login;
        this.carregaFotos();
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillMount() {
        this.props.store.subscribe( () => {
            const fotos = this.props.store.getState();
            if (fotos === REINICIA_LISTAGEM_FOTOS) {
                this.carregaFotos();
            } else {
                this.setState({ fotos })
            }
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
        this.props.store.dispatch(TimeLineApi.lista(urlPerfil));
    }

    like = (fotoId) => {
        this.props.store.dispatch(TimeLineApi.like(fotoId));
    }

    comenta = (fotoId, comentario) => {
        this.props.store.dispatch(TimeLineApi.comenta(fotoId,comentario));
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
                                <FotoItem
                                    key={foto.id}
                                    foto={foto}
                                    like={this.like}
                                    comenta={this.comenta} />
                            )
                        }
                    </CSSTransitionGroup>
                </div>
            </div>
        )
    }
}