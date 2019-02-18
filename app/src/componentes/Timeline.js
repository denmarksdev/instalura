import React, { Component } from 'react';
import FotoItem from '../componentes/Foto';
import { CSSTransitionGroup } from 'react-transition-group'
import { URL_FOTO_USUARIO } from '../shared/Constantes';
import  TimeLineApi from '../api/TimelineApi'

export default class Timeline extends Component {

    state = {
        fotos: [],
    }
    login = this.props.login;

    componentWillReceiveProps(nextProps) {

        if (nextProps.login === this.login) return;

        this.login = nextProps.login;
        this.carregaFotos();
    }

    componentDidMount() {
        this.carregaFotos();
    }

    componentWillMount() {

        this.props.store.subscribe( () => {
            const fotos = this.props.store.getState().timeline;
                this.setState({ fotos });
        });
    }

    carregaFotos() {
        let urlPerfil = "";
        if (this.login === undefined) {
            urlPerfil = URL_FOTO_USUARIO ;
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

        console.log("render");

        return (
            <div>
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

// TODO: Implementar Connect, estão apresentando um erro, devido a atualização da lib. 
// const mapStateToProps = state =>  {
//     return{fotos: state.timeline}
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         like: (fotoId) =>{
//             dispatch(TimeLineApi.like(fotoId));
//         },
//         comenta: (fotoId, comentario) => {
//             dispatch(TimeLineApi.comenta(fotoId,comentario));
//         },
//         lista: (urlPerfil) =>{
//             dispatch(TimeLineApi.lista(urlPerfil));
//         }
//     }
// }

// export default connect(
//     mapStateToProps, 
//     mapDispatchToProps,
//     )(Timeline)