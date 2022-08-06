import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import './assets/css/index.css';
import 'antd/dist/antd.css';

export default () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
