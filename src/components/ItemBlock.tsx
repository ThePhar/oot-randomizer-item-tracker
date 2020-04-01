import React from "react";
import "../stylesheets/ItemBlock.scss";

export interface Item {
    /** CSS-Compliant name of the item to be rendered as the background image for this component. */
    itemName: string;
    /** Optional: The current count on the quantity on hand and the maximum allowed to carry for this item. */
    count?: {
        /** The current quantity on hand. */
        current: number;
        /** The maximum quantity for this item. */
        max: number;
    };
}

function ItemBlock({itemName, count}: Item): React.ReactElement {
    let countClassModifier = "";
    if (count) {
        if (count.current === 0) countClassModifier = "item-block__count--empty";
        if (count.current === count.max) countClassModifier = "item-block__count--full";
    }

    return (
        <div className={"item-block " + itemName}>
            {count && <div className={"item-block__count " + countClassModifier}>{count.current}</div>}
        </div>
    );
}

export default ItemBlock;
