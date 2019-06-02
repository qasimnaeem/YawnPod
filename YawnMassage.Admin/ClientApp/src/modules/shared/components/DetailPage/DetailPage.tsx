import * as React from 'react';
import { match } from 'react-router';
import { History, Location, UnregisterCallback } from 'history';
import * as qs from "query-string";
import { DetailFormBodyComponent, DetailFormHeaderComponent } from './DetailForm';
import { DetailReduxForm, DetailReduxFormProps } from './DetailReduxForm';
import { DetailObject } from '../../types/store';
import { navService, confirmDialogService, contextService } from '../../services';
import { alertActions } from '../../actions/alert.actions';
import { DataUpdateResult } from '../../types/dto';
import { uiDomService } from '../../services/ui-dom.service';

export interface DetailPageProps<T extends DetailObject> {
    pageName: string;
    item?: T;
    match: match<any>;
    history: History;
    location: Location;
    loadData: (id: string) => Promise<DetailObject>;
    saveData: (item: T) => Promise<DataUpdateResult>;
    delete: (id: string) => Promise<void>;
    clearStore: () => void;
}

interface State {
    selectedGroupId?: string;
}

export abstract class DetailPage<T extends DetailObject> extends React.Component<DetailPageProps<T>, State> {

    constructor(props: DetailPageProps<T>) {
        super(props);
        this.detailForm = DetailReduxForm(`${props.pageName}Form`, this.validateItem) as any;

        this.goBack = this.goBack.bind(this);
        this.save = this.save.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.reInitializeForm = this.reInitializeForm.bind(this);
        this.groupSelected = this.groupSelected.bind(this);
        this.beforeSave = this.beforeSave.bind(this);
        this.afterSave = this.afterSave.bind(this);
        this.afterDelete = this.afterDelete.bind(this);

        this.state = {}
    }

    detailForm: (props: DetailReduxFormProps) => JSX.Element;
    historyUnlisten: UnregisterCallback;

    abstract listPagePath: string;
    abstract detailFormBody: DetailFormBodyComponent;
    detailFormHeader?: DetailFormHeaderComponent;
    abstract validateItem(item: T): any;

    componentDidMount() {
        this.reInitializeForm();
  
    }

    reInitializeForm(){
        this.loadDataUsingRouteParam(this.props.location);
        this.historyUnlisten = this.props.history.listen((location: Location) => {
            this.loadDataUsingRouteParam(location);
        })
    }

    componentWillUnmount() {
        this.historyUnlisten();
        this.props.clearStore();
    }

    loadDataUsingRouteParam(location: Location) {

        const currentPath = this.props.location.pathname;
        const newPath = location.pathname;

        if (newPath != currentPath) //This means navigating away from the page 
            return;

        const { props } = this;
        props.loadData(props.match.params.id)
            //Hack to resize content after data load.
            .then(() => uiDomService.adjustDynamicPageContentSizes());
    }

    goBack() {
        navService.goBackToListPage(this.listPagePath, this.props.history);
    }

    save(values: any) {
        const { props } = this;

        const item = this.formValuesToObject(values);
        const isNew = this.isNew(item);

        //Execute beforeSave and see whether we can go ahead and save data.
        var goAhead = this.beforeSave(item, isNew);

        if (!goAhead)
            return;

        props.saveData && props.saveData(item)
            .then(result => {
                alertActions.showSuccess('TEXT_SAVE_SUCCESS');
                this.afterSave(result.id, item, isNew);

                //Navigate to the newly created item url.
                if (isNew) {
                    let searchParams = qs.parse(props.history.location.search);
                    searchParams.contextGroupId = contextService.getCurrentContext().groupId;
                    props.history.push({
                        pathname: props.match.path.replace(":id", result.id),
                        search: qs.stringify(searchParams)
                    });
                }
            })
    }

    deleteItem() {
        const { props } = this;
        const itemId = props.item && props.item.id || "";

        props.item && props.delete && confirmDialogService.showDialog('CONFIRMATION_DELETE',
            () => {
                props.delete(itemId)
                    .then(() => {
                        this.afterDelete(itemId);
                        this.goBack();
                        alertActions.showSuccess('TEXT_DELETE_SUCCESS');
                    })
            });
    }

    objectToFormValues(item: T): any {
        return item;
    }

    formValuesToObject(values: any): T {
        return values as T;
    }

    beforeSave(item: T, isNew: boolean): boolean {
        return true; //Default implemenation
    }

    afterSave(id: string, item: T, isNew: boolean) {
        return true; //Default implemenation
    }

    afterDelete(id: string) {
        return true; //Default implemenation
    }

    groupSelected(groupId: any) {
        this.setState({ selectedGroupId: groupId });
        contextService.setCurrentGroup(groupId);
    }

    private isNew(item: T) {
        return item.id == "";
    }

    isReadOnly(item: T) {
        return false;
    }

    render() {
        const { props } = this;
        const DetailForm = this.detailForm;
        
        const formValues = props.item ? this.objectToFormValues(props.item) : props.item;
        const readonly = props.item && this.isReadOnly(props.item);

        return (
            props.item ?
                <DetailForm reload={this.reInitializeForm} header={this.detailFormHeader} selectedGroupId={this.state.selectedGroupId} onSelectGroup={this.groupSelected} 
                isNew={this.isNew(props.item)} initialValues={formValues} onSubmit={this.save} item={props.item} body={this.detailFormBody} 
                onBackClick={this.goBack} onDeleteClick={this.deleteItem} readonly={readonly} /> : null
        )
    }
}