import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class FotoItem extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes  {...this.props} />
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
    render() {
        return (
            <div className="foto-info">
                <div className="foto-info-likes">
                    {
                        this.props.foto.likers.map(liker =>
                            <Link key={liker.login} to={`/timeline/${liker.login}`}>{liker.login},</Link>
                        )
                    }
                    curtiram
            </div>
                <p className="foto-info-legenda">
                    <span className="foto-info-autor">autor </span>
                    {this.props.foto.comentario}
                </p>
                <ul className="foto-info-comentarios">
                    {
                        this.props.foto.comentarios.map((comentario, index) =>
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


class FotoAtualizacoes extends Component {

    like = (event) => {
        event.preventDefault();
        this.props.like(this.props.foto.id);
    }

    comenta = (event) => {
        event.preventDefault();
        this.props.comenta(this.props.foto.id, this.comentario.value);
    }

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="/" className={this.props.foto.likeada ? 'fotoAtualizacoes-like-ativo' : 'fotoAtualizacoes-like'} onClick={this.like} >Likar</a>
                <form className="fotoAtualizacoes-form" onSubmit={this.comenta}>
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo"
                        ref={input => this.comentario = input} />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        )
    }
}
