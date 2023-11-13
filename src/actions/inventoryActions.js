export const FETCH_INVENTORY = "FETCH_INVENTORY"
export const fetchInventoryAction = (inventory) => {
    return {
        type:"FETCH_INVENTORY",
        payload:inventory
    }
}