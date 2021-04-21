import React from 'react';
//import Info from './Info';
import {Component} from 'react';
//import {Modal, TextField, Button, withWidth} from '@material-ui/core';
//import {makestyles, withTheme} from '@material-ui/core/styles';
import Masinfo from './Masinfo';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        this.detalle = React.createRef()
        this.desplegarInfo = this.desplegarInfo.bind( this )
        
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
     
        this.detalle.current.style.display = 'block'
 
      }

      cerrarInfo(){
        this.detalle.current.style.display = 'none'
 
      }

  agregarTarjeta(){
      fetch("https://randomuser.me/api/")
       .then(resource => resource.json())
       .then(data => {
           console.log(data)
           this.state.items.push(data.results[0]);
           this.setState({items: this.state.items});
       })
   }

   borrarTarjeta(idItem){
     console.log(idItem)
      let resultado = this.state.items.filter((item)=> {
          return item.login.uuid!== idItem
      })
      this.setState({items: resultado});
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
        
        <h1 className="titulo">T A R J E T A S</h1>
        <ul>
          <div><button className="agregar" onClick={this.agregarTarjeta.bind(this)}> Agregar tarjetas </button></div>
          
          <br></br>
          {items.map(item => (
            <div className="info" key={item.login.uuid}>
              Nombre y apellido: {item.name.first} {item.name.last} <br></br>
              <img src={item.picture.medium} className="imagen"/>
              <div> Email: {item.email} </div>
              <div> Fecha de nacimiento: {item.dob.date.substring(0,10)} ({item.dob.age}) </div>
               <div>
               <button className="detalles" onClick={this.desplegarInfo}> Ver más detalles </button>
              </div>

              <div className="detalle" ref={this.detalle}>

                    <div>Calle y número:{item.location.street.number} </div>
                    <div>Ciudad: {item.location.city} </div>
                    <div>País: {item.location.country}</div>
                    <div>Código postal: {item.location.postcode}</div>
                    <div>Fecha de registro: {item.registered.date.substring(0,10)}</div>
                    <div>Teléfono: {item.phone}</div>
              </div>

              <br></br>
              <button id="cerrarDetalle" className="borrar" onClick={this.borrarTarjeta.bind(this, item.login.uuid)}>
                    Eliminar esta tarjeta
              </button>

            </div>
          ))}
        </ul>
        <div>
              <h4>Filtrar tarjetas </h4>
              <h6>Nombre</h6>
              <h6>Apellido</h6>
              <h6>Edad</h6>
              <h6>Ordenar de forma ascendente/descendente</h6>
            </div>
        </React.Fragment>
      )
    }
  }
}

export default Tarjeta;