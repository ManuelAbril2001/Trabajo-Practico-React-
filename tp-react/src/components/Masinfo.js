import React from 'react';
import {Component} from 'react';

class Masinfo extends Component{
    constructor(props) {
        super(props);
        this.state = {
          display: this.props.display,
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

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <React.Fragment>
        <ul>
          {items.map(item => (
            <div className="masInfo" key={item.login.uuid}>
                    <div>Calle y número:{item.location.street.number} </div>
                    <div>Ciudad: {item.location.city} </div>
                    <div>País: {item.location.country}</div>
                    <div>Código postal: {item.location.postcode}</div>
                    <div>Fecha de registro: {item.registered.date.substring(0,10)}</div>
                    <div>Teléfono: {item.phone}</div>
                </div>
          ))}
        </ul>
        </React.Fragment>
      )
    }
  }
}

export default Masinfo;