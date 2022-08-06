import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const RouteWithLayout = (props) => {
  const { layout: Layout, component: Component, permission, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps) =>
        <Layout>
          <Component {...matchProps} />
        </Layout>
      }
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
};

export default RouteWithLayout;
