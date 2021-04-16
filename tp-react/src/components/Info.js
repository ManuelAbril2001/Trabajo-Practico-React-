import React, { Component } from 'react';


class Info extends Component {
    
    masInfo = (color) => {
         alert('funciona boton')
        //  document.getElementById(infoextra).style.display = "none";
    }

    componentDidMount(){
        fetch("https://randomuser.me/api/?inc=name,login&results=10")
        .then(resource => resource.json())
        .then(data => {
            this.setState({items: data.results});
            console.log(this.state.items);
        })
    }
    

    // render(){
    // return(    
    // <React.Fragment>
    //     <div className="info">
    //         <img src="images/img.jpg" className="imagen"/>
    //         <h1> Informacion de {this.props.nombre}, {this.props.apellido} </h1>
    //         <h2 className="subtitulo"> Email: {this.props.email} </h2>
    //         <h2> Fecha de nacimiento: {this.props.nacimiento} </h2>
    //         <h3 onClick={() => this.masInfo()}> Mas informacion, click aqui</h3>
    //     </div>

    //     <div className="masInfo" id="infoextra"> 
    //         <h2>Calle y numero: </h2>
    //         <h2>Ciudad: </h2>
    //         <h2>Pais: </h2>
    //         <h2>Codigo postal: </h2>
    //         <h2>Fecha de registro: </h2>
    //         <h2>Telefono: </h2>
    //     </div>


    // </React.Fragment> 
    //  )
    //  }  
}

export default Info;