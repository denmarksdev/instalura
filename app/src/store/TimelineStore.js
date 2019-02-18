import PubSub from 'pubsub-js';
import { CANAL_TIME_LINE } from '../shared/Constantes';

export default class TimelineStore {

    constructor(fotos) {
        this.fotos = fotos;
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

                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);

                fotoAchada.likeada = !fotoAchada.likeada;

                const possivelLiker = fotoAchada.likers
                    .find(likerAtual => likerAtual.login === liker.login);

                if (possivelLiker === undefined) {
                    fotoAchada.likers.push(liker);
                } else {
                    const novosLikers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== liker.login);
                    fotoAchada.likers = novosLikers;
                }
                PubSub.publish(CANAL_TIME_LINE, this.fotos);
            });
    }

    lista(urlPerfil) {
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => {
                this.fotos = fotos;
                PubSub.publish(CANAL_TIME_LINE, this.fotos);
            })
            .catch(erros => {
                console.log(erros);
            });
    }

    comenta(fotoId, comentario) {

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
                const fotoAchada = this.fotos.find(foto => foto.id === fotoId);
                fotoAchada.comentarios.push(novoComentario);
                PubSub.publish(CANAL_TIME_LINE, this.fotos);
            })
            .catch(error => console.log(error.message))
    }

    subscribe(callbak){
        PubSub.subscribe(CANAL_TIME_LINE, (topico, fotos) => {
            callbak(fotos);
        });
    }
}