import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries/index';
import { Link } from 'react-router-dom';

class Productos extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                <Query query={OBTENER_PRODUCTOS} pollInterval={1000}>
                    {({ loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return 'Cargando...';
                        if(error) return `Error ${error.message}`;

                        console.log(data.obtenerProductos)
            
                        return (

                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Existencia</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {data.obtenerProductos.map(item => {

                                        const{id} = item;

                                       return (
                                        <tr key={id}>
                                            <td>{item.nombre}</td>
                                            <td>{item.precio}</td>
                                            <td>{item.stock}</td>
                                            <td>
                                                <button type="button" className="btn btn-danger">&times; Eliminar</button>
                                            </td>
                                            <td>
                                                <Link to={`/productos/editar/${id}`} className="btn btn-success">
                                                    Editar producto
                                                </Link>
                                            </td>
                                        </tr>
                                       )
                                    })}
                                </tbody>
                            </table>
                            
                        )
                    }}
                </Query>

            </React.Fragment>
         );
    }
}
 
export default Productos;