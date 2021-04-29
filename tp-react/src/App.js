import React from 'react';
import Tarjeta from './components/Tarjeta';
import Header from './components/Header';
import Footer from './components/Footer';
import {Component} from 'react';


class App extends Component{
    render(){
    return (
    <div className="App">
     <Header/>
      <Tarjeta/>
     <Footer/>
    </div>
  );
  }
}

export default App;