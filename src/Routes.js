import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { RouteWithLayout } from './components';
import { Main as MainLayout } from './layouts';
import {
  NotFound as NotFoundView,
  ManageTypes as ManageTypesView,
  MachineType as MachineTypeViwe,
} from './views';

const Routes = () => {
  const [path, setPath] = useState('/manage-types');

  const cookies = new Cookies();
  const location = useLocation();

  useEffect(() => {
    if (cookies.get('userToken')) {
      setPath(location.pathname);
    }
    if (location.pathname === '/') {
      setPath('/manage-types');
    }
  }, [location]);

  return (
    <Switch>
      <Route exact path='/'>
        <Redirect from='/' to={path} />
      </Route>
      <RouteWithLayout component={NotFoundView} exact layout={MainLayout} path='/not-found' />
      <RouteWithLayout component={ManageTypesView} exact layout={MainLayout} path='/manage-types' />
      <RouteWithLayout component={MachineTypeViwe} exact layout={MainLayout} path='/machine-type/:id?' />
      <Redirect to='/not-found' />
    </Switch>
  );
};

export default React.memo(Routes);
