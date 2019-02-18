import { List } from 'immutable';


export function timeline(state = new List(), action) {
    if (action.type === "LISTAGEM") {
        return new List(action.fotos);
    }

    if (action.type === "COMENTARIO") {
        const { fotoId, novoComentario } = action;

        return trocaFoto(state, fotoId, fotoEstadoAntigo => {
            const novosComentarios = fotoEstadoAntigo.comentarios.concat(novoComentario);
            return { comentarios: novosComentarios };
        });
    }

    if (action.type === "LIKE") {

        const { fotoId, liker } = action;
        const novaLista = trocaFoto(state, fotoId, fotoEstadoAntigo => {

            const likeada = !fotoEstadoAntigo.likeada;

            const possivelLiker = fotoEstadoAntigo.likers
                .find(likerAtual => likerAtual.login === liker.login);

            let novosLikers;
            if (possivelLiker === undefined) {
                novosLikers = fotoEstadoAntigo.likers.concat(liker);
            } else {
                novosLikers = fotoEstadoAntigo.likers.filter(likerAtual =>
                    likerAtual.login !== liker.login);
            }

            return { likeada, likers: novosLikers };
        });

        return novaLista;
    }

    return state;
}

function trocaFoto(lista, fotoId, callbackatualizaPropriedades) {
    const fotoEstadoAntigo = lista.find(foto => foto.id === fotoId);
    const novasPropriedades = callbackatualizaPropriedades(fotoEstadoAntigo);
    const fotoEstadoNovo = Object.assign({}, fotoEstadoAntigo, novasPropriedades);
    const indiceLista = lista.findIndex(foto => foto.id === fotoId);
    const novaLista = lista.set(indiceLista, fotoEstadoNovo);
    return novaLista;
}
