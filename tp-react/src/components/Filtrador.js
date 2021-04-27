
import Tarjeta from './Tarjeta';
import Masinfo from './Masinfo';
import React from 'react';
import {Component} from 'react';


class Filtrador extends Component {
    constructor(props) {
        super(props);

        this.state = {
          error: null,
          isLoaded: false,
          numero: "",
          items: []
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

      borrarTarjeta(idItem){
        console.log(idItem)
         let resultado = this.state.items.filter((item)=> {
             return item.login.uuid!== idItem
         })
         this.setState({items: resultado});
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
      abrirFormulario(){
        var x = document.getElementById("formulario");
         if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
          console.log(x.style.display)
      }   

      filtrarTarjetas(){
        let filtrardata = document.getElementById("input").value
        let filtrador = document.getElementById("select").value
    
        
    
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

      render(){

        const {error, isLoaded, items} = this.state;

      

     if (error) {
        return <div> Error: {error.message}</div>
         
     } else {
         return(
            <div>

                {/* FILTRO */}

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

            
                          

            
            {/* AGREGAR TARJETA */}

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

        {/* TARJETAS */}
        <div className="divTarjetas">
                    {items.map(item=> (
                    
                    <Tarjeta nombre={item.name.first} apellido={item.name.last} mail={item.email} 
                    fecha={item.dob.date} edad={item.dob.age} foto={item.picture.large} 
                    id={item.login.uuid} borrarTarjeta= {this.borrarTarjeta.bind(this)}/>

                    ))}
         </div>
        
            
    
    
    
    
    
     </div>
           
            

            


         )
         
     }}
    
}
      
  export default Filtrador;