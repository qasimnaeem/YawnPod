import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import { sharedReducers } from '../modules/shared/reducers';
import { configurationReducers } from "../modules/configuration/reducers";
import { securityReducers } from '../modules/security/reducers';

const rootReducer = combineReducers({
    ...sharedReducers,
    ...configurationReducers,
    ...securityReducers,
    form: formReducer
});

export default rootReducer;