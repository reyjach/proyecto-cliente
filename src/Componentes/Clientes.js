import React from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries/index';
import { ELIMINAR_CLIENTE } from '../mutations/index';
import { Link } from 'react-router-dom';



const Contactos = () => (
    <Query query={CLIENTES_QUERY} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling}) => {
            if(loading) return 'Cargando...';
            if(error) return `Error ${error.message}`;
            

            return (
                <React.Fragment>
                <h2 className="text-center">Listado Clientes</h2>
                    <ul className="list-group mt-4">
                    {data.getClientes.map(item => {
                        const {id} = item;

                        return(
                        <li key={item.id} className="list-group-item">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-md-8 d-flex justify-content-between align-items-center">
                                    {item.nombre} {item.apellido} - {item.empresa}
                                </div>
                                <div className="col-md-4 d-flex justify-content-end">
                                <Mutation mutation={ELIMINAR_CLIENTE}>
                                    {eliminarCliente => (
                                        <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2" onClick={ () =>{
                                            if(window.confirm('Seguro que deseas eliminar ese Cliente?')){
                                                eliminarCliente({
                                                variables: {id}
                                            })
                                            }
                                        }}> &times; Eliminar</button>
                                    )}
                                </Mutation>
                                    
                                    <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                        Editar Clientes
                                    </Link>
                                </div>
                            </div>
                        </li>
                        )
                    })}
                    </ul>
                </React.Fragment>
            )
        }}
    </Query>
)
    

export default Contactos;