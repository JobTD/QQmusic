import React, { Component } from 'react';
import Router from './router/index'
import Routers from './router/Router'
import './App.css'

class App extends Component {
  render() {
    return (
     <div >
       <Router routes={Routers}/>
     </div>
    );
  }
}

export default App;
