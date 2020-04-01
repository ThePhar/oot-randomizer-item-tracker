import React from "react";
import "../stylesheets/ObjectiveTracker.scss";
import ItemBlock from "./ItemBlock";

export interface Objectives {
    skulltulaTokens: number;
    triforcePieces: number;

    emerald: boolean;
    ruby: boolean;
    sapphire: boolean;

    lightMedallion: boolean;
    forestMedallion: boolean;
    fireMedallion: boolean;
    waterMedallion: boolean;
    shadowMedallion: boolean;
    spiritMedallion: boolean;
}

function ObjectiveTracker(objectives: Objectives): React.ReactElement {
    const emptySlot = <ItemBlock itemName="empty" />;

    return (
        <div className="objective-tracker">
            <div className="objective-tracker__row">
                <ItemBlock itemName="skulltula-token" count={{ current: objectives.skulltulaTokens, max: 100 }} />
                <ItemBlock itemName="triforce" count={{ current: objectives.triforcePieces, max: 99999 }} />
            </div>

            <div className="objective-tracker__row">
                { objectives.emerald ? <ItemBlock itemName="emerald" /> : emptySlot }
                { objectives.ruby ? <ItemBlock itemName="ruby" /> : emptySlot }
                { objectives.sapphire ? <ItemBlock itemName="sapphire" /> : emptySlot }
            </div>

            <div className="objective-tracker__row">
                { objectives.lightMedallion ? <ItemBlock itemName="light-medallion" /> : emptySlot }
                { objectives.forestMedallion ? <ItemBlock itemName="forest-medallion" /> : emptySlot }
                { objectives.fireMedallion ? <ItemBlock itemName="fire-medallion" /> : emptySlot }
                { objectives.waterMedallion ? <ItemBlock itemName="water-medallion" /> : emptySlot }
                { objectives.shadowMedallion ? <ItemBlock itemName="shadow-medallion" /> : emptySlot }
                { objectives.spiritMedallion ? <ItemBlock itemName="spirit-medallion" /> : emptySlot }
            </div>
        </div>
    );
}

export default ObjectiveTracker;
