import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import { publicRoutes, privateRoutes } from './routes';
import { useAppDispatch, useAppSelector } from '@/hooks';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import './styles/index.scss';

function App() {
    const {
        data: { isAuthenticated },
    } = useAppSelector((state) => state.auth);
    
    return (
        <div className="App">
            <Routes>
                {isAuthenticated
                    ? publicRoutes.map((route, index) => {
                          const Page = route.page;
                          let Layout = MainLayout;

                          if (route.layout === null) {
                              Layout = React.Fragment;
                          }

                          return (
                              <Route
                                  key={index}
                                  path={route.path}
                                  element={
                                      <Layout>
                                          <Page />
                                      </Layout>
                                  }
                              />
                          );
                      })
                    : privateRoutes.map((route, index) => {
                          const Page = route.page;
                          let Layout = AuthLayout;

                          if (route.layout === null) {
                              Layout = React.Fragment;
                          }

                          return (
                              <Route
                                  key={index}
                                  path={route.path}
                                  element={
                                      <Layout>
                                          <Page />
                                      </Layout>
                                  }
                              />
                          );
                      })}
            </Routes>
        </div>
    );
}

export default App;
