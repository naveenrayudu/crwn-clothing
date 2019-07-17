import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";

import "./App.css";
import ShopPage from "./pages/shoppage/shoppage.component";


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
    <div style={{
      padding: '20px 60px'
    }}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
};

export default App;
