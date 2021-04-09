import React, { Component } from 'react';


class Info extends Component {
    
    masInfo = (color) => {
         console.log("mas info");
         alert (
             'toma tu info'
         );
    }

    render(){
    return(    
    <React.Fragment>
        <div className="info">
            <img src="images/img.jpg" className="imagen"/>
            <h1> Informacion de {this.props.name} {this.props.nombre} </h1>
            <h2 className="subtitulo"> Email: {this.props.email} </h2>
            <h2> Fecha de nacimiento: {this.props.nacimiento} </h2>
            <h3 onClick={() => this.masInfo()}> Mas informacion, click aqui</h3>
        </div>

    </React.Fragment> 
     )
     }  
}

export default Info;