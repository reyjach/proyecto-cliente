import React from 'react';
import Clientes from './Clientes';

const Panel = () => {
    return ( 
        <React.Fragment>
            <h1 className="text-center my-5">Top 10 Clientes que más compran</h1>
            <Clientes></Clientes>
        </React.Fragment>
     );
}
 
export default Panel;