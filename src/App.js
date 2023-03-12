
import './App.scss';

import { Routes, Route } from "react-router-dom";

import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'


const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
