import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Route } from 'react-router-dom'
import Home from "./Components/Home"
import NavSocialMedia from "./Components/NavSocialMedia"
import Cart from "./Components/Cart"


function App() {
  return (
    <div className="App">
      <Router>
        <NavSocialMedia />
        <Route path="/" exact component={Home} />
        <Route path="/cart" exact component={Cart}/>
      </Router>
    </div>
  );
}

export default App;
