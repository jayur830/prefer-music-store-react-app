import React, { Component } from "react"

import "../../resources/css/Inputs.css";

interface GenderProps {
    spanStyle: object;
    labelStyle: object;
}

export default class Gender extends Component<GenderProps> {
    public render(): JSX.Element {
        return (
            <div>
                <span id="span_male" style={this.props.spanStyle}>
                    <input
                        type="radio"
                        id="gender_male"
                        name="gender"
                        value="1"
                        className="input-radio" />
                    <label
                        id="label_male"
                        htmlFor="gender_male"
                        className="fal fa-male fa-3x"
                        style={this.props.labelStyle}></label>
                </span>
                <span id="span_female" style={this.props.spanStyle}>
                    <input
                        type="radio"
                        id="gender_female"
                        name="gender"
                        value="0"
                        className="input-radio" />
                    <label
                        id="label_female"
                        htmlFor="gender_female"
                        className="fal fa-female fa-3x"
                        style={this.props.labelStyle}></label>
                </span>
            </div>
        );
    }
}