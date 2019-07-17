import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

import "./App.css";

const HatsPage: React.FC = () => {
  return (
    <div>
      <h1>Hats Page</h1>
    </div>
  );
};


const NotFoundPage: React.FC = () => {
  return (
    <div>
      <div style={{
        backgroundImage: `url(../images/PageNotFound.jpg)`,
        backgroundRepeat: 'no-repeat',
        height: '60vh',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
      }}></div>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={HatsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
