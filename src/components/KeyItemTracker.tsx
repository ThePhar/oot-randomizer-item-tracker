import React from "react";
import "../stylesheets/KeyItemTracker.scss";
import ItemBlock from "./ItemBlock";

export interface KeyItems {
    gerudoCard: boolean;
    stoneOfAgony: boolean;
    liftLevel: number;
    scaleLevel: number;
    walletLevel: number;
    magicLevel: number;
}

function KeyItemTracker(keyItems: KeyItems): React.ReactElement {
    const emptySlot = <ItemBlock itemName="empty" />;

    return (
        <div className="key-item-tracker">
            { keyItems.stoneOfAgony ? <ItemBlock itemName="stone" /> : emptySlot }
            { keyItems.gerudoCard ? <ItemBlock itemName="gerudo-card" /> : emptySlot }
            <ItemBlock itemName={"lift-" + keyItems.liftLevel} />
            <ItemBlock itemName={"scale-" + keyItems.scaleLevel} />
            <ItemBlock itemName={"wallet-" + keyItems.walletLevel} />
            <ItemBlock itemName={"magic-" + keyItems.magicLevel} />
        </div>
    );
}

export default KeyItemTracker;
