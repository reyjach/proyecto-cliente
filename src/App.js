import React  from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';



// importar componentes 

import Header from './Componentes/Layout/Header';
import Clientes from './Componentes/Clientes/Clientes';
import EditarCliente from './Componentes/Clientes/EditarCliente';
import NuevoCliente from './Componentes/Clientes/NuevoCliente';

import NuevoProducto from './Componentes/Productos/NuevoProducto';
import Productos from './Componentes/Productos/Productos';
import EditarProducto from './Componentes/Productos/EditarProducto';

import NuevoPedido from './Componentes/Pedidos/NuevoPedido';

import PedidosCliente from './Componentes/Pedidos/PedidosCliente';

import Panel from './Componentes/Panel/Panel';
import Registro from './Componentes/Auth/Registro';
import Login from './Componentes/Auth/Login';

import Session from './Componentes/Session';



const App = ({refetch,session}) => {

  //console.log(session)

  const { obtenerUsuario } = session;

  const mensaje = (obtenerUsuario) ? `Bienvenido: ${obtenerUsuario.nombre}` : <Redirect to="/login" />;

  return (
    
      <Router>
        <React.Fragment>
          <Header session={session}></Header>
          <div className="container">
            <p className="text-right">{mensaje}</p>
            <Switch>
              <Route exact path='/clientes' render={() => <Clientes session={session}></Clientes>}></Route>
              <Route exact path='/clientes/editar/:id' component={EditarCliente}></Route>
              <Route exact path='/clientes/nuevo' render={() => <NuevoCliente session={session}></NuevoCliente>}></Route>
              <Route exact path='/productos' component={Productos}></Route>
              <Route exact path='/productos/editar/:id' component={EditarProducto}></Route>
              <Route exact path='/productos/nuevo' component={NuevoProducto}></Route>
              <Route exact path='/pedidos/nuevo/:id' render={() => <NuevoPedido session={session}></NuevoPedido>}></Route>
              <Route exact path='/pedidos/:id' component={PedidosCliente}></Route>
              <Route exact path='/registro' render={() => <Registro session={session}></Registro>}></Route>
              <Route exact path='/login' render={() => <Login refetch={refetch}></Login>}></Route>
              <Route exact path='/panel' component={Panel}></Route>
            </Switch>
          </div>
        </React.Fragment>
      </Router>
  ) 
}
     
   


const RootSession = Session(App);

export { RootSession }
