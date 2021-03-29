import React from 'react';
import Info from './Info';

function Tarjeta (props){
    return( 
        <React.Fragment>
            <h1 className="titulo"> Tarjetas </h1>
            <p> <Info apellido="Campitelli" nombre="Valentina" email="valentinacampitelli@gmail.com" nacimiento= "14/10/2000 (20)"/> </p>
            <p> <Info apellido="Abril" nombre="Manuel" email="" nacimiento= "14/10/2000 (20)"/> </p>
            <p> <Info apellido="Capparelli" nombre="Matias" email="" nacimiento= "14/10/2000 (20)"/> </p>
        </React.Fragment>
    )
}

export default Tarjeta;