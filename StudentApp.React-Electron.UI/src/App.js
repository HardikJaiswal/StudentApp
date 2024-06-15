import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard.tsx';
import './StyleSheet.css';
import 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {

    render() {
        return (
            <Routes>
                <Route path="/" element={<Dashboard/> } />
            </Routes>
        );
    }
}
