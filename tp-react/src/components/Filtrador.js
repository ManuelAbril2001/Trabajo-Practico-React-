import React from 'react';
import {Component} from 'react';


class Filtrador extends Component {
    constructor(props) {
        super(props);
        this.ordenarAscendente = this.ordenarAscendente.bind(this);
        this.ordenarDescendente = this.ordenarDescendente.bind(this);
        this.state={
          error: null,
          isLoaded: false,
          // numero: "",
          // buscado: "",
          // textoInput:"",
          // usuario: [],
          // usuarioinicial:[],
          // items:[],
          nombre: "",
          apellido: "",
          edad:"",
          value: [],
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
      let resultado = this.state.item.filter((item) =>{
        return item.name.first.toLowerCasse().includes(nombre)
      });
      console.log(resultado)
        this.setState({item: resultado});
    }

    filtrarApellido(){
      let apellido = this.state.value.toLowerCase()
      let resultado = this.state.item.filter((item) =>{
        return item.name.first.toLowerCasse().includes(apellido)
      });
      console.log(resultado)
        this.setState({item: resultado});
    }

    filtrarEdad(){
      let edad = this.state.value
      let resultado = this.state.item.filter((item) =>{
        return item.dob.age == edad
      });
      console.log(resultado)
        this.setState({item: resultado});
    }

    ordenarAscendente(){
      this.setState(prevState => {
        this.state.item.sort((a,b) => (a.first - b.first))
      });
    }
  
    ordenarDescendente(){
      this.setState(prevState => {
        this.state.item.sort((a,b) => (b.first - a.first))
      });
    }

      // filtrarTarjetas(event){
      //   if (event.target.value.length !== 0) {

      //     var text = event.target.value

      //     let personas = this.state.usuario
      //     let filtrado = personas.filter((item) =>{
      //         let nombre = item.name.nombre.toUpperCase()
      //         let apellido = item.name.apellido.toUpperCase()
      //         let edad = item.dob.edad.toString()
      //         let datos = text.toUpperCase()
      //         console.log(edad);
      //     return (
      //         nombre.includes(datos) || apellido.includes(datos) || edad.includes(datos)
                
      //         )
      //     })  
      //     this.setState({
      //         usuario: filtrado,
      //         textoInput: text,
      //     })
      //   }  else this.setState({
      //     usuario:this.state.usuarioinicial
      //   })  }
        

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
            <input placeholder="por edad" type="numnber" onChange={(event)=> this.setState({value: event.target.value})}></input>
            <button className="filtrado" onClick={this.filtrarEdad.bind(this)}>Filtrar</button>
            <br></br>
            <button onClick={this.ordenarDescendente.bind(this)}>Ordenar ascendente</button>
            <button onClick={this.ordenarAscendente.bind(this)}>Ordenar descendente</button>
          </div>  

          </React.Fragment>         
        //     <div>
        //     <label>Filtrar</label>
        //       <input className="inputData" value={this.state.text} onChange={(text) => this.filtrarTarjetas(text)}/>
        //       <button onClick={(text) => this.filtrarTarjetas}> Filtrar</button>

        //     {this.state.usuario.map((item, uuid)  => {
        //       return (
        //         <Tarjeta 
        //           nombre={item.name.first}
        //           edad={item.dob.age}
        //           apellido={item.name.last}/>)
        //         }
        //         )
        //     }
        //  </div>
         
        );
     }
    }
}
      
  export default Filtrador;