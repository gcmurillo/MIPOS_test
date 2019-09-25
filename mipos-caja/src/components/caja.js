import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getOpen, changeData, requestCajaData, postCajaOpen } from '../actions/cajaActions';
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
        const data_post = {
            date_open: this.props.data.date_open,
            hour_open: this.props.data.hour_open,
            value_previous_close: this.props.data.value_previous_close,
            value_open: this.props.data.value_open * 100,
            observation: this.props.data.observation
        }
        this.props.submitOpenCaja(data_post);
        event.preventDefault();
    }
    
    handleClick = () => {
        this.props.requestOpenCaja();
    }

    valid_open_value = () => {
        return this.props.data.value_open <= 0
    }
    
    formApertura () {

        let submitButton
        if (!this.props.aperture_block) {
            submitButton = (
                <Button type="submit" waves="light" disabled={this.valid_open_value()}>
                    Enviar
                    <Icon right>
                    send
                    </Icon>
                </Button>
            )
        }
        return (
            <div className="row left">
                <h3>Apertura</h3>
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
                            <TextInput label="Total Anterior" disabled value={this.props.data.value_previous_close ? String(this.props.data.value_previous_close / 100) : null} type="number">
                            </TextInput>
                        </div>
                        <div className="input-field col s6">
                            <TextInput label="Total inicial" value={this.props.data.value_open ? String(this.props.data.value_open) : null}
                            onChange={this.handleChange} name="value_open" type="number" step='0.01' disabled={this.props.aperture_block} min='0.01'
                            ></TextInput>
                        </div>
                    </div>
                    <div className="row">
                        <Textarea label="Observaciones" value={this.props.data.observation} name="observation" onChange={this.handleChange} 
                        disabled={this.props.aperture_block}/>
                    </div>
                    {submitButton}
                </form>
            </div>
        );
    }
    

    render() {
        
        let get_error;
        if (this.props.get_open_error) {
            get_error = <h4>Error al consultar API</h4>
        }
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
                    {get_error}                    
                </div>
            );
        } 
        return (
            <div>
                {this.formApertura()}
                <p>Aca el otro</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        aperture_block: state.aperture_block,
        close_block: state.close_block,
        getting_open: state.getting_open,
        get_open_error: state.get_open_error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOpenCaja: () => { dispatch(getOpen())},
        submitOpenCaja: (data) => { dispatch(postCajaOpen(data))},
        changeData: (key, value, type_input) => { dispatch(changeData(key,value,type_input))},
        requestOpenCaja: () => { dispatch(requestCajaData())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Caja);