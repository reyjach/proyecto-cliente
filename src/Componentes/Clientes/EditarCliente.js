import React, { Component } from 'react';
import { CLIENTE_QUERY } from '../../queries/index';
import { Query } from 'react-apollo';
import FormularioEditarCliente from './FormularioEditarCliente';

class EditarCliente extends Component {
    render() { 

        //tomar ID del contacto cliente

        const { id } =this.props.match.params;

        console.log(id)
        return ( 
            <React.Fragment>
                <h2 className="text-center">Editar Cliente</h2>

                <div className="row justify-content-center">
                    <Query query={CLIENTE_QUERY} variables={{id}}>
                        {({ loading, error, data, refetch }) =>{
                            if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                            if(error) return `Error ${error.message}`;

                            console.log(data)
                            return(
                                <FormularioEditarCliente cliente={data.getCliente} refetch={refetch}></FormularioEditarCliente>
                            )
                        }}
                    </Query>

                </div>
            </React.Fragment>
         );
    }
}
 
export default EditarCliente;