import * as React from "react";
import { DetailPage, DetailFormBodyComponent, DetailPageContainer } from "../../../shared/components/DetailPage";
import { Template, TemplateChannels } from "../../types/dto";
import { DetailFormProps } from "../../../shared/components/DetailPage/DetailForm";
import { FormField, FormAuditField } from "../../../shared/components/Form";
import { LookupDropDown } from "../../../shared/components/LookupDropDown/LookupDropDown";
import Input from "reactstrap/lib/Input";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { contextService } from "../../../shared/services";
import { utilityService } from "src/modules/shared/services/util.service";

class TemplateDetails extends DetailPage<Template> {
  detailFormBody: DetailFormBodyComponent = FormBody;
  listPagePath: string = "/template/templatemanagement";

  validateItem(item: Template) {
    return {};
  }

  objectToFormValues(template: Template): any {
    if (template.templates == undefined) template.templates = [];

    return { ...template, templates: JSON.stringify(template.templates) };
  }

  formValuesToObject(values: any): Template {
    return {
      ...values, templates: JSON.parse(values.templates)
    };
  }
}

interface LocalState {
  channel?: string;
}

class FormBody extends React.Component<DetailFormProps, LocalState> {
  constructor(props: DetailFormProps) {
    super(props);
    this.onGroupChange = this.onGroupChange.bind(this);
    this.onChannelChange = this.onChannelChange.bind(this);
    this.state = {};
  }

  onGroupChange(event: any, inputProps: any) {
    const { props: formProps } = this;
    formProps.onSelectGroup(event.target.value);
    inputProps.onChange(event);
  }

  onChannelChange(event: any, inputProps: any) {
    const { props: formProps } = this;
    this.setState({ channel: event.target.value });
    inputProps.onChange(event);
    formProps.change("subject", "");
  }

  onContentChange(event: any, inputProps: any) {
    const { props: formProps } = this;
    formProps.change("content", event.target.value);
    inputProps.onChange(event);
  }

  validateChannel(value: any) {
    const { state } = this;
    return state.channel == TemplateChannels.Email ? utilityService.validateEmail(value) : "";
  }

  render() {
    const { props: formProps } = this;
    const { state } = this;
    return (
      <>
      <FormField name="groupId" required={true} remarksKey="REMARK_GROUP" labelKey="TEXT_GROUP"
        disabled={!formProps.isNew}
        component={(props: any) => (<GroupList{...props} hideAllOption={false} onChange={(e: any) => this.onGroupChange(e, props)}
          permissionSuffix={formProps.isNew ? "NEW" : "UPDATE"} />)}
      />
      <FormField name="culture" labelKey="TEXT_CULTURE" remarksKey="REMARK_CULTURE" required={true}
        component={(props: any) => (<LookupDropDown {...props} lookupKey="LIST_CULTURE" />)} />
      <FormField name="section" labelKey="TEXT_SECTION" remarksKey="REMARK_SECTION" required={true}
        component={(props: any) => (<LookupDropDown {...props} lookupKey="LIST_SECTION" />)} />
      <FormField name="channel" labelKey="TEXT_CHANNEL" remarksKey="REMARK_CHANNEL" required={true}
        component={(props: any) => (<LookupDropDown {...props} lookupKey="LIST_ALERT_CHANNELS" onChange={(e: any) => this.onChannelChange(e, props)} />)}
      />
      <FormField name="key" labelKey="TEXT_KEY" remarksKey="REMARK_KEY" required={true}
        component={(props: any) => (
          <LookupDropDown {...props} lookupKey={state.channel == TemplateChannels.Email ? "LIST_EMAIL_TEMPLATES" : "LIST_SMS_TEMPLATES"} />)} />
      <FormField name="senderId" remarksKey="REMARK_SENDER_ID" required={true} labelKey="TEXT_SENDER_ID"
        component={Input} validate={this.validateChannel} />
      {state.channel == TemplateChannels.Email && (
        <FormField name="subject" remarksKey={"REMARK_SUBJECT"} required={true} labelKey={"TEXT_SUBJECT"}
          component={Input} />)}
      <FormField remarksKey="REMARK_CONTENT" required={true} labelKey="TEXT_CONTENT" name="content"
        component={(props: any) => (<Input{...props} type="textarea" name="content" id="content" style={{ height: 150 }}
          onChange={(e: any) => this.onContentChange(e, props)} />)}
      />
      <FormField remarksKey="TEMPLATE_REMARK" required={true} labelKey="TEXT_REMARK" name="remark"
        component={Input} />
      <FormAuditField updatedOnUtc={formProps.item.updatedOnUtc} updatedByName={formProps.item.updatedByName} />
      </>
    );
  }
}

export default DetailPageContainer(TemplateDetails, "TemplateDetails", "alertTemplate", () => {
  //Code to return a new empty object.
  return {
    id: "", groupId: contextService.getDefaultSingleGroupId()
  };
}
);
