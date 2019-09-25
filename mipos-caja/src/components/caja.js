import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getOpen, changeData, submitOpen, requestCajaData } from '../actions/cajaActions';
import { TextInput, Textarea, Button, Icon } from 'react-materialize'

class Caja extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);        
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.type
        this.props.changeData(name, value, type);
    }
    
    handleSubmit(event) {
        console.log('submit');
        //console.log(this.props);
        this.props.submitOpenCaja();
        console.log(this.props);
        event.preventDefault();
    }
    
    handleClick = () => {
        this.props.requestOpenCaja();
        // this.props.getOpenCaja();
    }
    
    formApertura () {
        return (
            <div className="row left">
                <form onSubmit={this.handleSubmit} className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <TextInput label="Fecha (YYYY/MM/DD)" disabled value={this.props.data.date_open}></TextInput>
                        </div>
                        <div className="input-field col s6">
                            <TextInput label="Hora (hh:mm)" disabled value={this.props.data.hour_open}></TextInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <TextInput label="Total Anterior" disabled value={this.props.data.value_previous_close ? String(this.props.data.value_previous_close) : null} type="number">
                            </TextInput>
                        </div>
                        <div className="input-field col s6">
                            <TextInput label="Total inicial" value={this.props.data.value_open ? String(this.props.data.value_open) : null}
                            onChange={this.handleChange} name="value_open" type="number" step='0.01' disabled={this.props.aperture_block} min='0.01'
                            ></TextInput>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field">
                            <Textarea label="Observaciones" value={this.props.data.observation} name="observation" onChange={this.handleChange} disabled={this.props.aperture_block}/>
                        </div>
                    </div>
                    <Button type="submit" waves="light">
                        Submit
                        <Icon right>
                        send
                        </Icon>
                    </Button>
                </form>
            </div>
        );
    }
    

    render() {
        
        console.log(this.props);
        if (this.props.data === null) {

            if (this.props.getting_open) {
                return (
                    <h2>Getting data...</h2>
                )
            }
            return (
                <div className="container">
                    <h1>Caja mipOS</h1>
                    <button className="btn waves-effect waves-light" onClick={this.handleClick}>Abrir Caja</button>                    
                </div>
            );
        } 
        return this.formApertura();
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        aperture_block: state.aperture_block,
        close_block: state.close_block,
        getting_open: state.getting_open
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOpenCaja: () => { dispatch(getOpen())},
        submitOpenCaja: () => { dispatch(submitOpen())},
        changeData: (key, value, type_input) => { dispatch(changeData(key,value,type_input))},
        requestOpenCaja: () => { dispatch(requestCajaData())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Caja);