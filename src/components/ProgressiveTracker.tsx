import React from "react";
import "../stylesheets/ProgressiveTracker.scss";
import ItemBlock from "./ItemBlock";

export interface Progressive {
    liftLevel: number;
    scaleLevel: number;
    walletLevel: number;
    magicLevel: number;
}

function ProgressiveTracker(progressive: Progressive): React.ReactElement {
    return (
        <div className="progressive-tracker">
            <ItemBlock itemName={"lift-" + progressive.liftLevel} />
            <ItemBlock itemName={"scale-" + progressive.scaleLevel} />
            <ItemBlock itemName={"magic-" + progressive.magicLevel} />
            <ItemBlock itemName={"wallet-" + progressive.walletLevel} />
        </div>
    );
}

export default ProgressiveTracker;
