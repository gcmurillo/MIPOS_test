import React, { Component } from 'react';
import './input.css';

class Aperture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date_open: '',
            hour_open: '',
            value_previous_close: 0,
            value_open: 0,
            observation: '',
            disabled: false
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name);
        this.setState({
            [name]: value
        });
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state);
        event.preventDefault();
    }
    
    render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <div class="field-row">
                <div class="field-container">
                    <label>
                    Fecha (YYYY/MM/DD):
                    <input name="date_open" value={this.state.date_open} onChange={this.handleChange} type="date"/>
                    </label>
                </div>
                <div class="field-container">
                    <label>
                    Hora (hh:mm):
                    <input name="hour_open" value={this.state.hour_open} onChange={this.handleChange}/>
                    </label>
                </div>
              </div>
              <div class="field-row">
                <div class="field-container">
                    <label>
                    Total Anterior:
                    <input name="value_previous_close" value={this.state.value_previous_close} onChange={this.handleChange} />
                    </label>
                </div>
                <div class="field-container">
                    <label>
                    Total Inicial:
                    <input name="value_open" value={this.state.value_open} onChange={this.handleChange}/>
                    </label>
                </div>
              </div>
              <div class="field-row">
                <div class="field-container">
                    <label>
                    Observaciones:
                    <textarea name="observation" value={this.state.observation} onChange={this.handleChange}/>
                    </label>
                </div>
              </div>
            <input type="submit" value="Submit" />
          </form>
        );
    }


}

export default Aperture;