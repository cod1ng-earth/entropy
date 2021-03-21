import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Create from '../Pages/Create/Create';
import Compose from '../Pages/Compose/Compose';
import Arts from '../Pages/Arts/Arts';
import Token from '../Pages/Token/Token';

const Navigation = () => {
  return (
    <Switch>
      <Route path="/token/:id">
        <Token />
      </Route>
      <Route path="/create">
        <Create />
      </Route>
      <Route path="/compose">
        <Compose />
      </Route>
      <Route path="/">
        <Arts/>
      </Route>
    </Switch>
  );
};

export default Navigation;
