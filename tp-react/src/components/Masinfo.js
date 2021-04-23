import React from 'react';
import {Component} from 'react';

class Masinfo extends Component{
    constructor() {
        super()
        this.title = React.createRef()
        this.desplegarInfo = this.desplegarInfo.bind(this)
        this.state = {
          error: null,
          isLoaded: false,
          items: []
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
    console.log(this.title)
    if(this.title.current.style.display === "none"){
        this.title.current.style.display = "block";
    } else{
        this.title.current.style.display = "none";
    }
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
          <div>
            <button className="detalles" onClick={this.desplegarInfo}> Ver más detalles </button>
              {items.map(item => (
                <div id="detalle" className="detalle" ref={this.title} style={{display:'none'}}>
                      <div><span className="cosas2">Calle y número:</span>{item.location.street.number}</div>
                      <div><span className="cosas2">Ciudad:</span> {item.location.city}</div>
                      <div><span className="cosas2">País:</span> {item.location.country}</div>
                      <div><span className="cosas2">Código postal:</span>{item.location.postcode}</div>
                      <div><span className="cosas2">Fecha de registro:</span>{item.registered.date.substring(0,10)}</div>
                      <div><span className="cosas2">Teléfono:</span>{item.phone}</div>
            </div>
          ))}
       </div>
        </React.Fragment>
      )
    }
  }
}

export default Masinfo;