import React from 'react';
import {Component} from 'react';


class Filtrador extends Component {
    constructor(props) {
        super(props);
        this.state={
          error: null,
          isLoaded: false,
          nombre: "",
          apellido: "",
          edad:"",
          api: [],
        };
      }
      
      componentDidMount() {
        fetch("https://randomuser.me/api/?results=10")  
        .then(res => 
          res.json())
        .then(
          (data) => {
            console.log(data);
    
              this.setState({
                isLoaded: true,
                items: data.results,
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

    abrirFormulario(){
        var x = document.getElementById("filtrador");
         if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
          console.log(x.style.display)
    }   

    filtrarNombre(){
      let nombre = this.state.value.toLowerCase()
      let resultado = this.state.api.filter((api) =>{
        return api.name.first.toLowerCase().includes(nombre)
      });
      console.log(resultado)
        this.setState({api: resultado});
    }

    filtrarApellido(){
      let apellido = this.state.value.toLowerCase()
      let resultado = this.state.api.filter((api) =>{
        return api.name.first.toLowerCase().includes(apellido)
      });
      console.log(resultado)
        this.setState({api: resultado});
    }

    filtrarEdad(){
      let edad = this.state.value
      let resultado = this.state.api.filter((api) =>{
        return api.dob.age === edad
      });
      console.log(resultado)
        this.setState({api: resultado});
    }
     
  render(){
        const {error, isLoaded, items} = this.state;
     if (error) {
        return <div> Error: {error.message}</div>
     } else {
         return(
           <React.Fragment>
          <button className="filtrar" onClick={this.abrirFormulario.bind(this)}> Filtrar tarjetas </button>
          
          <div id="filtrador">
            <label>Filtrar</label>
            <br></br>
              <input placeholder="por nombre" onChange={(event)=> this.setState({value: event.target.value})}></input>
              <button className="filtrado" onClick={this.filtrarNombre.bind(this)}>Filtrar</button>
            <br></br>
              <input placeholder="por apellido" onChange={(event)=> this.setState({value: event.target.value})}></input>
              <button className="filtrado" onClick={this.filtrarApellido.bind(this)}>Filtrar</button>
            <br></br>
              <input placeholder="por edad" type="number" onChange={(event)=> this.setState({value: event.target.value})}></input>
              <button className="filtrado" onClick={this.filtrarEdad.bind(this)}>Filtrar</button>
            <br></br>
          </div>
          </React.Fragment>         
        );
     }
    }
}
      
  export default Filtrador;