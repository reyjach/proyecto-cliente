import React, { Component } from 'react';
import DatosCliente from './DatosCliente';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries/index';
import ContenidoPedido from './ContenidoPedido';

class NuevoPedidio extends Component {
    state = {  }
    render() { 
        const { id } = this.props.match.params;
        return ( 
            <React.Fragment>
                <h1 className="text-center mb-5">Nuevo Pedido</h1>

                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente id={id}></DatosCliente>
                    </div>

                    <div className="col-md-9">
                        <Query query={OBTENER_PRODUCTOS}> 
                        {({ loading, error, data}) => {
                            if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                            if(error) return `Error ${error.message}`;

                            console.log(data.obtenerProductos)

                            return(
                                <ContenidoPedido producto={data.obtenerProductos} id={id}>
                                    
                                </ContenidoPedido>
                            )
                        }}
                        </Query>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default NuevoPedidio;