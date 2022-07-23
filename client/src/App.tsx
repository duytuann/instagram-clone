import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import { publicRoutes, privateRoutes } from './routes';

import './styles/index.scss';

function App() {
    return (
        <div className="App">
            <Routes>
                {/* {publicRoutes.map((route, index) => {
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
                })} */}
                {privateRoutes.map((route, index) => {
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
