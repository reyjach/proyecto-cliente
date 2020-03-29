import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../queries/index';
import FormularioEditar from './FormularioProducto';

class EditarProducto extends Component {
    state = {  }
    render() { 

        // Tomar el ID de editar

        const { id } = this.props.match.params;

        console.log(id)

        return ( 
            <React.Fragment>
                <h1 className="text-center">Editar Producto</h1>

                <div className="row justify-content-center">
                    <Query query={OBTENER_PRODUCTO} variables={{id}}>
                    {({ loading, error , data, refetch}) => {
                        if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                        if(error) return `Error ${error.message}`;

                        return(
                            <FormularioEditar producto={data} id={id} refetch={refetch}></FormularioEditar>
                        )
            
                        
                    }}
                    </Query>
                </div>
            </React.Fragment>
         );
    }
}
 
export default EditarProducto;