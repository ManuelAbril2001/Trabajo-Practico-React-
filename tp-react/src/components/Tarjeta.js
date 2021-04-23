import React from 'react';
import {Component} from 'react';
import Masinfo from './Masinfo';
import Agregar from './Agregar';
//import {Modal, TextField, Button, withWidth} from '@material-ui/core';
//import {makestyles, withTheme} from '@material-ui/core/styles';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        // this.ordenarAscendente = this.ordenarAscendente.bind(this);
        // this.ordenarDescendente = this.ordenarDescendente.bind(this);
        this.state={
          numero: "",
        };
        
        // buscador
        this.state={
          nombre:'',
          apellido:'',
          edad:','
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        // buscador
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
        };
      }
    
      componentDidMount() {
        fetch("https://randomuser.me/api/?results=2")
          .then(res => res.json())
          .then(
            (data) => {
                console.log(data)
                var resultadosBusqueda = data.results.length

                for (var i = 0; i < resultadosBusqueda.length; i++) {
                  console.log(resultadosBusqueda[i]);
                }
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


      // FILTROS

  filtrarTarjetas(){
    var x = document.getElementById("buscador");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
  }   

  // ordenarAscendente(){
  //   this.setState(prevState => {
  //     this.state.item.name.sort((a,b) => (a.first - b.first))
  //   });
  // }

  // ordenarDescendente(){
  //   this.setState(prevState => {
  //     this.state.item.name.sort((a,b) => (b.first - a.first))
  //   });
  // }

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
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('buscaste: ' + this.state.value);
    event.preventDefault();
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
        
        <h1 className="titulo">Personas desconocidas</h1>
       
          <div>
          <div><button className="filtros" onClick={this.filtrarTarjetas.bind(this)}> Filtrar tarjetas </button></div>        
          <br></br>
          <br></br>
          
          <div id="buscador" className="buscador">

          {/* handleChange corre cada vez que una tecla es oprimida para actualizar el estado de React, el valor mostrado será actualizado mientras que el usuario escribe. */}

          <div onSubmit={this.handleSubmit}>
            <label>
                    <input 
                      value={this.state.nombre} onChange={this.handleChange} placeholder="Nombre"className="inputBuscador">
                    </input> 
             </label>       
             <label>
                    <input 
                      value={this.state.apellido} onChange={this.handleChange} placeholder="Apellido"className="inputBuscador">
                    </input> 

             </label>
             <label>
                    <input 
                      value={this.state.edad} onChange={this.handleChange} placeholder="Edad"className="inputBuscador">
                    </input> 

             </label>

            <input className="invisible" type="submit" value="Submit" />
          </div>

          </div>

          {/* <div>
           <button className="orden" onClick={this.ordenarAscendete}> Ascendente </button>
           <button className="orden" onClick={this.ordenarDescendente}> Descendente </button>
          </div> */}
          <br></br>
          <br></br>
          </div>
            
          {/* <Agregar/> */}
          <div className="botonAgregar"><button className="agregar" onClick={this.abrirFormulario.bind(this)}> Agregar tarjetas </button></div>        
          <br></br>
          <br></br>
          <br></br>
          <div id="formulario">
            ¿Cuantas tarjetas queres agregar?
              <input type="number" onChange={(event) => this.setState({numero: event.target.value})}></input>
              <button className="botonagregar" onClick={this.agregarTarjeta.bind(this)}> Agregar </button>
           </div>

          
        <ul>
          <br></br>
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

        </React.Fragment>
      )
    }
  }
}

export default Tarjeta;