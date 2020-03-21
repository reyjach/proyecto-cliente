import React, {Component} from 'react';

class Paginador extends Component {
    state = { 
        paginador: {
            pagina: Math.ceil(Number(this.props.totalClientes) / this.props.limite) 
        }
     }
    render() { 
        const {actual} = this.props;



        const btnAnterior = (actual > 1) ? <button onClick={this.props.paginaAnterior} type="button" className="btn btn-success mr-2">
            &laquo; Anterior</button> : '';
    
    

        const {pagina} = this.state.paginador;

        const btnSiguiente = (actual !== pagina) ? <button onClick={this.props.paginaSiguiente} type="button" className="btn btn-success">
            Siguiente &raquo;</button> : '';



        return ( 
            <div className="mt-5 d-flex justify-content-center">
                {btnAnterior}
                {btnSiguiente}
            </div>
         );
    }
}
 
export default Paginador;