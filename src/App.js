
import Header from "./components/Header";
import Users from "./components/Users";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Card from "./components/Card";

function App() {
  return (
      <Router>
    <div className="App">
    <Header />
    <div>

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about"  component={About}/>
        <Route path="/user" exact component={Users} />
        <Route path="/user/:itemId"  component={Card} />
      </Switch>

    </div>
    </div>
    </Router>
  );
}

export default App;
