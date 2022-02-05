import React from "react";
import FrontPage from "./pages/FrontPage";
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegForm from "./components/RegForm";
import SingleProductPage from "./pages/SingleProductPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";


function App() {
  const isLoggedIn = useSelector((state) => state.register.token);
  return (
    <Router>
      <Switch>
        {isLoggedIn && <Route path='/home'>
          <HomePage />
        </Route>}
        <Route exact path='/'>
          <FrontPage />
        </Route>
        <Route exact path='/form'>
         <LoginPage />
        </Route>
        <Route exact path='/regForm'>
          <RegForm />
        </Route>
        <Route path='/products/:id'>
          <SingleProductPage />
        </Route>
        <Route path='/products'>
          <ProductPage/>
        </Route>
        {isLoggedIn && <Route path='/cart'>
          <CartPage/>
        </Route>}
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Router>

  );
}
export default App;
