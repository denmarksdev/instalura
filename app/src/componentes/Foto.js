import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PubSub from 'pubsub-js';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes foto={this.props.foto} />
            </div>
        )
    }
}

class FotoHeader extends Component {

    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlFoto} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <Link to={`/timeline/${this.props.foto.loginUsuario}`}>
                            {this.props.foto.loginUsuario}
                        </Link>
                    </figcaption>
                </figure>
                <time className="foto-data"> {this.props.foto.horario}</time>
            </header>
        )
    }

}

class FotoInfo extends Component {

    state = {
        likers: this.props.foto.likers,
        comentarios: this.props.foto.comentarios
    }

    componentWillMount() {
        PubSub.subscribe(CANAL_ATUALIZA_LIKER, (topico, infoLiker) => {

            if (this.props.foto.id !== infoLiker.fotoId) return;

            console.log(this.props.foto.id);
            console.log(infoLiker.fotoId);

            const possivelLiker =
                this.state
                    .likers
                    .find(liker => liker.login === infoLiker.liker.login);


            let novosLikers;
            if (possivelLiker === undefined) {
                novosLikers = this.state.likers.concat(infoLiker.liker);
            } else {
                novosLikers = this.state.likers.filter(liker => liker.login !== infoLiker.liker.login);
                console.log(novosLikers);
            }
            this.setState({ likers: novosLikers })
        })

        PubSub.subscribe(CANAL_NOVO_COMENTARIO, (topico, infoComentario) => {

            if (this.props.foto.id !== infoComentario.fotoId) return;

            const novos = this.state.comentarios.concat(infoComentario.novoComentario)
            this.setState({comentarios:novos})
        })
    }

    render() {
        return (

            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.state.likers.map(liker =>
                            <Link key={liker.login} to={`/timeline/${liker.login}`}>{liker.login},</Link>
                        )
                    }
                    curtiram
            </div>
                <p className="foto-info-legenda">
                    <a className="foto-info-autor">autor </a>
                    {this.props.foto.comentario}
                </p>
                <ul className="foto-info-comentarios">
                    {
                        this.state.comentarios.map((comentario, index) =>
                            <li key={index} className="comentario">
                                <Link className="foto-info-autor" to={`/timeline/${comentario.login}`} >
                                    {comentario.texto}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}


const CANAL_ATUALIZA_LIKER = 'atualiza-liker';
const CANAL_NOVO_COMENTARIO = 'novos-comentarios';
class FotoAtualizacoes extends Component {

    state = {
        likeada: this.props.foto.likeada
    }
    comentario;

    like = (event) => {
        event.preventDefault();

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`,
            { method: 'POST' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível realizar o like da foto");
                }
            })
            .then(liker => {
                this.setState({
                    likeada: !this.state.likeada
                })
                PubSub.publish(CANAL_ATUALIZA_LIKER, { fotoId: this.props.foto.id, liker });
            })
    }

    comenta = (event) => {

        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ texto:this.comentario.value }),
            headers: new Headers({
                'Content-type':'application/json',

            })
            
        }

        fetch(`http://localhost:8080/api/fotos/${this.props.foto.id}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`
            , requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Não foi possível comentar");
                }
            })
            .then(novoComentario => {
                PubSub.publish(CANAL_NOVO_COMENTARIO, { fotoId: this.props.foto.id, novoComentario })
            })
            .catch(error => console.log(error.message))
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className={this.state.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'} onClick={this.like} >Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"
                        ref={input => this.comentario = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        )
    }
}
