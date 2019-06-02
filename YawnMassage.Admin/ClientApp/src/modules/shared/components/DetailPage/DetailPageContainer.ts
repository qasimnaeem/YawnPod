import { connect } from 'react-redux';
import { StoreState } from '../../../../redux/store';
import { DetailObject } from '../../types/store';
import { detailPageActions } from '../../actions/detail-page.actions';

const mapStateToProps = (pageName: string) => (state: StoreState) => {

    const pageState = (state as any).detailPage[pageName];
    return {
        pageName: pageName,
        item: pageState && pageState.item
    }
}

const mapDispatchToProps = (pageName: string, apiController: string, newObjectGenerator?: () => any) => <T extends DetailObject>(dispatch: any) => {
    return {
        loadData: (id: string) => {
            return dispatch(detailPageActions.loadData(pageName, apiController, id, newObjectGenerator))
        },
        saveData: (item: T) => {
            return dispatch(detailPageActions.saveData(pageName, apiController, item))
        },
        delete: (id: string) => {
            return dispatch(detailPageActions.deleteItem(pageName, apiController, id))
        },
        clearStore: () => {
            dispatch(detailPageActions.clearStore(pageName))
        }
    }
}

export default <T extends DetailObject>(
    detailPageComponent: any,
    pageName: string,
    apiController: string,
    newObjectGenerator?: () => any) =>
        connect(mapStateToProps(pageName), mapDispatchToProps(pageName, apiController, newObjectGenerator))(detailPageComponent);