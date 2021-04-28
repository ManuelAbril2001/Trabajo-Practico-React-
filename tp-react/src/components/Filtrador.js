
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
          buscado: "",
          textoInput:"",
          usuario: [],
          usuarioinicial:[],
          items:[],
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

    //   borrarTarjeta(idItem){
    //     console.log(idItem)
    //      let resultado = this.state.items.filter((item)=> {
    //          return item.login.uuid!== idItem
    //      })
    //      this.setState({items: resultado});
    //  }

    //   agregarTarjeta(){
    //     console.log(this.state.numero)
    //       fetch("https://randomuser.me/api/?results="+ this.state.numero )
    //       .then(resource => resource.json())
    //       .then(data => {
    //         console.log(data)
    //         let agregado = this.state.items.concat(data.results);
    //         this.setState({items: agregado});
    //     })
    //     var x = document.getElementById("formulario");
    //      if (x.style.display === "none") {
    //       x.style.display = "block";
    //     } else {
    //       x.style.display = "none";
    //     }
    //       console.log(x.style.display)
    //   }

      abrirFormulario(){
        var x = document.getElementById("formulario");
         if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
          console.log(x.style.display)
      }   

    

      filtrarTarjetas(event){
        if (event.target.value.length !== 0) {

          var text = event.target.value

          let personas = this.state.usuario
          let filtrado = personas.filter((item) =>{
              let nombre = item.name.nombre.toUpperCase()
              let apellido = item.name.apellido.toUpperCase()
              let edad = item.dob.edad.toString()
              let datos = text.toUpperCase()
              console.log(edad);
          return (
              nombre.includes(datos) || apellido.includes(datos) || edad.includes(datos)
                
              )
          })  
          this.setState({
              usuario: filtrado,
              textoInput: text,
          })
        }  else this.setState({
          usuario:this.state.usuarioinicial
        })  }
        

  render(){
        const {error, isLoaded, items} = this.state;
     if (error) {
        return <div> Error: {error.message}</div>
     } else {
         return(
           
            <div>
            <label>Filtrar</label>
              <input className="inputData" value={this.state.text} onChange={(text) => this.filtrarTarjetas(text)}/>
              <button onClick={(text) => this.filtrarTarjetas}> Filtrar</button>
      
            {this.state.usuario.map((item, uuid)  => {
              return (
                <Tarjeta 
                  nombre={item.name.first}
                  edad={item.dob.age}
                  apellido={item.name.last}/>)
                }
                )
            }
         </div>
         
        );
     }
    }
}
      
  export default Filtrador;