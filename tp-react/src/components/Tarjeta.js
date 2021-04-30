import React from 'react';
import {Component} from 'react';
import Masinfo from './Masinfo';
import Agregar from './Agregar';
import Filtrador from './Filtrador';
//import {Modal, TextField, Button, withWidth} from '@material-ui/core';
//import {makestyles, withTheme} from '@material-ui/core/styles';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        this.state={
          error: null,
          isLoaded: false,
          numero: "",
          items: [],

      }
    }
    
      componentDidMount() {
        fetch("https://randomuser.me/api/?results=4")
          .then(res => res.json())
          .then(
            (data) => {
                console.log(data)
              this.setState({
                isLoaded: true,
                items: data.results
              });
            },            
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )  
      }

  // AGREGAR
  abrirFormulario(){
    var x = document.getElementById("formulario");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
  }

  agregarTarjeta(){
    console.log(this.state.numero)
      fetch("https://randomuser.me/api/?results="+ this.state.numero )
      .then(resource => resource.json())
      .then(data => {
        console.log(data)
        let agregado = this.state.items.concat(data.results);
        this.setState({items: agregado});
    })
    var x = document.getElementById("formulario");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
  }


  // BORRAR
  borrarTarjeta(idItem){
     console.log(idItem)
      let resultado = this.state.items.filter((item)=> {
          return item.login.uuid!== idItem
      })
      this.setState({items: resultado});
  }

  //FILTRAR
abrirFiltrador(){
    var x = document.getElementById("filtrador");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
}

filtrarTarjetas(){
  let datofiltrar = document.getElementById("inputusuario").value
  let filtrado = document.getElementById("eleccion").value

  console.log(datofiltrar)
  console.log(filtrado)


  if (filtrado === "Edad"){
    let resultado = this.state.items.filter( (item) => {
      return item.dob.age == datofiltrar 
    }) 
    this.setState({items: resultado})
  } else if (filtrado === "Nombre"){
    let resultado = this.state.items.filter( (item) => {
      return item.name.first.includes(datofiltrar)
    })
    this.setState({items: resultado})
  } else if (filtrado === "Apellido"){
    let resultado = this.state.items.filter( (item) => {
      return item.name.last === datofiltrar
    })  
    this.setState({items:resultado})
  }
}



  // VISTA
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Cargando...</div>;
    } else {
      return (
        <React.Fragment>
          <body>
        
        <h1 className="titulo">TARJETAS</h1>
        <br></br>
 

          <button className="filtrar" onClick={this.abrirFiltrador.bind(this)}> Filtrar tarjetas </button>
           <div id="filtrador">
            <select id="eleccion">
              <option>Nombre</option>
              <option>Apellido</option>
              <option>Edad</option>
            </select>

            <input className="inputusuario" id="inputusuario"/>

              <div className="div-botones">
                <button className="filtrado" onClick={this.filtrarTarjetas.bind(this)}>Filtrar</button>
                <button className="filtrado"onClick={this.componentDidMount.bind(this)}>Reset</button>
              </div>
            </div>

        <br></br>

          <div className="agregado">
              <div className="botonAgregar"><button className="agregar" onClick={this.abrirFormulario.bind(this)}> Agregar tarjetas </button></div>        
                <br></br>
                <br></br>
              <div id="formulario">
                  ¿Cuantas tarjetas queres agregar?
                  <input className="valor" type="number" onChange={(event) => this.setState({numero: event.target.value})}></input>
                  <button className="botonagregar" onClick={this.agregarTarjeta.bind(this)}> Agregar </button>
              </div>
            </div>
          <br></br>
          <br></br>

        <ul>
          {items.map(item => (
            <div className="info" key={item.login.uuid}>
             <button className="borrar" onClick={this.borrarTarjeta.bind(this, item.login.uuid)}> X </button>
            
            <div className="datos"> 
              <span className="nombreapellido"> {item.name.first} {item.name.last} </span>
              <br></br>
              <img src={item.picture.large} alt="foto de perfil" className="imagen"/>
              <div> <span className="cosas1">Email:</span> {item.email} </div>
              <div> <span className="cosas1">Fecha de nacimiento:</span> {item.dob.date.substring(0,10)} ({item.dob.age}) </div>
            </div>

             <Masinfo/>

            </div>
          ))}
        </ul> 
        </body>

        </React.Fragment>
      )
    }
  }
}

export default Tarjeta;