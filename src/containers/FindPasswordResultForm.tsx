import { connect } from "react-redux";

import FindPasswordResultForm from "../components/forms/FindPasswordResultForm";
import StoreState from "../types/StoreState";

export default connect((state: StoreState) => ({
    email: state.findPasswordResult.result,
    valid: state.findPasswordResult.valid
}), dispatch => ({
    onRemoveFindedPassword: (): void => { dispatch({ type: "remove_finded_password" }); }
}))(FindPasswordResultForm);