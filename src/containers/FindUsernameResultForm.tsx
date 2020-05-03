import { connect } from "react-redux";

import FindUsernameResultForm from "../components/forms/FindUsernameResultForm";
import StoreState from "../types/StoreState";

export default connect((state: StoreState) => ({
    username: state.findUsernameResult.result,
    valid: state.findUsernameResult.valid
}), dispatch => ({
    onRemoveFindedUsername: (): void => { dispatch({ type: "remove_finded_username" }); }
}))(FindUsernameResultForm);