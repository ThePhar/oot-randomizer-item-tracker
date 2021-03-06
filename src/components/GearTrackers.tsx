import React from "react";
import "../stylesheets/GearTrackers.scss";

import InventoryTracker from "./InventoryTracker";
import EquipmentTracker, { Equipment } from "./EquipmentTracker";
import KeyItemTracker, { KeyItems } from "./KeyItemTracker";
import { Item } from "./ItemBlock";

interface Gear {
    items: Array<Item | null>;
    keyItems: KeyItems;
    equipment: Equipment;
    rupees: number;
    frozen: boolean;
}

function GearTrackers({ rupees = 0, frozen, items, keyItems, equipment }: Gear): React.ReactElement {
    return (
        <div className="gear-trackers">
            <div className="gear-trackers__sub-category">
                { /* TODO: Write component for this box! */ }
                <div
                    style={{
                        width: 92,
                        height: 24,
                        borderLeft: "8px solid rebeccapurple",
                        borderTop: "8px solid #4d2673",
                        backgroundColor: "#321a65",
                        fontFamily: "Visitor, monospace",
                        color: "white",
                        textShadow: "-1px 1px 0 #000000, 1px 1px 0 #000000, 1px -1px 0 #000000, -1px -1px 0 #000000",
                        fontSize: 25,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        paddingRight: 4,
                    }}
                >
                    {
                        !frozen ? rupees : <span style={{color: "red"}}>FOOL!</span>
                    }
                </div>
                <KeyItemTracker {...keyItems} />
            </div>
            <EquipmentTracker {...equipment} />
            <InventoryTracker items={items} />
        </div>
    );
}

export default GearTrackers;
