import React from 'react';
import { Query } from 'react-apollo';
import { TOP_CLIENTES } from '../../queries/index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
  

const Clientes = () => {
    return ( 
        <Query query={TOP_CLIENTES}>
            {({ loading, error, data}) => {
                        if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                        if(error) return `Error ${error.message}`;

                        //console.log(data)

                        let topClientesGrafica = [];

                        data.topClientes.map((pedido, index) => {
                            topClientesGrafica[index] = {
                                ...pedido.cliente[0],
                                total:pedido.total
                            }

                    
                        });

                        //console.log(topClientesGrafica)
            
                        return (
                            <BarChart
                                width={900}
                                height={300}
                                data={topClientesGrafica}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#10a98b" />
                            </BarChart>
                        )
            }}
        </Query>
     );
}
 
export default Clientes;