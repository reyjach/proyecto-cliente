import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import Error from '../Alerta/Error';

import { Mutation } from 'react-apollo';

import { AUTENTICAR_USUARIO } from '../../mutations/index';

const initialState = {
    usuario : '',
    password: ''
}


class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
         const { name, value} = e.target;

        this.setState({
            [name] : value
        })
     }


    limpiarState = () => {
         this.setState({...initialState});
    }

    iniciarSesion = (e, autenticarUsuario) => {
        e.preventDefault();
        
        autenticarUsuario().then(async ({data}) => {
            //console.log(data.autenticarUsuario.token);

            localStorage.setItem('token', data.autenticarUsuario.token)

            //ejecutar el query una vez se haya iniciado sesion

            //limpiar el state

            this.limpiarState()

            // redireccionar
        })
     }

     validarForm = () => {
        const {usuario, password} = this.state;

        const noValido = !usuario || !password;

        //console.log(noValido);
        return noValido;
     }
    render() { 

        const {usuario, password} = this.state;

        return ( 
            <React.Fragment>
                <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

               <Mutation 
                   mutation={ AUTENTICAR_USUARIO }
                   variables={{usuario, password}}    
               >
               {( autenticarUsuario, {loading, error, data}) => {

                   return (
                       
                       <form 
                           onSubmit={ e => this.iniciarSesion(e, autenticarUsuario) } 
                           className="col-md-8"
                       >

                       {error && <Error error={error} />}
                       

                       <div className="form-group">
                           <label>Usuario</label>
                           <input 
                               onChange={this.actualizarState} 
                               value={usuario}
                               type="text" 
                               name="usuario" 
                               className="form-control" 
                               placeholder="Nombre Usuario" 
                           />
                       </div>
                       <div className="form-group">
                           <label>Password</label>
                           <input 
                               onChange={this.actualizarState} 
                               value={password}
                               type="password" 
                               name="password" 
                               className="form-control" 
                               placeholder="Password"
                           />
                       </div>

                       <button 
                           disabled={ 
                               loading || this.validarForm()
                           }
                           type="submit" 
                           className="btn btn-success float-right">
                               Iniciar Sesión
                       </button>
                       
                   </form>
                   )     
               }}
               </Mutation>
           </div>
       </React.Fragment>
         );
    }
}
 
export default Login;