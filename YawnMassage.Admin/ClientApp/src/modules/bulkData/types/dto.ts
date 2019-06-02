import { SearchCriteriaBase } from "src/modules/shared/types/dto";

export interface BulkDataManagementSearchCriteria extends SearchCriteriaBase {
    contextGroupId: string;
}

export enum BulkDataOperationType {
    Import = "IMPORT",
    Export = "EXPORT"
}

export enum BulkDataOperationStatus {
    Queued = "QUEUED",
    Running = "RUNNING",
    Complete = "COMPLETE",
    CompleteWithErrors = "COMPLETE_WITH_ERRORS",
    Failed = "FAILED"
}

export interface SheetError {
    sheetName?: string;
    entityType?: string;
    errorRows: RowError[];
    totalProcessedRowCount: number;
    successObjectsCount: number;
    errorMessage?: string;
}

export interface RowError {
    rowIndex: number;
    errorMessage?: string;
    errorCells: CellError[];
}

export interface CellError {
    value?: string;
    columnName?: string;
    hasRequiredError: boolean;
    hasDataFormatError: boolean;
    rowIndex: number;
    colIndex: number;
}