import { alert } from "./alert.reducer";
import { confirmDialog } from "./confirm-dialog.reducer";
import { spinner } from "./spinner.reducer";
import { dataGrid } from "./data-grid.reducer";
import { detailPage } from "./detail-page.reducer";
import { notificationDialog } from "./notification-dialog.reducer";

export let sharedReducers = {
    alert,
    confirmDialog,
    notificationDialog,
    spinner,
    dataGrid,
    detailPage
};