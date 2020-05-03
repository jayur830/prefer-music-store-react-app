import $ from "jquery";

class User {
    public checkUsername(username: string, successCallback: any): void {
        $.post("/check_username", { username })
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public signUp(username: string, password: string, 
        name: string, birth: string, email: string, 
        gender: number, age: number, successCallback: any): void {
        $.post("/sign_up_action", {
            username, password, 
            name, birth, email, gender, age
        }).done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
            console.log(e);
            alert("Failed to connect to server.");
        });
    }

    public login(username: string, password: string, successCallback: any): void {
        $.post("/login_action", { username, password })
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public logout(successCallback: any): void {
        $.post("/logout")
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public findUsername(name: string, birth: string, email: string, successCallback: any): void {
        $.post("/find_username_action", { name, birth, email })
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public findPassword(username: string, email: string, successCallback: any): void {
        $.post("/find_password_action", { username, email })
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public getUserInfo(username: string | null): object {
        let userInfo: object = {};
        $.ajax({
            url: "/get_user_info", 
            type: "post", 
            data: { username },
            async: false
        }).done((responseData: object): void => { userInfo = Object.assign({}, responseData); })
            .fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
        return userInfo;
    }

    public editUserInfo(username: string, password: string | null, 
        name: string, birth: string, email: string, gender: number, age: number,
        successCallback: any): void {
        $.post("/edit_user_info", {
            username, password, 
            name, birth, email, gender, age
        }).done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
            console.log(e);
            alert("Failed to connect to server.");
        });
    }

    public isValid(username: string, password: string, successCallback: any): void {
        $.post("/is_valid", { username, password })
            .done(successCallback).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }

    public deleteUser(username: string): void {
        $.post("/delete_user_info", { username })
            .fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    }
}

export default new User();