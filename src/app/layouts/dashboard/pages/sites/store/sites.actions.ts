import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateSiteData, Site } from '../models/site';

export const SitesActions = createActionGroup({
  source: 'Sites',
  events: {
    'Load Sites': emptyProps(),
    'Load Sites Success': props<{ data: Site[] }>(),
    'Load Sites Failure': props<{ error: unknown }>(),
    'Create Site': props<{ data: CreateSiteData }>(),
    'Create Site Success': props<{ data: Site }>(),
    'Create Site Failure': props<{ error: unknown }>(),
    'Delete Site': props<{ siteId: number }>(),
    'Delete Site Success': props<{ siteId: number }>(),
    'Delete Site Failure': props<{ error: unknown }>(),  
  }
});
