import { featureName as authFeatureName, authReducer } from './reducers/index';
  
  export const appReducers = {

    [authFeatureName]: authReducer,             // los reducers de la aplicación
  };