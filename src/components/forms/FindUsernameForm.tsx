import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/Inputs.css";

import findUsernameFormDidMount from "../../resources/ts/find_username";

import FormInput from "../components/FormInput";

import LightButton from "../components/LightButton";

interface Props {
    redirect: Redirect | null;
    onFindUsername: (username: string) => void;
}

interface State {
    redirect: Redirect | null;
}

export default class FindUsernameForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			redirect: null
		};
    }
    
    public static defaultProps = {
        redirect: null
    };

	public componentDidMount(): void {
		findUsernameFormDidMount(this);
	}

	public render(): JSX.Element {
		console.log("FindUsernameForm");
        return (
			<table id="child_form">
				{this.props.redirect === null ? null : <Redirect to={this.props.redirect}></Redirect>}
				<tbody>
					<tr>
						<td colSpan={2} style={{ padding: "3px" }}>
							<FormInput
								type="text"
								id="name"
								value="이름"
								className="input-text"
								style={{ fontSize: "14pt" }}
								required />
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ padding: "3px" }}>
							<FormInput
								type="date"
								id="birth"
								value="생년월일"
								className="input-date"
								style={{ fontSize: "14pt" }}
								labelStyle={{ transform: "translateY(-270%)" }}
								up required />
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ padding: "3px" }}>
							<FormInput
								type="email"
								id="email"
								value="이메일"
								className="input-email"
								style={{ fontSize: "14pt" }}
								required />
						</td>
					</tr>
				</tbody>
				<tfoot>
					<tr style={{ textAlign: "center" }}>
						<td style={{ padding: "3px" }}>
							<LightButton
								id="find_username"
								value="아이디 찾기"
								style={{
									fontSize: "14pt",
									padding: "8px 20px"
								}} />
						</td>
						<td style={{ padding: "3px" }}>
							<Link to="/login">
								<LightButton
									id="cancel"
									value="돌아가기"
									style={{
										fontSize: "14pt",
										padding: "8px 20px"
									}} />
							</Link>
						</td>
					</tr>
				</tfoot>
			</table>
        );
    }
}