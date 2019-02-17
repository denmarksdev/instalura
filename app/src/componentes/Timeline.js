import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';
import Header from './Header';
import PubSub from 'pubsub-js';
import { CSSTransitionGroup } from 'react-transition-group'

export const CANAL_TIME_LINE = "timeline";
export const CANAL_ATUALIZA_LIKER = 'atualiza-liker';
export const CANAL_NOVO_COMENTARIO = 'novos-comentarios';

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

        PubSub.subscribe(CANAL_ATUALIZA_LIKER, (topico, infoLiker) => {
           const fotoAchada = this.state.fotos.find( foto=> foto.id === infoLiker.fotoId );
           
           fotoAchada.likeada = !fotoAchada.likeada;

           const possivelLiker = fotoAchada.likers
                    .find(liker => liker.login === infoLiker.liker.login);

            if (possivelLiker === undefined) {
                fotoAchada.likers.push(infoLiker.liker);
            } else {
                let novosLikers = fotoAchada.likers.filter(liker => liker.login !== infoLiker.liker.login);
                fotoAchada.likers = novosLikers;
            }
            this.setState({fotos:this.state.fotos });
        })

        PubSub.subscribe(CANAL_NOVO_COMENTARIO, (topico, infoComentario) => {
            const fotoAchada = this.state.fotos.find( foto=> foto.id === infoComentario.fotoId );
            fotoAchada.comentarios.push(infoComentario.novoComentario)
            this.setState({foto:this.state.fotos})
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

    like(fotoId) {

        fetch(`http://localhost:8080/api/fotos/${fotoId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível realizar o like da foto");
                }
            })
            .then(liker => {
                PubSub.publish(CANAL_ATUALIZA_LIKER, { fotoId , liker });
            })
    }


    comenta(fotoId, comentario) {

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto:comentario }),
            headers: new Headers({
                'Content-type':'application/json',
            })
        }

        fetch(`http://localhost:8080/api/fotos/${fotoId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
            , requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível comentar");
                }
            })
            .then(novoComentario => {
                PubSub.publish(CANAL_NOVO_COMENTARIO, { fotoId, novoComentario })
            })
            .catch(error => console.log(error.message))
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