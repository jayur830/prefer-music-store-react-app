import React, { Component } from "react";

interface DarkButtonProps {
    id: string | undefined;
    value: string | undefined;
    className: string | undefined;
    style: object | undefined;
    disabled: boolean | undefined;
    onClick: (() => void) | undefined;
}

export default class DarkButton extends Component<DarkButtonProps> {
    public static defaultProps = {
        id: undefined,
        value: undefined,
        className: undefined,
        style: undefined,
        disabled: false,
        onClick: undefined
    };

    public render(): JSX.Element {
        return (
            <input type="button" id={this.props.id}
                defaultValue={this.props.value}
                className={"btn_dark_light " + (this.props.className === undefined ? null : this.props.className)}
                style={this.props.style}
                disabled={this.props.disabled}
                onClick={this.props.onClick} />
        );
    }
}