import React from 'react';
import { Routes, Route, Router } from 'react-router-dom';

import MainLayout from '@/layouts/MainLayout';
import { publicRoutes } from './routes';

import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
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
                })}
            </Routes>
        </div>
    );
}

export default App;
