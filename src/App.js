import React, { useEffect } from 'react';
import { Router, Route } from 'react-router-dom'
import { Layout } from 'antd';
import history from './history';
import { onNotFoundRedirect, routesArray } from './app/config/routeConfig';
import AppLayout from './app/screens/AppLayout';
import './antd.css';

const routes = routesArray();

const App = () => {

  useEffect(() => {
    onNotFoundRedirect(history.location.pathname);
  });

  return (
    <Layout style={{ height: "100vh" }}>
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
                    <AppLayout
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
    </Layout>
  );
}

export default App;
