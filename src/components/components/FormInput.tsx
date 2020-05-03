import React, { Component } from "react"

interface FormInputProps {
    type: string;
    id: string | undefined;
    labelId: string | undefined;
    value: string | undefined;
    className: string | undefined;
    style: object | undefined;
    labelStyle: object | undefined;
    up: boolean | undefined;
    required: boolean | undefined;
    disabled: boolean | undefined;
}

export default class FormInput extends Component<FormInputProps> {
    public static defaultProps = {
        type: "text",
        id: undefined,
        labelId: undefined,
        value: undefined,
        className: undefined,
        style: undefined,
        labelStyle: undefined,
        up: undefined,
        required: undefined,
        disabled: undefined
    };

    public render(): JSX.Element {
        return (
            <div>
                <input
                    type={this.props.type}
                    id={this.props.id}
                    className={this.props.className}
                    style={this.props.style}
                    required={this.props.required}
                    disabled={this.props.disabled}
                />
                <label
                    htmlFor={this.props.id}
                    id={this.props.labelId}
                    className={"placeholder" + (this.props.up ? "_up" : "")}
                    style={this.props.up ?
                        this.props.labelStyle : this.props.style}
                >{this.props.value}</label>
            </div>
        );
    }
}