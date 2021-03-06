import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const CerrarSessionUsuario = (cliente, history) => {
    localStorage.removeItem('token', '');

    cliente.resetStore();

    history.push('/login');
}

const CerrarSession = ({history}) => (
    <ApolloConsumer>
        {cliente => {
            return (
                <button onClick={() => CerrarSessionUsuario(cliente, history)} 
                    className="btn btn-danger ml-md-2 mt-2 mt-md-0">
                        Cerrar Sesión
                </button>
        );
        }}
        
    </ApolloConsumer>
)
 
export default withRouter(CerrarSession);