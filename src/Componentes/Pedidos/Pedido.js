import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTO } from '../../queries/index';
import { ACTUALIZAR_ESTADO } from '../../mutations/index';
import ResumenProducto from './ResumenProducto';

import '../../css/pedidos.css'


const Pedido = (props) => {

    const {pedido} = props;

    const {id} = pedido;

    //console.log(estado)
    // fecha de pedido
    const fecha = new Date(Number(pedido.fecha));
    // estado clase de estado
    const{estado} = pedido;

    let clase;

    if(estado === 'PENDIENTE'){
        clase = 'border-light';
    } else if (estado === 'CANCELADO'){
        clase = 'border-danger'
    }else{
        clase = 'border-success'
    }

    return ( 
        <div className="col-md-4">
            <div className={`card mb-3 ${clase}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation mutation={ACTUALIZAR_ESTADO}>
                            {actualizarEstado => (
                                <select 
                                    className="form-control my-3"
                                    value={pedido.estado}
                                    onChange={e => {

                                        //console.log(e.target.value)

                                        const input = {
                                            id,
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente,
                                            estado: e.target.value
                                        };

                                        //console.log(input)

                                        actualizarEstado({
                                            variables: {input}
                                        })
                                    }}
                                >
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="COMPLETADO">COMPLETADO</option>
                                        <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )}
                           
                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> { fecha.toLocaleString("es-MX")}</span>
                    </p>
                    

                    <h3 className="resaltar-texto card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map((producto, index) => {
                        const {id} = producto;
                        
                        return (
                            <Query key={pedido.id+index} query={OBTENER_PRODUCTO} variables={{id}}>
                            {({ loading, error, data}) => {
                                if(loading) return (
                                    <div className="spinner">
                                        <div className="bounce1"></div>
                                        <div className="bounce2"></div>
                                        <div className="bounce3"></div>
                                    </div>);
                                if(error) return `Error ${error.message}`;

                                //console.log(data)

                                return (
                                    <ResumenProducto producto={data.obtenerProducto} cantidad={producto.cantidad} key={producto.id}></ResumenProducto>
                                )
                            }}
                            </Query>
                        )
                    })}

                    <div className="d-flex align-items-center justify-content-end">
                        <p className="card-text resaltar-texto mr-1 bg-amarrillo">Total: </p>
                        <p className="font-weight-normal inc-texto">$ {pedido.total} </p>
                    </div>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Pedido;