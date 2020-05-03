import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/Inputs.css";

import findPasswordFormDidMount from "../../resources/ts/find_password";

import FormInput from "../components/FormInput";
import LightButton from "../components/LightButton";

interface Props {
    onFindPassword: (email: string | null) => void;
}

interface State {
    redirect: JSX.Element | null;
}

export default class FindPasswordForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			redirect: null
		};
	}

	public componentDidMount(): void {
		findPasswordFormDidMount(this);
	}

	public render(): JSX.Element {
		console.log("FindPasswordForm");
        return (
			<table id="child_form">
				{this.state.redirect}
				<tbody>
					<tr>
						<td colSpan={2} style={{ padding: "10px 10px" }}>
							<FormInput
								type="text"
								id="username"
								value="아이디"
								className="input-text"
								style={{ fontSize: "14pt" }}
								required />
						</td>
					</tr>
					<tr>
						<td colSpan={2} style={{ padding: "10px 10px" }}>
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
						<td style={{ padding: "10px 10px" }}>
							<LightButton
								id="find_password"
								value="비밀번호 찾기"
								style={{
									fontSize: "14pt",
									padding: "8px 20px"
								}} />
						</td>
						<td style={{ padding: "10px 10px" }}>
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