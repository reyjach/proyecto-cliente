import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';


class ContenidoPedido extends Component {
    state = { 
        productos: [],
        total:0
     }

    seleccionarProducto = (productos) => {
        //console.log(`Algo paso con: ${productos}`, productos);

        this.setState({
            productos
        })

    }

    actualizarTotal = () => {
        // leer el state de productos

        const productos = this.state.productos;
        
        // cuando el producto esta la cantidad en 0
        if(productos.length ===0) {
            this.setState({
                total: 0
            });
            return;
        }

        let nuevoTotal = 0;

        
        

        // realizar la operacion de cantidad
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));


        this.setState({
            total: nuevoTotal
        })
    }

    actualizarCantidad = (cantidad, index) => {
       
        const productos = this.state.productos;

        // agregar la cantidad desde la interfaz
        productos[index].cantidad = Number(cantidad);




        // validamos


        // agregar al state
        this.setState({
            productos
        }, () => {
            this.actualizarTotal()
        })
    }

    eliminarProducto = (id) => {
        // console.log(id)

        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, () => {
            this.actualizarTotal()
        })

    }

    render() { 
        return (  
            <React.Fragment>
                <h2 className="text-center mb-5"> Seleccionar Articulos</h2>
                <Select 
                    onChange={this.seleccionarProducto}
                    options={this.props.productos} 
                    isMulti
                    components={makeAnimated()}
                    placeholder={'Seleccionar Productos'}
                    getOptionValue = {(options) => options.id}
                    getOptionLabel = {(options) => options.nombre}
                    value = {this.state.productos}
                /> 

                <Resumen productos={this.state.productos} actualizarCantidad={this.actualizarCantidad} eliminarProducto={this.eliminarProducto}></Resumen>

                <p className="font-weight-bold float-right mt-3">
                    Total:
                    <span className="font-weight-normal">
                        $ {this.state.total}
                    </span>
                </p>
            </React.Fragment>
            
        );
    }
}
 
export default ContenidoPedido;