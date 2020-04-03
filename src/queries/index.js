import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql `
      query getClientes($limite: Int, $offset: Int){
        getClientes(limite: $limite, offset:$offset){
          id
          nombre
          apellido
          empresa
      }
    totalClientes
}
`;

export const CLIENTE_QUERY = gql `
  query consultarCliente($id:ID){
  getCliente(id: $id){
    id
    nombre
    apellido
    empresa
    edad
    tipo
    emails {
      email
    }
  }
}


`;

//PRODUCTOS

export const OBTENER_PRODUCTOS = gql `
  query obtenerProductos($limite: Int, $offset: Int, $stock: Boolean){
    obtenerProductos(limite: $limite, offset: $offset, stock: $stock){
      id
      nombre
      precio
      stock
    }
    totalProductos
}

`;

export const OBTENER_PRODUCTO = gql `
  query obtenerProducto($id: ID!){
    obtenerProducto(id: $id){
      nombre
      precio
      stock
    }
}

`;
// Pedidos

export const OBTENER_PEDIDOS = gql `
  query obtenerPedidos($cliente: String){
    obtenerPedidos(cliente: $cliente){
      id
      total
      fecha
      estado
      pedido {
        id
        cantidad
      }
  }
}
`;
  