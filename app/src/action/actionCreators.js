export function listagemAction(fotos) {
    return { type: 'LISTAGEM', fotos }
}

export function likeAction(fotoId, liker) {
    return { type: 'LIKE', fotoId, liker }
}

export function comentarioAction(fotoId, novoComentario) {
    return { type: 'COMENTARIO', fotoId, novoComentario };
}

export function alertAction(msg) {
    return {type: 'ALERT', msg};
}