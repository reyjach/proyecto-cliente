import React ,{Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



// importar componentes 

import Header from './Componentes/Layout/Header';
import Clientes from './Componentes/Clientes/Clientes';
import EditarCliente from './Componentes/Clientes/EditarCliente';
import NuevoCliente from './Componentes/Clientes/NuevoCliente';

import NuevoProducto from './Componentes/Productos/NuevoProducto';
import Productos from './Componentes/Productos/Productos';
import EditarProducto from './Componentes/Productos/EditarProducto';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component{

  render() {
    return (
     <ApolloProvider client={client}>
        <Router>
          <React.Fragment>
            <Header></Header>
            <div className="container">
              <Switch>
                <Route exact path='/clientes' component={Clientes}></Route>
                <Route exact path='/clientes/editar/:id' component={EditarCliente}></Route>
                <Route exact path='/clientes/nuevo' component={NuevoCliente}></Route>
                <Route exact path='/productos' component={Productos}></Route>
                <Route exact path='/productos/editar/:id' component={EditarProducto}></Route>
                <Route exact path='/productos/nuevo' component={NuevoProducto}></Route>
              </Switch>
            </div>
          </React.Fragment>
        </Router>
     </ApolloProvider>
    );
  }
  
}

export default App;
