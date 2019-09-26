import React, { Component } from 'react';
import {connect} from 'react-redux';
import { getOpen, changeDataOpen, requestCajaData, postCajaOpen, addGasto, changeGasto, removeGasto, postCajaClose } from '../actions/cajaActions';
import { 
    TextInput, 
    Textarea, 
    Button, 
    Icon, 
    Preloader, 
    Col,
    Row,
    CardPanel,
    Modal
} from 'react-materialize'

class Caja extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitApertura = this.handleSubmitApertura.bind(this);        
        this.handleSubmitClose = this.handleSubmitClose.bind(this);    
        this.handleAddGasto = this.handleAddGasto.bind(this);
        this.handeChangeGasto = this.handeChangeGasto.bind(this);   
        this.handleRemoveGasto = this.handleRemoveGasto.bind(this); 
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        const type = target.type
        this.props.changeDataOpen(name, value, type);
    }
    
    handleSubmitApertura(event) {
        const data_post = {
            date_open: this.props.data_open.date_open,
            hour_open: this.props.data_open.hour_open,
            value_previous_close: this.props.data_open.value_previous_close,
            value_open: this.props.data_open.value_open * 100,
            observation: this.props.data_open.observation
        }
        this.props.submitOpenCaja(data_post);
        event.preventDefault();
    }
    
    handleSubmitClose(event) {
        console.log('data close', this.props.data_close);
        const data_post = {
            date_close: this.props.data_close.date_close,
            hour_close: this.props.data_close.hour_close,
            value_card: +this.props.data_close.card,
            value_cash: +this.props.data_close.close,
            value_close: this.props.data_close.close + this.props.data_close.value - this.props.data_close.sum_gastos,
            value_open: this.props.data_open.value_open * 100,
            value_sales: +this.props.data_close.card + +this.props.data_close.close,
            expenses: this.props.data_close.expenses
        }
        this.props.submitCloseCaja(data_post);
        event.preventDefault();
    }

    handleClick = () => {
        this.props.requestOpenCaja();
    }

    valid_open_value = () => {
        return this.props.data_open.value_open <= 0
    }

    valid_close_value = () => {
        return (this.props.data_close.close + this.props.data_close.value - this.props.data_close.sum_gastos) / 100 < 0
    }

    handleAddGasto = () => {
        this.props.addGasto();
    };
    
    handeChangeGasto = idx => evt => {
        const id =  idx;
        const name = evt.target.name;
        const value =  evt.target.value;
        const type =  evt.target.type;
        this.props.changeGasto(id, name, value, type);
        evt.preventDefault();
    }

    handleRemoveGasto = idx => evt => {
        console.log('click', idx)
        this.props.removeGasto(idx);
    }

    formApertura () {

        let error 
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
        if (this.props.submit_open_error) {
            error = (
                <CardPanel  className="teal">
                    <div className="white-text">
                        Error al enviar informacion
                    </div>
                </CardPanel>
            )
        }
        return (
            <div>
                <h3>Apertura de caja</h3>
                <form onSubmit={this.handleSubmitApertura}>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Fecha (YYYY/MM/DD)" disabled value={this.props.data_open.date_open}></TextInput>
                        </Col>
                        <Col s={6}>
                            <TextInput s={12} label="Hora (hh:mm)" disabled value={this.props.data_open.hour_open}></TextInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Total Anterior" disabled 
                            value={this.props.data_open.value_previous_close ? String(this.props.data_open.value_previous_close / 100) : null} type="number">
                            </TextInput>
                        </Col>
                        <Col s={6}>
                            <TextInput s={12} label="Total inicial" value={this.props.data_open.value_open ? String(this.props.data_open.value_open) : null}
                            onChange={this.handleChange} name="value_open" type="number" step='0.01' disabled={this.props.aperture_block} min='0.01'
                            ></TextInput>
                        </Col>
                    </Row>
                    <Row>
                        <Textarea s={12} label="Observaciones" value={this.props.data_open.observation} name="observation" onChange={this.handleChange} 
                        disabled={this.props.aperture_block}/>
                    </Row>
                    {submitButton}
                </form>
                {error}
            </div>
        );
    }

    formClausura () {
        
        let posting_close;
        let posting_close_err;
        if (this.props.close_block || this.props.data_close === null) {
            return <h3>No hay informacion para mostrar para cierre</h3>
        }

        if (this.props.getting_close) {
            return (
                <Col s={4}>
                    <Preloader flashing />
                </Col>
            )
        }

        if (this.props.posting_close) {
            posting_close = (
                <Col s={4}>
                    Enviando <Preloader flashing />
                </Col>
            )
        }

        if (this.props.posting_close_error) {
            posting_close_err = <h3>Error al enviar!</h3>
        }

        let total_caja = this.props.data_close.close + this.props.data_close.value;
        let val_cierre = (this.props.data_close.close + this.props.data_close.value - this.props.data_close.sum_gastos) / 100;
        return (
            <div>
                <h3>Cierre de caja</h3>
                <form onSubmit={this.handleSubmitClose}>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Fecha (YYYY/MM/DD)" disabled value={this.props.data_close.date_close}></TextInput>
                        </Col>
                        <Col s={6}>
                            <TextInput s={12} label="Hora (hh:mm)" disabled value={this.props.data_close.hour_close}></TextInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Ventas en efectivo" disabled 
                            value={this.props.data_close.close ? String(this.props.data_close.close / 100) : null} type="number">
                            </TextInput>
                        </Col>
                        <Col s={6}>
                            <TextInput s={12} label="Ventas por tarjeta" disabled 
                            value={this.props.data_close.card ? String(this.props.data_close.card / 100) : null} type="number">
                            </TextInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Total Ventas" disabled 
                            value={String((this.props.data_close.close +  this.props.data_close.card)/ 100)} type="number">
                            </TextInput>
                        </Col>
                        <Col s={6}>
                            <TextInput s={12} label="Total Apertura" disabled 
                            value={this.props.data_close.value ? String(this.props.data_close.value / 100) : null} type="number">
                            </TextInput>
                        </Col>
                    </Row>
                    <Row>
                        <Col s={6}>
                            <TextInput s={12} label="Total Caja" disabled 
                            value={String(total_caja / 100)} type="number">
                            </TextInput>
                        </Col>
                    </Row>
                    <Button className="blue" onClick={this.handleAddGasto}>Agregar gasto</Button>
                    <br></br>
                    {this.props.data_close.expenses.map((exp, idx) => (
                        <Row>
                            <TextInput s={5}
                                type="text" name="name"
                                value={exp.name} label="Motivo" onChange={this.handeChangeGasto(idx)}
                            />
                            <TextInput s={5}
                                type="number" step='0.01' min="0.01" name="value"
                                value={exp.value} label="Valor" onChange={this.handeChangeGasto(idx)}
                            />
                            <Button className="red" onClick={this.handleRemoveGasto(idx)}>
                                <Icon>
                                delete
                                </Icon>
                            </Button>
                        </Row>
                    ))}
                    <br></br>
                    <br></br>
                    <Button type="submit" waves="light" disabled={this.valid_close_value()}>
                        Cerrar caja con $ {val_cierre}
                    </Button>
                </form>
                {posting_close}
                {posting_close_err}
            </div>
        )
    }
    

    render() {
        let get_error;
        if (this.props.get_open_error) {
            get_error = <h4>Error al consultar API</h4>
        }
        let close_success;
        if (this.props.posting_close_success) {
            close_success = (
                <h5>
                    Caja cerrada con exito
                </h5>
            )
        }
        if (this.props.data_open === null) {
            if (this.props.getting_open) {
                return (
                    <div>
                        <h2>Getting data...</h2>
                        <Col s={4}>
                            <Preloader flashing />
                        </Col>
                    </div>
                )
            }
            return (
                <div className="container">
                    <h1>Caja mipOS</h1>
                    <button className="btn waves-effect waves-light" onClick={this.handleClick}>Abrir Caja</button>
                    {get_error}
                    {close_success}                    
                </div>
            );
        } 
        return (
            <Row>
                <Col s={6}>
                    {this.formApertura()}
                </Col>
                <Col s={6}>
                    {this.formClausura()}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        data_open: state.data_open,
        data_close: state.data_close,
        aperture_block: state.aperture_block,
        close_block: state.close_block,
        getting_open: state.getting_open,
        get_open_error: state.get_open_error,
        submit_open_error: state.submit_open_error,
        getting_close: state.getting_close,
        posting_close: state.posting_close,
        posting_close_success: state.posting_close_success,
        posting_close_error: state.posting_close_error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitOpenCaja: (data) => { dispatch(postCajaOpen(data))},
        submitCloseCaja: (data) => { dispatch(postCajaClose(data))},
        changeDataOpen: (key, value, type_input) => { dispatch(changeDataOpen(key, value, type_input))},
        changeGasto: (id, name, value, type_input) => { dispatch(changeGasto(id, name, value, type_input))},
        requestOpenCaja: () => { dispatch(requestCajaData())},
        addGasto: () => {dispatch(addGasto())},
        removeGasto: (id) => {dispatch(removeGasto(id))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Caja);