import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import FindUsernameForm from "../components/forms/FindUsernameForm";
import StoreState from "../types/StoreState";

export default connect((state: StoreState) => ({
    redirect: state.redirect
}), dispatch => ({
    onFindUsername: (username: string): void => { dispatch({ type: "find_username", username, valid: true }); }
}))(FindUsernameForm as any);