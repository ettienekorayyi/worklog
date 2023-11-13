import { createSelector } from "reselect";

const traderSelector = (state) => state.trader;

export const getIsSignedIn = createSelector(
    [traderSelector],
    state => state.isSignedIn
);

export const getTraderId = createSelector(
    [traderSelector],
    state => state.id
);
