import React from 'react';
import Producto from './Producto';

const Resumen = (props) => {

    const productos = props.productos;

    //console.log(productos)

    if(productos === null) return null;

    if(productos.length === 0) return null;

    return ( 
        <React.Fragment>
            <h2 className="text-center my-5">Resumen y cantidades</h2>

            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weigth-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Inventario</th>
                        <th>Cantidad</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <Producto key={producto.id} id={producto.id} producto={producto} index={index} actualizarCantidad={props.actualizarCantidad} eliminarProducto={props.eliminarProducto}></Producto>
                    ))}
                </tbody>
            </table>
        </React.Fragment>
     );
}
 
export default Resumen;