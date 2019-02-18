import {
    listagemAction,
    comentarioAction,
    likeAction,
    alertAction
} from '../action/actionCreators';


export default class TimelineApi {

    static like(fotoId) {

        return dispatch => {
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
                    dispatch(likeAction(fotoId, liker));
                    return liker;
                });
        }
    }

    static lista(urlPerfil) {
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json())
                .then(fotos => {
                    dispatch(listagemAction(fotos))
                    dispatch(alertAction(''));
                    return fotos;
                })
                .catch(erros => {
                    console.log(erros);
                });
        }
    }

    static comenta(fotoId, comentario) {

        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: comentario }),
                headers: new Headers({
                    'Content-type': 'application/json',
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
                    dispatch(comentarioAction(fotoId, novoComentario));
                    return novoComentario;
                })
                .catch(error => console.log(error.message))
        }
    }

    static pesquisa(loginTexto) {
        return dispatcher => {

            fetch(`http://localhost:8080/api/public/fotos/${loginTexto}`)
                .then(response => response.json())
                .then(fotos => {

                    if (fotos.length === 0){
                        dispatcher(alertAction('usuario não encontrado'))
                    } else {
                        dispatcher(alertAction(''))
                    }

                    dispatcher(listagemAction(fotos))
                    return fotos;
                })
                .catch(erro => console.log(erro));
        }
    }

    // TODO: Limpar listagem
    // if (this.loginPesquisado.value.length === 0){
    //     PubSub.publish(CANAL_TIME_LINE, REINICIA_LISTAGEM_FOTOS );
    //     return
    // }
}