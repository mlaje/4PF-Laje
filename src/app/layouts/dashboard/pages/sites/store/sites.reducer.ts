import { createFeature, createReducer, on } from '@ngrx/store';
import { SitesActions } from './sites.actions';
import { Site } from '../models/site';

export const sitesFeatureKey = 'sites';

export interface State {
  sites: Site[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  sites: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SitesActions.loadSites, (state) => ({ 
                                                ...state, 
                                                loading: true 
  })),
  on(SitesActions.loadSitesSuccess, (state, action) => ({
                                                ...state,
                                                loading: false,
                                                sites: action.data,
  })),
  on(SitesActions.loadSitesFailure, (state, action) =>  ({ 
                                                ...state,
                                                loading: false,
                                                error: action.error,
  })),
);

export const sitesFeature = createFeature({
  name: sitesFeatureKey,
  reducer,
});

