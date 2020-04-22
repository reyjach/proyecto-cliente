import React from 'react';
import Clientes from './Clientes';
import Vendedores from './Vendedores';

const Panel = () => {
    return ( 
        <React.Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
            <Clientes></Clientes>
            <h1 className="text-center my-5">Top 10 Vendedores que mas vendieron</h1>
            <Vendedores></Vendedores>
        </React.Fragment>
     );
}
 
export default Panel;