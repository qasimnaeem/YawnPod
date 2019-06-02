import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './root-reducer'
import { Alert, GlobalSpinnerState, ConfirmDialogState, NotificationDialogState } from '../modules/shared/types/store';
import { PodSimulationState } from '../modules/pod/types/store';

export const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export interface StoreState {
    alert: Alert,
    spinner: GlobalSpinnerState
    confirmDialog: ConfirmDialogState,
    notificationDialog : NotificationDialogState,
    podSimulation: PodSimulationState
}
