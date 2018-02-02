import React, {Component} from 'react';

/** ********** CONTROL PANEL ********** **/

function NumberInput(props) {
    return (
        <div className='inp-container-num'>
            <label className='inp-label-num'>
                <input type='number' name={props.name} placeholder={props.placeholder}
                       step={props.step} min='0' />
            </label>
        </div>
    )
}

function CheckboxInput(props) {
    return (
        <div className='inp-container-chk'>
            <input type='checkbox' name={props.name} id={`inp-chk-${props.name}`} value={props.name} />
            <label for={`inp-chk-${props.name}`} className='inp-label-chk' >
                {props.label}
            </label>
        </div>
    )
}

function ControlBox(props) {
    return (
        <div className='cb-container'>
            {props.children}
        </div>
    )
}

/** ********** RESULTS BOXES ********** **/

function ResultsBox(props) {
    return (
        <div className='rb-container'>

        </div>
    )
}

/** ********** WATERFALL SECTIONS ********** **/

function WSection(props) {
    return (
        <div className='ws-container' style={props.style}>
            <div className='ws-rect'>
                <div className='ws-divider'>
                    {props.ws_d_text}
                </div>
                <div className='ws-text'>
                    {props.ws_text}
                </div>
            </div>
        </div>
    )
}

function VisualBox(props) {
    return (
        <div className='vb-container'>
            {props.children}
        </div>
    )
}

/** ********** TOP COMPONENT ********** **/

class Waterfall extends Component {
    constructor(props) {
        super(props);
        this.updateWSHeight = this.updateWSHeight.bind(this);
        
        this.state = {
            h_air: 0,  // Air rectangle (height)
            h_fin: 0,  // Final rectangle (height)
            h_ctu: 0,  // Catch-up rectangle (height)
            h_irr: 0,  // Hurdle rate rectangle (height)
            h_roc: 0,  // Return of capital rectangle (height)

            c_fin: '',  // Final rectangle (color)
            c_ctu: '',  // Catch-up rectangle (color)
            c_irr: '',  // Hurdle rate rectangle (color)
            c_roc: '',  // Return of capital rectangle (color)

            t_fin: '',  // Final rectangle (text)
            t_ctu: '',  // Catch-up rectangle (text)
            t_irr: '',  // Hurdle rate rectangle (text)
            t_roc: '',  // Return of capital rectangle (text)
        }
    }

    updateWSHeight() {

    }

    render() {
        return (
            <div>
                <ControlBox>
                    <NumberInput name='com' placeholder="Enter investors' invested capital in the fund"
                                 step='500000' />
                    <NumberInput name='nav' placeholder="Enter the fund's net assets value"
                                 step='500000' />
                    <NumberInput name='irr' placeholder="Enter waterfall hurdle rate"
                                 step='.01' />
                    <CheckboxInput name='ctu' label='Is there a catch-up stage?' />
                    <NumberInput name='fin' placeholder="Enter investors' share of profit"
                                 step='.01' />
                </ControlBox>

                <VisualBox>
                    <WSection name='air' style={{height: this.state.h_air}}
                              ws_d_text='' ws_text='' />
                    <WSection name='fin' style={{height: this.state.h_fin, backgroundColor: this.state.c_fin}}
                              ws_d_text='' ws_text={this.state.t_fin} />
                    <WSection name='ctu' style={{height: this.state.h_ctu, backgroundColor: this.state.c_ctu}}
                              ws_d_text='' ws_text={this.state.t_ctu} />
                    <WSection name='irr' style={{height: this.state.h_irr, backgroundColor: this.state.c_irr}}
                              ws_d_text='' ws_text={this.state.t_irr} />
                    <WSection name='roc' style={{height: this.state.h_roc, backgroundColor: this.state.c_roc}}
                              ws_d_text='' ws_text={this.state.t_roc} />
                </VisualBox>

                <ResultsBox>

                </ResultsBox>
            </div>
        )
    }
}

export default Waterfall