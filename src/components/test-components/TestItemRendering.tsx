import React from "react";
import ItemBlock from "../ItemBlock";

export default function TestItemRendering(): React.ReactElement {
    return(
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <ItemBlock itemName="stick" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="nut" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="bomb" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="bow" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="fire-arrow"/>
            <ItemBlock itemName="din"/>

            <ItemBlock itemName="slingshot" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="ocarina-fairy"/>
            <ItemBlock itemName="ocarina-time"/>
            <ItemBlock itemName="bombchu" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="hookshot"/>
            <ItemBlock itemName="longshot"/>
            <ItemBlock itemName="ice-arrow"/>
            <ItemBlock itemName="farore"/>

            <ItemBlock itemName="boomerang"/>
            <ItemBlock itemName="lens"/>
            <ItemBlock itemName="bean" count={{current: 0, max: 10}}/>
            <ItemBlock itemName="hammer"/>
            <ItemBlock itemName="light-arrow"/>
            <ItemBlock itemName="nayru"/>

            <ItemBlock itemName="bottle-empty"/>
            <ItemBlock itemName="bottle-letter"/>
            <ItemBlock itemName="bottle-red"/>
            <ItemBlock itemName="bottle-blue"/>
            <ItemBlock itemName="bottle-green"/>
            <ItemBlock itemName="bottle-fairy"/>
            <ItemBlock itemName="bottle-fish"/>
            <ItemBlock itemName="bottle-bugs"/>
            <ItemBlock itemName="bottle-milk"/>
            <ItemBlock itemName="bottle-milk-half"/>
            <ItemBlock itemName="bottle-poe"/>
            <ItemBlock itemName="bottle-big-poe"/>
            <ItemBlock itemName="bottle-fire"/>

            <ItemBlock itemName="pocket-egg"/>
            <ItemBlock itemName="pocket-cucco"/>
            <ItemBlock itemName="cojiro"/>
            <ItemBlock itemName="mushroom"/>
            <ItemBlock itemName="medicine"/>
            <ItemBlock itemName="saw"/>
            <ItemBlock itemName="broken-sword"/>
            <ItemBlock itemName="prescription"/>
            <ItemBlock itemName="frog"/>
            <ItemBlock itemName="eye-drops"/>
            <ItemBlock itemName="claim"/>

            <ItemBlock itemName="weird-egg"/>
            <ItemBlock itemName="cucco"/>
            <ItemBlock itemName="letter"/>
            <ItemBlock itemName="sold-out"/>
            <ItemBlock itemName="mask-keaton"/>
            <ItemBlock itemName="mask-skull"/>
            <ItemBlock itemName="mask-spooky"/>
            <ItemBlock itemName="mask-bunny"/>
            <ItemBlock itemName="mask-truth"/>

            <ItemBlock itemName="lift-1"/>
            <ItemBlock itemName="lift-2"/>
            <ItemBlock itemName="lift-3"/>
            <ItemBlock itemName="scale-1"/>
            <ItemBlock itemName="scale-2"/>
            <ItemBlock itemName="wallet-1"/>
            <ItemBlock itemName="wallet-2"/>
            <ItemBlock itemName="wallet-3"/>
            <ItemBlock itemName="wallet-4"/>
            <ItemBlock itemName="magic-1"/>
            <ItemBlock itemName="magic-2"/>

            <ItemBlock itemName="gerudo-card"/>
            <ItemBlock itemName="stone"/>
            <ItemBlock itemName="skulltula-token"/>
            <ItemBlock itemName="triforce"/>

            <ItemBlock itemName="kokiri-sword"/>
            <ItemBlock itemName="master-sword"/>
            <ItemBlock itemName="big-sword"/>
            <ItemBlock itemName="deku-shield"/>
            <ItemBlock itemName="hylian-shield"/>
            <ItemBlock itemName="mirror-shield"/>
            <ItemBlock itemName="iron-boots"/>
            <ItemBlock itemName="hover-boots"/>
            <ItemBlock itemName="goron-tunic"/>
            <ItemBlock itemName="zora-tunic"/>

            <ItemBlock itemName="song-zelda"/>
            <ItemBlock itemName="song-epona"/>
            <ItemBlock itemName="song-saria"/>
            <ItemBlock itemName="song-sun"/>
            <ItemBlock itemName="song-time"/>
            <ItemBlock itemName="song-storm"/>
            <ItemBlock itemName="song-min"/>
            <ItemBlock itemName="song-bol"/>
            <ItemBlock itemName="song-ser"/>
            <ItemBlock itemName="song-req"/>
            <ItemBlock itemName="song-noc"/>
            <ItemBlock itemName="song-pre"/>

            <ItemBlock itemName="emerald"/>
            <ItemBlock itemName="ruby"/>
            <ItemBlock itemName="sapphire"/>
            <ItemBlock itemName="light-medallion"/>
            <ItemBlock itemName="forest-medallion"/>
            <ItemBlock itemName="fire-medallion"/>
            <ItemBlock itemName="water-medallion"/>
            <ItemBlock itemName="shadow-medallion"/>
            <ItemBlock itemName="spirit-medallion"/>
        </div>
    );
}
