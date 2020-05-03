import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "../../resources/css/CenterForm.css";
import "../../resources/css/UserInfoForm.css";
import "../../resources/css/Inputs.css";

import userInfoFormDidMount from "../../resources/ts/user_info";

import FormInput from "../components/FormInput";
import Gender from "../components/Gender";

import LightButton from "../components/LightButton";
import DarkButton from "../components/DarkButton";
import User from "../../types/User";

interface Props {
    user: User;
    username: string | null;
    auth: boolean | undefined;
    onLogin: (username: string | null) => void;
}

interface State {
    redirect: JSX.Element | null;
}

export default class UserInfoForm extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.props.onLogin(this.props.username);
		this.state = {
			redirect: null
		};
	}

	public componentDidMount(): void {
		if (this.props.auth) userInfoFormDidMount(this);
	}

    public render(): JSX.Element {
        return (
            <div>
				{this.props.auth ? null : <Redirect to="/main"></Redirect>}
				<div id="div_delete_user">
					<Link to="/delete_user_auth">
						<DarkButton
							id="delete_user"
							value="회원탈퇴"
							style={{
								fontSize: "10pt",
								padding: "5px 20px"
							}} />
					</Link>
                </div>
				<table id="child_form" className="edit-form">
					<tbody>
						<tr>
							<td id="row_0">
								<FormInput
									type="text"
									id="username"
									value="아이디"
									className="input-text"
									labelStyle={{ fontSize: "14pt" }}
									up disabled />
							</td>
						</tr>
						<tr>
							<td>
								<FormInput
									type="password"
									id="password"
									labelId="label_password"
									value="비밀번호"
									className="input-password"
									labelStyle={{ fontSize: "14pt" }}
									up required disabled />
							</td>
							<td>
								<DarkButton
									id="change_password"
									value="비밀번호 변경"
									style={{ padding: "5px 20px" }} />
							</td>
						</tr>
						<tr id="password_confirm_toggle">
							<td id="row_1">
								<FormInput
									type="password"
									id="password_confirm"
									value="비밀번호 확인"
									className="input-password"
									style={{ fontSize: "14pt" }}
									required />
							</td>
						</tr>
						<tr>
							<td id="row_2">
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
							<td id="row_3">
								<FormInput
									type="date"
									id="birth"
									value="생년월일"
									className="input-date"
									style={{
										fontSize: "14pt",
										height: "25px"
									}}
									labelStyle={{
										fontSize: "14pt",
										height: "25px"
									}}
									up required />
							</td>
						</tr>
						<tr>
							<td id="row_4">
								<FormInput
									type="email"
									id="email"
									value="이메일"
									className="input-email"
									style={{ fontSize: "14pt" }}
									required />
							</td>
						</tr>
						<tr>
							<td id="row_5">
								<Gender
									spanStyle={{
										float: "left",
										textAlign: "center",
										padding: "18px 0",
										width: "50%"
									}}
									labelStyle={{ cursor: "pointer" }}></Gender>
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr style={{ textAlign: "center" }}>
							<td id="row_6">
								{this.state.redirect}
								<input
									type="button"
									id="edit"
									value="수정"
									className="btn_disabled"
									style={{
										marginRight: "10px",
										padding: "5px 20px"
									}}
									disabled />
								<Link to="/main">
									<LightButton
										id="cancel"
										value="돌아가기"
										style={{
											marginLeft: "10px",
											padding: "5px 20px"
										}} />
								</Link>
							</td>
						</tr>
					</tfoot>
				</table>
            </div>
        );
    }
}