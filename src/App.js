
import './App.css';

import { Switch, Route } from "react-router-dom";

import {
  HomePageContainer
} from './components/containers';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
      </Switch>
    </div>
  );
}

export default App;
