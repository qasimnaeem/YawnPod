import * as React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { localise, apiService, contextService, globalDirtyService, configService, confirmDialogService, permissionService } from 'src/modules/shared/services';
import { Row, Col, Label, Input } from 'reactstrap';
import { BackButton, ActionButton, SaveButton } from 'src/modules/shared/components/ActionButtons/ActionButtons';
import GroupList from 'src/modules/shared/components/GroupList/GroupList';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import { bulkDataservice } from '../../../services/bulkDataservice';
import { History } from "history";
import * as qs from "query-string";
import "./import-popup.css"
import { BulkDataOperationType } from '../../../types/dto';

interface Props {
    parentPageGroupId: string;
    history: History;
}

interface State {
    groupId: string;
    remark: string;
    sasToken?: string;
    isPopupShown: boolean;
    isSelected: boolean;
    isRemarkError: boolean;
    isUploadSucess: boolean;
    fileName?: string;
    fileSize?: number;
    blobReference?: string;
    isNewDatabaseFile: boolean;
}

export class ImportPopup extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            groupId: this.props.parentPageGroupId,
            remark: '',
            isPopupShown: false,
            isSelected: false,
            isRemarkError: false,
            isUploadSucess: false,
            isNewDatabaseFile: false
        }

        this.showPopup = this.showPopup.bind(this);
        this.hidePopup = this.hidePopup.bind(this);
        this.clearUploadedState = this.clearUploadedState.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.onFileClear = this.onFileClear.bind(this);
        this.onUploadedFileRemove = this.onUploadedFileRemove.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onBackClick = this.onBackClick.bind(this);
        this.deleteBlob = this.deleteBlob.bind(this);
        this.onGroupChange = this.onGroupChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFileSize = this.getFileSize.bind(this);
        this.toggleNewDatabaseFile = this.toggleNewDatabaseFile.bind(this);

    }

    showPopup() {
        this.setState({ isPopupShown: true });
    }

    hidePopup() {
        this.clearUploadedState();
        this.setState({
            groupId: this.props.parentPageGroupId,
            remark: '',
            isPopupShown: false,
            isRemarkError: false,
            isNewDatabaseFile: false
        });
    }

    clearUploadedState() {
        this.setState({
            sasToken: undefined,
            isSelected: false,
            isUploadSucess: false,
            fileName: undefined,
            fileSize: undefined,
            blobReference: undefined
        });
    }

    onFileSelect() {
        this.setState({ ...this.state, isSelected: true });
    }

    onFileClear() {
        this.setState({ ...this.state, isSelected: false });
    }

    onUploadedFileRemove() {
        confirmDialogService.showDialog('CONFIRMATION_REMOVE_UPLOADED_FILE', () => {
            this.deleteBlob();
            this.clearUploadedState();
        }, () => { })
    }

    onUpload(e: any) {
        let fileName = e.files[0].name;
        let fileSize = e.files[0].size;
        let fileContent = e.files[0].rawFile;
        e.preventDefault(); // This to stop the default 
        apiService.get('bulkData', 'GetImportFileBlobDetails', undefined, { fileName: fileName })
            .then((blobDetails: any) => {
                bulkDataservice.uploadFile(blobDetails.blobUri, fileSize, fileContent)
                    .then(() => {
                        this.setState({
                            ...this.state, fileName: fileName, fileSize: fileSize,
                            isUploadSucess: true, blobReference: blobDetails.blobReference
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            });
    }

    onSave() {
        const { blobReference, groupId, remark, fileName, isNewDatabaseFile } = this.state;
        if (remark != '') {

            contextService.setCurrentGroup(groupId);

            apiService.post('bulkData', undefined, {
                operationTypeCode: BulkDataOperationType.Import, blobReference: blobReference, groupId: groupId,
                remark: remark, fileName: fileName, isNewDataBaseFile: isNewDatabaseFile
            })
                .then(() => {
                    const criteria = qs.parse(this.props.history.location.search);
                    this.props.history.push({
                        pathname: "",
                        search: qs.stringify({ ...criteria, contextGroupId: groupId })
                    });
                    this.hidePopup();
                })
                .catch(() => {
                    contextService.setCurrentGroup(this.props.parentPageGroupId);
                });
        }
        else
            this.setState({ ...this.state, isRemarkError: true });
    }

    onBackClick() {
        const { groupId, remark, isSelected, isUploadSucess, blobReference } = this.state;

        if (groupId != '' || remark != '' || isSelected || isUploadSucess) {
            globalDirtyService.showDirtyConfirmation(() => {
                if (isUploadSucess && blobReference) {
                    this.deleteBlob();
                }
                this.hidePopup();
            });
        }
        else
            this.hidePopup();
    }

    deleteBlob() {
        const { isUploadSucess, blobReference } = this.state;

        if (isUploadSucess && blobReference) {
            apiService.get('bulkData', 'GetFileDeleteUrl', undefined, { blobReference: blobReference })
                .then((deleteUrl: string) => {
                    bulkDataservice.deleteFile(deleteUrl);
                });
        }
    }

    onGroupChange(e: any) {
        this.setState({ ...this.state, groupId: e.target.value, isNewDatabaseFile: false });
    }

    handleChange(event: any) {
        const { name, value } = event.target;
        this.setState(Object.assign(this.state, { [name]: value }));
    }

    getFileSize(fileSizeInBytes: number) {
        let fileSizeInKB = (fileSizeInBytes / 1024);

        if (fileSizeInKB < 1024)
            return fileSizeInKB.toFixed(2) + ' KB';

        return (fileSizeInKB / 1024).toFixed(2) + 'MB';
    }

    toggleNewDatabaseFile(e: any) {
        this.setState(Object.assign(this.state,
            { isNewDatabaseFile: !this.state.isNewDatabaseFile }
        ));
    }

    render() {
        const { groupId, remark, isUploadSucess, fileName, fileSize, isNewDatabaseFile } = this.state;
        const maxFileSizeConfig = configService.getConfigurationValue("MAXIMUM_IMPORT_FILE_SIZE_MB", undefined, groupId);
        const maxFileSize = maxFileSizeConfig != '' ? parseInt(maxFileSizeConfig) : 10;
        let uploadControllerLocalisation: kendo.ui.UploadLocalization = {
            select: localise("TEXT_BROWSE"),
            invalidFileExtension: localise("ERROR_INVALID_FILE_TYPE"),
            uploadSelectedFiles: localise("TEXT_CONFIRM_AND_UPLOAD"),
            clearSelectedFiles: localise("TEXT_CLEAR"),
            invalidMaxFileSize: localise("ERROR_MAXIMUM_FILE_SIZE_EXCEEDED")
        }

        let canAddNewDatabaseFile = permissionService.isActionPermittedForGroup('NEW_DATABASE_FILE', groupId);
        return (
            <>
                <ActionButton className="float-right" key="importbtn" textKey="TEXT_IMPORT" color="primary"
                    icon="fa-upload" onClick={this.showPopup} disabled={this.props.parentPageGroupId == ''} />
                {
                    this.state.isPopupShown
                    &&
                    <Dialog width={500}>
                        <Row style={{ marginTop: 10 }}>
                            <Col>
                                <BackButton onClick={() => this.onBackClick()} />
                                <SaveButton className="float-right" onClick={this.onSave} disabled={!isUploadSucess || groupId == ''} />
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col>
                                <Label>
                                    {localise("TEXT_GROUP")}
                                    {' *'}
                                </Label>
                                <GroupList allowAny={true} value={groupId} onChange={(e: any) =>
                                    this.onGroupChange(e)} permissionSuffix={"SEARCH"} />
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 10 }}>
                            <Col>
                                <Label>
                                    {localise("TEXT_DATABASE_FILE")}
                                    {' *'}
                                    {' ('}{localise("TEXT_FILE_TYPE")}: Excel, {localise("TEXT_MAXIMUM_FILE_SIZE")}: {maxFileSize}MB{')'}
                                </Label>
                                {!isUploadSucess && <div>
                                    <Upload localization={uploadControllerLocalisation} multiple={false}
                                        validation={{
                                            allowedExtensions: [".xlsx"],
                                            maxFileSize: maxFileSize * 1024 * 1024 //Convert MB to Bytes 
                                        }}
                                        async={{
                                            saveUrl: "http://dummy-api/save", //To show the upload button in kendo-ui upload component a url is needed. 
                                            removeUrl: "",
                                            autoUpload: false
                                        }}
                                        select={this.onFileSelect}
                                        clear={this.onFileClear}
                                        upload={(e) => this.onUpload(e)}
                                    />
                                </div>}
                                {isUploadSucess && <div className="box">
                                    <Row>
                                        <Col md={2} lg={2}>
                                            <i className="fileIcon far fa-file-excel fa-2x"></i>
                                        </Col>
                                        <Col md={8} lg={8}>
                                            <Row>
                                                <span className="text-left">{fileName}</span>
                                            </Row>
                                            <Row>
                                                <span>{fileSize ? this.getFileSize(fileSize) : ''} </span>
                                            </Row>
                                        </Col>
                                        <Col md={2} lg={2}>
                                            <i className="clickable fas fa-times" onClick={() => this.onUploadedFileRemove()}></i>
                                        </Col>
                                    </Row>
                                </div>}
                            </Col>
                        </Row>
                        {groupId != '' && canAddNewDatabaseFile && <Row>
                            <Col>
                                <Label check>
                                    <Input type="checkbox" disabled={groupId == 'any'} checked={isNewDatabaseFile} onChange={this.toggleNewDatabaseFile} />
                                    {localise('TEXT_CHECK_NEW_DATABASE')}
                                </Label>
                            </Col>
                        </Row>}
                        <Row style={{ marginTop: 10 }}>
                            <Col>
                                <Label>
                                    {localise("TEXT_REMARK")}
                                    {' *'}
                                </Label>
                                <Input name="remark" maxLength={100} value={remark} onChange={this.handleChange} />
                                <div>
                                    {this.state.isRemarkError &&
                                        <small className="text-danger">
                                            {localise("ERROR_FIELD_REQUIRED")}
                                        </small>}
                                </div>
                            </Col>
                        </Row>
                    </Dialog>
                }
            </>
        )
    }
}