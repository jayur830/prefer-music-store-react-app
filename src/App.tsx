import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./resources/css/Bootstrap.css";
import "./resources/css/Font.css";
import "./resources/css/Buttons.css";
import "./resources/css/FontAwesome.css";

import Index from "./components/forms/Index";
import SignUpForm from "./components/forms/SignUpForm";
import LoginForm from "./containers/LoginForm";
import FindUsernameForm from "./containers/FindUsernameForm";
import FindUsernameResultForm from "./containers/FindUsernameResultForm";
import FindPasswordForm from "./containers/FindPasswordForm";
import FindPasswordResultForm from "./containers/FindPasswordResultForm";
import MainPage from "./containers/MainPage";
import UserInfoForm from "./containers/UserInfoForm";
import DeleteUserAuthForm from "./containers/DeleteUserAuthForm";

export default class App extends Component {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/sign_up" component={SignUpForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/find_username" component={FindUsernameForm} />
          <Route path="/find_username_result" component={FindUsernameResultForm} />
          <Route path="/find_password" component={FindPasswordForm} />
          <Route path="/find_password_result" component={FindPasswordResultForm} />
          <Route path="/main" component={MainPage} />
          <Route path="/user_info" component={UserInfoForm} />
          <Route path="/delete_user_auth" component={DeleteUserAuthForm} />
        </Switch>
      </BrowserRouter>
    );
  }
}