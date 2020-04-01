import React from "react";
import "../stylesheets/InventoryTracker.scss";
import ItemBlock, { Item } from "./ItemBlock";

interface Inventory {
    items: Array<Item | null>;
}

function InventoryTracker({ items }: Inventory): React.ReactElement {
    const itemElements = items.map((item, index) => {
        // Generate an empty "spacer" item for formatting purposes in tracker.
        if (item === null)
            return <ItemBlock key={index} itemName={"empty"} />;

        return <ItemBlock key={index} itemName={item.itemName} count={item.count} />;
    });

    return (
        <div className="inventory-tracker">
            {itemElements}
        </div>
    );
}

export default InventoryTracker;
