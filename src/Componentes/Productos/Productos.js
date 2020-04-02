import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { OBTENER_PRODUCTOS } from '../../queries/index';
import { Link } from 'react-router-dom';
import { ELIMINAR_PRODUCTO } from '../../mutations/index';
import Exito from '../Alerta/Exito';
import Paginador from '../Paginador';

class Productos extends Component {

    limite = 2;

    state = { 

        alerta: {
            mostrar: false,
            mensaje: ''
        },
        paginador:{
            offset:0,
            actual:1
        }
     }
    

    paginaAnterior = () =>{
        this.setState({
            paginador: {
                offset: this.state.paginador.offset - this.limite,
                actual: this.state.paginador.actual - 1
            }
        })
    }

    paginaSiguiente = () =>{
        this.setState({
            paginador: {
                offset: this.state.paginador.offset + this.limite,
                actual: this.state.paginador.actual + 1
            }
        })
    }
    render() { 

        const {alerta: {mostrar, mensaje}} = this.state;

        const alerta = (mostrar) ? <Exito mensaje={mensaje}></Exito> : '';

        return ( 
            <React.Fragment>
                <h1 className="text-center mb-5">Productos</h1>
                {alerta}
                <Query query={OBTENER_PRODUCTOS} pollInterval={1000} variables={{limite:this.limite, offset: this.state.paginador.offset}}>
                    {({ loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                        if(error) return `Error ${error.message}`;

                        //console.log(data)
            
                        return (
                            <React.Fragment>

                            
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
                                                <Mutation 
                                                    mutation={ELIMINAR_PRODUCTO} 
                                                    onCompleted={(data) =>{
                                                        //console.log(data)
                                                        this.setState({
                                                            alerta: {
                                                                mostrar: true,
                                                                mensaje: data.eliminarProducto
                                                            }
                                                        }, () => {
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alerta:{
                                                                        mostrar:false,
                                                                        mensaje: ''
                                                                    }
                                                                })
                                                            },3000);
                                                        })
                                                    }}> 
                                                    {eliminarProducto => (
                                                        <button 
                                                            onClick={ () => {
                                                                if(window.confirm('¿Seguro que deseas este prodcuto?')){
                                                                    eliminarProducto({
                                                                        variables: {id}
                                                                    })
                                                                }
                                                            } } 
                                                            type="button" 
                                                            className="btn btn-danger"
                                                        >&times; Eliminar</button>
                                                    )}
                                                </Mutation>
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
                            <Paginador actual={this.state.paginador.actual} total={data.totalProductos} limite={this.limite} paginaAnterior={this.paginaAnterior} paginaSiguiente={this.paginaSiguiente}>

                            </Paginador>

                            </React.Fragment>
                            
                        )
                    }}
                </Query>

            </React.Fragment>
         );
    }
}
 
export default Productos;