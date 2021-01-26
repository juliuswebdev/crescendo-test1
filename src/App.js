
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import AddRecipe from './components/AddRecipe';
import './App.css';


function App() {
  return (
    <Router>
      <Switch>
          <Route exact component={Recipes} path='/'></Route>
          <Route exact component={Recipe} path='/recipe/:id'></Route>
          <Route exact component={AddRecipe} path='/addrecipe/'></Route>
      </Switch>
    </Router>
  );
}

export default App;
