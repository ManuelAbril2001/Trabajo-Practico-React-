import React from 'react';
import {Component} from 'react';
import Masinfo from './Masinfo';
import Agregar from './Agregar';
//import {Modal, TextField, Button, withWidth} from '@material-ui/core';
//import {makestyles, withTheme} from '@material-ui/core/styles';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        this.ordenarAscendente = this.ordenarAscendente.bind(this);
        this.ordenarDescendente = this.ordenarDescendente.bind(this);
        this.state={
          numero: "",
          items: []
        };
        
        // buscador

      }
    
      componentDidMount() {
        fetch("https://randomuser.me/api/?results=5")
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

  // DESPLAZAMIENTO
  // cambiarDespla(){
   
  // }


   

  ordenarAscendente(){
    this.setState(prevState => {
      this.state.item.name.sort((a,b) => (a.first - b.first))
    });
  }

  ordenarDescendente(){
    this.setState(prevState => {
      this.state.item.name.sort((a,b) => (b.first - a.first))
    });
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


  // FILTROS
  filtrarTarjetas(){
    let filtrardata = document.getElementById("input").value
    let filtrador = document.getElementById("select").value

    console.log(filtrardata)
    console.log(filtrador)


    if (filtrador === "Edad"){
      let resultado = this.state.items.filter( (item) => {
        return item.dob.age == filtrardata 
      }) 
      this.setState({items: resultado})
    } else if (filtrador === "Nombre"){
      let resultado = this.state.items.filter( (item) => {
        return item.name.first.includes(filtrardata)
      })
      this.setState({items: resultado})
    } else if (filtrador === "Sexo"){
      let resultado = this.state.items.filter( (item) => {
        return item.gender === filtrardata
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
        
        <h1 className="titulo">TARJETAS</h1>
          
        {/* <div className="horver">
          <button className="desplazamiento" onClick={this.cambiarDespla.bind(this)}> Cambiar desplazamiento</button>
        </div> */}

        <br></br>


 
    <div>
    <label>Filtrar</label>
          <select id="select">
               <option>Nombre</option>
               <option>Edad</option>
               <option>Sexo</option>
          </select>

                  <input className="inputData" id="input" name="filtro" />

                  <div className="">
                    <button className="" onClick={this.filtrarTarjetas.bind(this)}>Filtrar</button>
                    <button className="" onClick={this.componentDidMount.bind(this)}>Resetear </button>
                  </div>

    
    </div>
    
            
          {/* <Agregar/> */}
          {/* <br></br>

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
        </ul> */}

        </React.Fragment>
      )
    }
  }
}

export default Tarjeta;