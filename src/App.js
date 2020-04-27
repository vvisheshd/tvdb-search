import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Search from './components/routes/Search';
import './App.css';

const App = (props) => {
    return (
      <Router>
        <div className="app-routes">
          <Switch>
            <Route path="/" component={Search} />
            <Route path="/search" component={Search} />
          </Switch>
      </div>
    </Router>
    );
  }

export default App;
