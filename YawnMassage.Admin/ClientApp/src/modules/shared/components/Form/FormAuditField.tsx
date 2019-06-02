import FormGroup from "reactstrap/lib/FormGroup";
import * as React from "react";
import { formatDate } from "@telerik/kendo-intl";
import { localise } from "../../services";
import { localiseWithParams } from "../../services/localisation.service";

interface AuditFieldProps {
    updatedOnUtc?: Date;
    updatedByName?: string;
}

const FormAuditField = (props: AuditFieldProps) => {
    return (
        !props.updatedOnUtc ? null
            :
            <FormGroup>
                <label> {localise("TEXT_AUDIT")} </label><br />
                {props.updatedOnUtc && <small className="text-muted">{getAuditText(props.updatedByName, props.updatedOnUtc)} </small>}
            </FormGroup>)
}

function getAuditText(person?: string, date?: Date) {
    const dateStr = date ? formatDate(new Date(date), 'dd MMM y HH:mm') : "";
    const auditText = localiseWithParams('TEXT_AUDIT_MESSAGE', { "by": person, "on": dateStr });
    return auditText;
}

export default FormAuditField