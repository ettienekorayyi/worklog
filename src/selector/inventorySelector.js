import {createSelector} from 'reselect';

const InventorySelector = (state) => state.inventory;

export const getInventory = createSelector(
    [InventorySelector],
    state => state.list
)