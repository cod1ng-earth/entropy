import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from '../Pages/Create/Create';

const Navigation = () => {
  return (
    <Switch>
      <Route path="/arts/{id}">
      </Route>
      <Route path="/arts">
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/">
      </Route>
    </Switch>
  );
};

export default Navigation;
