import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import history from './history';
import { onNotFoundRedirect, routesArray } from './app/config/routeConfig';
import AppLayoutContainer from './app/containers/AppLayoutContainer';
import store from './app/redux/config/config';
import './antd.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const routes = routesArray();

const App = () => {

  useEffect(() => {
    onNotFoundRedirect(history.location.pathname);
  });

  return (
    <Provider store={store}>
      <Router history={history}>
        {
          routes.map((r, i) => {
            return (
              <Route
                exact
                key={i}
                path={r.path}
                render={
                  () => (
                    <AppLayoutContainer
                      noSider={r.noSider ? r.noSider : false}
                      noTitle={r.noTitle ? r.noTitle : false}
                      noUser={r.noUser ? r.noUser : false}
                      noFooter={r.noFooter ? r.noFooter : false}
                      content={r.content}
                    />
                  )
                }
              />
            )
          })
        }
      </Router>
    </Provider>
  );
}

export default App;
