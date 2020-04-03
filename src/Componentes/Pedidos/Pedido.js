import React from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../queries/index';
import ResumenProducto from './ResumenProducto';


const Pedido = (props) => {

    const {pedido} = props;

    //console.log(pedido)

    const fecha = new Date(Number(pedido.fecha));

    return ( 
        <div className="col-md-4">
            <div className={`card mb-3`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                            <select 
                                className="form-control my-3"
                                value={pedido.estado}
                            >
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="CANCELADO">CANCELADO</option>
                            </select>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> { fecha.toLocaleString("es-MX")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal">$ {pedido.total} </span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map(producto => {
                        const {id} = producto;
                        
                        return (
                            <Query key={pedido.id} query={OBTENER_PRODUCTO} variables={{id}}>
                            {({ loading, error, data}) => {
                                if(loading) return (
                                    <div className="spinner">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>);
                                if(error) return `Error ${error.message}`;

                                console.log(data)

                                return (
                                    <ResumenProducto producto={data.obtenerProducto} cantidad={producto.cantidad} key={producto.id}></ResumenProducto>
                                )
                            }}
                            </Query>
                        )
                    })}
                </div>
            </div>
        </div>
     );
}
 
export default Pedido;