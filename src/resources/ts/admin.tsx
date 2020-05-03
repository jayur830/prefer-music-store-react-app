import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import { playlistToString } from "./playlist";
import user from "./user";

import MainPage from "../../components/forms/MainPage";
import Playlist from "../../types/Playlist";

export default (component: MainPage): void => {
    $(document).attr("title", component.state.username + " 관리자님 환영합니다.");
    
    $.get("/is_started", { username: component.state.username })
        .done((started: boolean): void => component.props.onExecute(!started))
        .fail((e: JQuery.jqXHR<any>): void => {
            console.log(e);
            alert("Failed to connect to server.");
        });
    
    $("#exec").on("click", (): void => {
        $("#exec").attr("disabled", "disabled");
        $.get("/exec", { username: component.state.username })
            .done((data: {
                serverStarted: boolean,
                playlist: Playlist[]
            }): void => {
                alert(`서버가 ${data.serverStarted ? "실행": "중지"}되었습니다.`);
                component.props.onExecute(component.props.exec);
                component.props.onSetPlaylist(data.serverStarted ? playlistToString(null, data.playlist) : null);
                $("#exec").attr("disabled", "undefined");
            }).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    });

    $("#logout").on("click", (): void => {
        if (window.confirm("로그아웃 하시겠습니까?"))
            user.logout((): void => {
                alert("로그아웃 되었습니다. 안녕히 가세요.");
                component.props.onLogout();
                component.setState({ redirect: <Redirect to="/login"></Redirect> });
            });
    });

    $(document).ready((): void => {
        $.get("/admin_playlist_action", { username: component.state.username })
            .done((playlist: Playlist[]): void => {
                if (playlist !== null)
                    component.props.onSetPlaylist(playlistToString(null, playlist));
            }).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    });

    $("#search").on("keyup", (): void => {
        const keyword = $("#search").val();
        if (keyword === "")
            $.get("/admin_playlist_action", { username: component.state.username })
                .done((playlist: Playlist[]): void => {
                    if (playlist !== null)
                        component.props.onSetPlaylist(playlistToString(null, playlist));
                }).fail((e: JQuery.jqXHR<any>): void => {
                    console.log(e);
                    alert("Failed to connect to server.");
                });
        else $.get("search_action", {
                username: null,
                keyword: keyword
            }).done((playlist: Playlist[]): void => {
                if (playlist !== null)
                    component.props.onSetPlaylist(playlistToString(null, playlist));
            }).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    });
};