import React, { Component } from 'react';

class HeaderItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            stroke: this.props.stroke,
            color: this.props.color,
        }
    }

    // CambiarColor = (nuevoColor) => {
    //     if(this.state.color == this.state.colorOriginal)
    //         this.setState({ color : nuevoColor});
    //     else 
    //         this.setState({ color: this.state.colorOriginal})
    // }

    Enfasis = (nuevoStroke, nuevoColor) => {
        if(this.state.stroke === this.state.strokeOriginal)
            this.setState({ stroke : nuevoStroke,
                            color: nuevoColor})
        else
            this.setState({ stroke : this.state.strokeOriginal,
                            color: this.state.colorOriginal})
    }

    render(){
        return(
            <li className="section">
                <a 
                href=""
                className="section-a"
                style={{
                    color: this.state.color,
                    fontWeight: this.state.stroke,
                }}
                onMouseOver={() => this.Enfasis('900', '#424242')}
                onMouseOut={this.Enfasis}
                >{this.props.seccion}</a>
            </li>
        )
    }
}

export default HeaderItem;