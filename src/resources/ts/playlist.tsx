import React from "react";

import $ from "jquery";

import audio from "./audio_setup";
import Playlist from "../../types/Playlist";

export const playlistToString = (userId: string | null, playlist: Playlist[]): JSX.Element => {
    let html: JSX.Element[] = [];
    for (let i: number = 0; i < playlist.length; ++i) {
        const songId: string = playlist[i].song_id,
            artist: string = playlist[i].artist,
            songName: string = playlist[i].song_name,
            rating: number = playlist[i].rating;
        html.push(
            <tr key={i} className="element">
                <td className="element play_btn">
                    <div id={"b" + songId} className="fas fa-play fa-2x"
                        style={{ cursor: "pointer" }}
                        onClick={(): void => audio.play(songId)}>
                        <audio id={"m" + songId}>
                            <source src={"/resources/audio/" + songId + ".mp3"} />
                        </audio>
                    </div>
                </td>
                <td className="element song_desc">
                    <div className="text_over"
                        style={{
                            fontSize: "100%",
                            fontWeight: "bold"
                        }}
                    >{songName}</div>
                    <div className="text_over" style={{ fontSize: "70%" }}>{artist}</div>
                </td>
                {userId === null ? null : 
                    <td id={"r" + songId} className="element range">
                        {((): JSX.Element[] => {
                            let list: JSX.Element[] = [];
                            for (let j: number = 0; j < 5; ++j)
                                list.push(
                                    <span key={j} className={"fa" + (rating === 0 ? "l" : (j < rating ? "s" : "l")) + " fa-star fa-2x rating"}
                                        onClick={(): void => playlistUpdate(userId, songId, j + 1)}></span>
                                );
                            return list;
                        })()}
                    </td>}
            </tr>
        );
    }
    return <tbody>{html}</tbody>;
};

export const playlistUpdate = (userId: string, itemId: string, rating: number): void => {
    if (window.confirm("평점을 반영하시겠습니까?"))
        $.get("/rating_action", {
            user_id: userId,
            item_id: itemId,
            rating: rating
        }).done((): void => {
            let star: JQuery<Element> = $("#r" + itemId).find(".fa-star");
            star.removeClass("fas");
            star.addClass("fal");
            for (let i: number = 0; i < rating; ++i)
                star.eq(i).addClass("fas");
            alert("평점이 반영되었습니다.");
        }).fail((e: JQuery.jqXHR<any>): void => {
            console.log(e);
            alert("Failed to connect to server.");
        });
};