import React, { Component } from 'react';

export default class Foto extends Component {
    render() {
        return (
            <div className="foto">
                <FotoHeader foto={this.props.foto} />
                <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
                <FotoInfo foto={this.props.foto} />
                <FotoAtualizacoes />
            </div>
        )
    }
}

// "urlPerfil": "https://instagram.fcgh9-1.fna.fbcdn.net/vp/faf1cd7c1d50bbf382cad0d43df15a49/5B5FF9ED/t51.2885-19/s150x150/12599387_1591433254512484_973178862_a.jpg",
//     "loginUsuario": "rafael",
//     "horario": "16/02/2019 12:21",
//     "urlFoto": "https://instagram.fcgh10-1.fna.fbcdn.net/t51.2885-15/e35/14482111_1635089460122802_8984023070045896704_n.jpg?ig_cache_key=MTM1MzEzNjM4NzAxMjIwODUyMw%3D%3D.2",
//     "id": 3,
//     "likeada": false,
//     "likers": [],
//     "comentarios": [],
//     "comentario": "comentario da foto"


class FotoHeader extends Component {

    render() {
        return (
            <header className="foto-header">
                <figure className="foto-usuario">
                    <img src={this.props.foto.urlFoto} alt="foto do usuario" />
                    <figcaption className="foto-usuario">
                        <a href="#">
                            {this.props.foto.loginUsuario}
                        </a>
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
                            <a key ={ liker.login }  href="#">{liker.login},</a>
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
                    this.props.foto.comentarios.map(comentario =>
                         <li className="comentario">
                             <a className="foto-info-autor"> { comentario.login } </a>
                               { comentario.texto }
                          </li>
                    )
                }
             </ul>
            </div>
        )
    }
}


class FotoAtualizacoes extends Component {

    render() {
        return (
            <section className="fotoAtualizacoes">
                <a href="#" className="fotoAtualizacoes-like">Likar</a>
                <form className="fotoAtualizacoes-form">
                    <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
                    <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
                </form>
            </section>
        )
    }
}
