import * as React from 'react';
import { SortDescriptor } from "@progress/kendo-data-query";
import { History, Location, UnregisterCallback } from "history";
import * as qs from "query-string";
import { SearchCriteriaBase } from '../../types/dto';
import { navService, contextService } from '../../services';
import { uiDomService } from '../../services/ui-dom.service';

export interface SearchPageProps<T extends SearchCriteriaBase> {
    search: (sort: SortDescriptor, searchCriteria: T) => Promise<void>;
    history: History;
    location: Location;
    recordsExist?:boolean;
}

export abstract class SearchPage<T extends SearchCriteriaBase> extends React.Component<SearchPageProps<T>> {

    constructor(props: SearchPageProps<T>) {
        super(props);

        this.goToAddNewPage = this.goToAddNewPage.bind(this);
        this.goToDetailPage = this.goToDetailPage.bind(this);
    }

    abstract defaultSort: SortDescriptor;

    routePath: string;
    historyUnlisten: UnregisterCallback;

    componentDidMount() {

        this.routePath = this.props.history.location.pathname;

        this.performSearchFromUrl(this.props.history.location);
        this.historyUnlisten = this.props.history.listen((location) => {
            this.performSearchFromUrl(location);
        });
    }

    componentWillUnmount() {
        this.historyUnlisten();
    }

    goToAddNewPage() {
        navService.goToDetailPage(`${this.routePath}/new`, undefined, this.props.history);
    }
    goToDetailPage(dataItem: any) {
        const context = contextService.getCurrentContext();
        navService.goToDetailPage(`${this.routePath}/${dataItem.id}`, context.groupId, this.props.history);
    }

    performSearchFromUrl(location: Location) {

        const currentPath = this.props.location.pathname;
        const newPath = location.pathname;

        if (newPath != currentPath) //This means navigating away from the page 
            return;

        let hasParams = location.search.length > 0;

        //we don't perform a search unless there are seach params specified .
        if ( hasParams) {

            const criteria = qs.parse(location.search);

            const sort = criteria.sortField ? { field: criteria.sortField, dir: criteria.sortDir } : this.defaultSort;

            const searchCriteria = criteria;
            searchCriteria.includeDeleted = criteria.includeDeleted && JSON.parse(criteria.includeDeleted) || false;
            delete searchCriteria.sortField;
            delete searchCriteria.sortDir;
            delete searchCriteria.contextGroupId;

            contextService.setCurrentGroupFromUrl(location);

            this.props.search(sort, searchCriteria)
                //Hack to resize content after data load.
                .then(() => uiDomService.adjustDynamicPageContentSizes());
        }
    }
}