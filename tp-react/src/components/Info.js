import React from 'react';

function Info (props){
    return(         
        <div className="info">
            <h1 > Informacion de {props.apellido} {props.nombre} </h1>
             <h2 className="subtitulo"> Email: {props.email} </h2>
             <h2> Fecha de nacimiento: {props.nacimiento} </h2>
        </div>
           
       
    )
}

export default Info;