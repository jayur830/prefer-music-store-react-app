import React from "react";
import { Redirect } from "react-router-dom";

import $ from "jquery";

import user from "./user";
import { playlistToString } from "./playlist";

import MainPage from "../../components/forms/MainPage";
import Playlist from "../../types/Playlist";

export default (component: MainPage): void => {
    $(document).attr("title", 
        component.props.auth.authenticated ? 
            component.state.username + "님 환영합니다." : "메인 페이지");

    const getCurrentStorePlaylist = (func: Function | null): void => {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition((position: Position): void => {
                $.get("/current_playlist_action", {
                    username: component.state.username,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }).done((playlist: Playlist[]): void => {
                    if (playlist !== null) {
                        component.props.onSetPlaylist(playlistToString(component.state.username, playlist));
                        if (func !== null) func();
                    }
                }).fail((e: JQuery.jqXHR<any>): void => {
                    console.log("username:", component.state.username);
                    console.log("Error:", e);
                    alert("Failed to connect to server.");
                });
            });
    };

    const getUserPlaylist = (func: Function | null): void => {
        $.get("/user_playlist_action", { username: component.state.username })
            .done((playlist: Playlist[]): void => {
                if (playlist !== null) {
                    component.props.onSetPlaylist(playlistToString(component.state.username, playlist));
                    if (func !== null) func();
                }
            }).fail((e: JQuery.jqXHR<any>): void => {
                console.log(e);
                alert("Failed to connect to server.");
            });
    };

    $("#logout").on("click", (): void => {
        if (window.confirm("로그아웃 하시겠습니까?"))
            user.logout((): void => {
                alert("로그아웃 되었습니다. 안녕히 가세요.");
                component.props.onLogout();
                component.setState({ redirect: <Redirect to="/login"></Redirect> });
            });
    });

    $(document).ready(getCurrentStorePlaylist);

    let isStore: boolean = $("#view").val() === "매장";

    if (component.props.auth.authenticated)
        $("#view").on("click", (): void => {
            if (isStore) {
                isStore = false;
                getUserPlaylist((): void => component.props.onView(component.props.isStore));
            } else {
                isStore = true;
                getCurrentStorePlaylist((): void => component.props.onView(component.props.isStore));
            }
        });

    $("#search").on("keyup", (): void => {
        const keyword: string = $("#search").val() as string;
        if (keyword === "") {
            if (isStore) getCurrentStorePlaylist(null);
            else getUserPlaylist(null);
        } else $.get("/search_action", {
                username: component.state.username === "" ? 
                    null : component.state.username,
                keyword: keyword
            }).done((playlist: Playlist[]): void => 
                component.props.onSetPlaylist(
                    playlistToString(component.state.username, playlist)))
                .fail((e: JQuery.jqXHR<any>): void => {
                    console.log(e);
                    alert("Failed to connect to server.");
                });
    });
};