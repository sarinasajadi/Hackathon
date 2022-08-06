import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import _ from 'lodash';
import Topbar from './components/Topbar';
import './main.css';

const { Header, Content } = Layout;

const Main = (props) => {
  const { children } = props;

  return (
    <Layout className="layout" id='root'>
      <Header>
        <div className="logo" />
        <Topbar />
      </Header>
      <Content style={{ padding: '20px 50px' }} id='root'>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
