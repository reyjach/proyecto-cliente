import React from 'react';
import { Query } from 'react-apollo';
import { TOP_VENDEDORES } from '../../queries/index';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
  

const Vendedores = () => {
    return ( 
        <Query query={TOP_VENDEDORES}>
            {({ loading, error, data}) => {
                        if(loading) return (
                                <div className="spinner">
                                    <div className="bounce1"></div>
                                    <div className="bounce2"></div>
                                    <div className="bounce3"></div>
                                </div>);
                        if(error) return `Error ${error.message}`;

                        //console.log(data)

                        let topVendedoresGrafica = [];

                        data.topVendedores.map((vendedor, index) => {
                            topVendedoresGrafica[index] = {
                                ...vendedor.vendedor[0],
                                total:vendedor.total
                            }

                    
                        });

                        //console.log(topVendedoresGrafica)
            
                        return (
                            <BarChart
                                width={900}
                                height={300}
                                data={topVendedoresGrafica}
                                margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="nombre" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="total" fill="#6148b9" />
                            </BarChart>
                        )
            }}
        </Query>
     );
}
 
export default Vendedores;