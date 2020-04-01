import React from "react";
import "../stylesheets/SongTracker.scss";
import ItemBlock from "./ItemBlock";

export interface Songs {
    zelda: boolean;
    epona: boolean;
    saria: boolean;
    sun: boolean;
    time: boolean;
    storm: boolean;
    minuet: boolean;
    bolero: boolean;
    serenade: boolean;
    nocturne: boolean;
    requiem: boolean;
    prelude: boolean;
}

function SongTracker(songs: Songs): React.ReactElement {
    const emptySlot = <ItemBlock itemName="empty" />;

    return (
        <div className="song-tracker">
            { songs.zelda ? <ItemBlock itemName="song-zelda" /> : emptySlot }
            { songs.epona ? <ItemBlock itemName="song-epona" /> : emptySlot }
            { songs.saria ? <ItemBlock itemName="song-saria" /> : emptySlot }
            { songs.sun ? <ItemBlock itemName="song-sun" /> : emptySlot }
            { songs.time ? <ItemBlock itemName="song-time" /> : emptySlot }
            { songs.storm ? <ItemBlock itemName="song-storm" /> : emptySlot }
            { songs.minuet ? <ItemBlock itemName="song-min" /> : emptySlot }
            { songs.bolero ? <ItemBlock itemName="song-bol" /> : emptySlot }
            { songs.serenade ? <ItemBlock itemName="song-ser" /> : emptySlot }
            { songs.nocturne ? <ItemBlock itemName="song-noc" /> : emptySlot }
            { songs.requiem ? <ItemBlock itemName="song-req" /> : emptySlot }
            { songs.prelude ? <ItemBlock itemName="song-pre" /> : emptySlot }
        </div>
    );
}

export default SongTracker;
