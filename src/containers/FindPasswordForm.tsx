import { connect } from "react-redux";

import FindPasswordForm from "../components/forms/FindPasswordForm";

export default connect(null, dispatch => ({
    onFindPassword: (email: string): void => { dispatch({ type: "find_password", email, valid: true }); }
}))(FindPasswordForm as any);