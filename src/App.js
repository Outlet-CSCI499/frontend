
import './App.css';

import { Switch, Route } from "react-router-dom";

import {
  HomePageContainer,
  NewsFeedContainer,
  NewsArticleContainer,
  SignUpContainer,
  LoginContainer
} from './components/containers';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/feed" component={NewsFeedContainer} />
        <Route exact path ="article/:id" component={NewsArticleContainer} />
        <Route exact path="/signup" component={SignUpContainer} />
        <Route exact path="/login" component={LoginContainer} />
      </Switch>
    </div>
  );
}

export default App;
