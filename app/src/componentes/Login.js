import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {

            console.log(props)

            const { params } = props.match;
            if (params.id || fakeAuth.autenticado()) {
                return <Component {...props} />
            }

            return <Redirect to={{ pathname: "/",state:
                    {
                        from: props.location, msgErro: "Voce prescisa estar logado!"
                            + `[${props.location.pathname}]`
                    }
                }}
            />
        }}
    />
);

const fakeAuth = {
    isAuthenticated: false,
    autenticado() {
        let token = localStorage.getItem('auth-token');
        return token != null;
    }
};

export default class Login extends Component {

    state = {
        redirecionar: false,
        msg: ((this.props.location.state &&
            this.props.location.state.msgErro) || "")
    }

    logarForm = (event) => {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                login: this.login.value,
                senha: this.senha.value
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Não foi possível fazer o login')
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token);
                fakeAuth.isAuthenticated = true;
                this.setState({ redirecionar: true });
            })
            .catch(error =>
                this.setState({ msg: error.message })
            );
    }

    render() {

        if (this.state.redirecionar) {
            let path = "/timeline";
            if (this.props.location.state) {
                path = this.props.location.state.from.pathname;
            }
            return <Redirect to={path} />
        }

        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.logarForm} >
                    <input type="text" placeholder="Usuário" ref={(input) => this.login = input} />
                    <input type="password" placeholder="Senha" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        )
    }
}