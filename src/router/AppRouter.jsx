import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';

import { ChatPage } from '../pages/ChatPage';

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {

    const {auth, verificaToken} = useContext(AuthContext)
    // console.log(auth)
    useEffect(() => {
      verificaToken();
    }, [verificaToken])


    if( auth.checking ){
      return <h1>Espere por favor...</h1>
    }



    return (
        <Router>
      <div>
    
        <Switch>

          {/* <Route path="/auth" component={ AuthRouter } /> */}
          {/* <Route exact path="/"  component={ ChatPage } /> */}
          <PublicRouter isAuthenticated={auth.logged}  path="/auth" component ={ AuthRouter } />
          <PrivateRoute isAuthenticated={auth.logged}  path="/" component ={ ChatPage } />

          <Redirect to="/" />

        </Switch>
      </div>
    </Router>
    )
}

