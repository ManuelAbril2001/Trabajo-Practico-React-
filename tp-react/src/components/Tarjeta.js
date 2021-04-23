import React from 'react';
//import Info from './Info';
import {Component} from 'react';
//import {Modal, TextField, Button, withWidth} from '@material-ui/core';
//import {makestyles, withTheme} from '@material-ui/core/styles';
//import Masinfo from './Masinfo';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        this.detalle = React.createRef()
        this.desplegarInfo = this.desplegarInfo.bind( this )

        // buscador

        this.state={
          nombre:'',
          apellido:'',
          edad:','
        };
        this.handleInputChange = this.handleInputChange.bind(this);

    
        //buscador
        
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
        };
      }
    
      componentDidMount() {
        fetch("https://randomuser.me/api/?results=10")
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

  desplegarInfo(){
    var x = document.getElementById("detalle");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
  }

  agregarTarjeta(e){
    e.preventDefault();
    var x = document.getElementById("formulario");
     if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
      console.log(x.style.display)
      // fetch("https://randomuser.me/api/")
      // .then(resource => resource.json())
      // .then(data => {
      //     console.log(data)
      //     this.state.items.push(data.results[0]);
      //     this.setState({items: this.state.items});
      // })
  }


   borrarTarjeta(idItem){
     console.log(idItem)
      let resultado = this.state.items.filter((item)=> {
          return item.login.uuid!== idItem
      })
      this.setState({items: resultado});
  }

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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
        
        <h1 className="titulo">Personas desconocidas</h1>
        <ul>
          <div>
          <div className="buscador">

          {/* handleChange corre cada vez que una tecla es oprimida para actualizar el estado de React, el valor mostrado será actualizado mientras que el usuario escribe. */}

          <form onSubmit={this.handleSubmit}>
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
          </form>

          </div>
          <div className="botonAgregar"><button className="agregar" onClick={this.agregarTarjeta.bind(this)}> Agregar tarjetas </button></div>
          <br></br>
          <br></br>
          <br></br>
          <form id="formulario">
            <label> Cuantas tarjetas queres agregar?
              <input type="number"></input>
            </label>
          </form>
          </div>

          <br></br>
          {items.map(item => (
            <div className="info" key={item.login.uuid}>
              <button className="borrar" onClick={this.borrarTarjeta.bind(this, item.login.uuid)}> X </button>
            <div className="datos"> 
              <span className="nombreapellido"> {item.name.first} {item.name.last} </span>
              <br></br>
              <img src={item.picture.large} className="imagen"/>
              <div> <span className="cosas1">Email:</span> {item.email} </div>
              <div> <span className="cosas1">Fecha de nacimiento:</span> {item.dob.date.substring(0,10)} ({item.dob.age}) </div>
            </div>
            
               <div>
            <button className="detalles" onClick={this.desplegarInfo}> Ver más detalles </button>
              </div>
              {/* onClick={this.desplegarInfo} */}
              <div id="detalle" className="detalle" key={item.login.uuid}>
              {/* ref={this.detalle} */}
                    <div> <span className="cosas2">Calle y número:</span>{item.location.street.number} </div>
                    <div><span className="cosas2">Ciudad:</span> {item.location.city} </div>
                    <div><span className="cosas2">País:</span> {item.location.country}</div>
                    <div><span className="cosas2">Código postal:</span>{item.location.postcode}</div>
                    <div><span className="cosas2">Fecha de registro:</span>{item.registered.date.substring(0,10)}</div>
                    <div><span className="cosas2">Teléfono:</span>{item.phone}</div>
              </div>
            </div>
          ))}
        </ul>
        {/* <div>
              <h4>Filtrar tarjetas </h4>
              <h6>Nombre</h6>
              <h6>Apellido</h6>
              <h6>Edad</h6>
              <h6>Ordenar de forma ascendente/descendente</h6>
        </div> */}
        </React.Fragment>
      )
    }
  }
}

export default Tarjeta;