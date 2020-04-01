import React from "react";
import "../stylesheets/EquipmentTracker.scss";
import ItemBlock from "./ItemBlock";

export interface Equipment {
    swords: {
        kokiriSword: boolean;
        masterSword: boolean;
        bigSword: boolean;
    };
    shields: {
        dekuShield: boolean;
        hylianShield: boolean;
        mirrorShield: boolean;
    };
    tunics: {
        goronTunic: boolean;
        zoraTunic: boolean;
    };
    boots: {
        ironBoots: boolean;
        hoverBoots: boolean;
    };
}

function EquipmentTracker(equipment: Equipment): React.ReactElement {
    const emptySlot = <ItemBlock itemName="empty" />;

    return (
        <div className="equipment-tracker">
            { equipment.swords.kokiriSword ? <ItemBlock itemName="kokiri-sword" /> : emptySlot }
            { equipment.swords.masterSword ? <ItemBlock itemName="master-sword" /> : emptySlot }
            { equipment.swords.bigSword ? <ItemBlock itemName="big-sword" /> : emptySlot }

            { equipment.shields.dekuShield ? <ItemBlock itemName="deku-shield" /> : emptySlot }
            { equipment.shields.hylianShield ? <ItemBlock itemName="hylian-shield" /> : emptySlot }
            { equipment.shields.mirrorShield ? <ItemBlock itemName="mirror-shield" /> : emptySlot }

            <ItemBlock itemName="kokiri-tunic" />
            { equipment.tunics.goronTunic ? <ItemBlock itemName="goron-tunic" /> : emptySlot }
            { equipment.tunics.zoraTunic ? <ItemBlock itemName="zora-tunic" /> : emptySlot }

            <ItemBlock itemName="kokiri-boots" />
            { equipment.boots.ironBoots ? <ItemBlock itemName="iron-boots" /> : emptySlot }
            { equipment.boots.hoverBoots ? <ItemBlock itemName="hover-boots" /> : emptySlot }
        </div>
    );
}

export default EquipmentTracker;
