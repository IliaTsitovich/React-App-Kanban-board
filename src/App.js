import React, { useState, createContext, useContext } from "react";
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Header from "./components/Header/Header";
import MainPage from "./components/Main-page/main-page";
import Footer from "./components/footer/Footer";

import "./index.scss";

export const Context = createContext();

function App() {

  const [lenghtTasks, setLenghtTasks] = useState('');

  return (
    <Context.Provider value={{lenghtTasks,setLenghtTasks}}>
    <Header/>
      <Routes>
        <Route path="/React-App-Kanban-board/">
          <MainPage/>
        </Route>

      </Routes>
    <Footer/>
    </Context.Provider>
  );
}

export default App;
