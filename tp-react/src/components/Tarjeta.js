import React from 'react';
//import Info from './Info';
import {Component} from 'react';

class Tarjeta extends Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        fetch("https://randomuser.me/api/?inc=name,login,email,picture,dob&results=10")
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <div className="info" key={item.login.uuid}>
              Nombre y apellido: {item.name.first} {item.name.last} <br></br>
              <img src={item.picture.medium} className="imagen"/>
              <div> Email: {item.email} </div>
              <div> Fecha de nacimiento: {item.dob.date} ({item.dob.age}) </div>
            </div>
          ))}
        </ul>
      );
    }
  }
}


    // render() {return( 
        // <React.Fragment>
         //    <h1 className="titulo"> Tarjetas </h1>
          //  <p> <Info apellido= "Campitelli" nombre="Valentina" email="valentinacampitelli@gmail.com" nacimiento= "14/10/2000 (20)"/> </p>
          //  <p> <Info apellido="Abril" nombre="Manuel" email="" nacimiento= "14/10/2000 (20)"/> </p>
         //   <p> <Info apellido="Capparelli" nombre="Matias" email="" nacimiento= "14/10/2000 (20)"/> </p>
      //  </React.Fragment>
  //  )
  //  }
//}

export default Tarjeta;