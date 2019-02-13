import { createSelector } from 'reselect';

export const selectState = () => state => state.count;

export const selectCount = () =>
  createSelector(
    selectState(),
    count => count.count
  );
