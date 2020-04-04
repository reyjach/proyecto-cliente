import React from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PEDIDOS } from '../../queries/index';
import Pedido from './Pedido';


const PedidosCliente = (props) => {

    
    const cliente = props.match.params.id;

    //console.log(clienteId)


    return ( 
        <React.Fragment>
            <h1 className="text-center mb-5">Pedidos del Cliente</h1>

            <div className="row">
                <Query query={OBTENER_PEDIDOS} variables={{cliente}} pollInterval={500}>
                {({ loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                    if(error) return `Error ${error.message}`;
                    
                    //console.log(data)

                    return(
                        data.obtenerPedidos.map(pedido => (
                            <Pedido pedido={pedido} key={pedido.id} cliente={cliente}></Pedido>
                        ))
                    )
                }}

                </Query>
            </div>
        </React.Fragment>
    );
}
 
export default PedidosCliente;