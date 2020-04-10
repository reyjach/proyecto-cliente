import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { USUARIO_ACTUAL } from '../queries/index';

const Session = Component => props => {
    return (
        <Query query={USUARIO_ACTUAL}>
            {({ loading, error, data, refetch}) => {
                if (loading) return null;
                return <Component {...props} refetch={refetch} session={data}></Component>

                    
            }}
        </Query>  
    )
      
}
 
export default Session;
