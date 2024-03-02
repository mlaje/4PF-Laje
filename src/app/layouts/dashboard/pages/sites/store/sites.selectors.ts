import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSites from './sites.reducer';

export const selectSitesState = createFeatureSelector<fromSites.State>(
  fromSites.sitesFeatureKey
);

export const selectSites = createSelector(
        selectSitesState,
        (state) => state.sites
);

export const selectSitesIsLoading = createSelector(
        selectSitesState,
        (state) => state.loading
);
