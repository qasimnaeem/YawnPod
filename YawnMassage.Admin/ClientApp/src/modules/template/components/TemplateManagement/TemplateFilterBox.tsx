import * as React from "react";
import { SearchFilterBox, SearchFilterBoxProps, SearchFilterField } from "../../../shared/components/SearchFilterBox";
import { TemplateSearchCriteria } from "../../types/dto";
import { Col, Row, Input } from "reactstrap";
import GroupList from "../../../shared/components/GroupList/GroupList";
import { contextService } from "../../../shared/services";
import { LookupDropDown } from "../../../shared/components/LookupDropDown/LookupDropDown";

export class TemplateFilterBox extends SearchFilterBox<TemplateSearchCriteria> {

  constructor(props: SearchFilterBoxProps) {

    const initialState = {
      contextGroupId: contextService.getDefaultSingleGroupId(),
      culture: "any",
      section: "any",
      key: "",
      channel: ""
    };

    super(props, initialState);
    this.handleKeyBlur = this.handleKeyBlur.bind(this);
  }

  getFields(): JSX.Element {
    const { state } = this;
    return (<Row>
      <Col md={6} lg={2}>
        <SearchFilterField titleKey="TEXT_GROUP">
          <GroupList permissionSuffix="SEARCH" name="contextGroupId" value={state.contextGroupId}
            onChange={this.handleChange} />
        </SearchFilterField>
      </Col>
      <Col md={6} lg={2}>
        <SearchFilterField titleKey="TEXT_CULTURE">
          <LookupDropDown name="culture" lookupKey="LIST_CULTURE" allowAny={true} textAny="TEXT_ANY_CULTURE"
            value={state.culture} onChange={this.handleChange} />
        </SearchFilterField>
      </Col>
      <Col md={6} lg={2}>
        <SearchFilterField titleKey="TEXT_SECTION">
          <LookupDropDown name="section" lookupKey="LIST_SECTION" allowAny={true} textAny="TEXT_ANY_SECTION"
            value={state.section} onChange={this.handleChange} />
        </SearchFilterField>
      </Col>
      <Col md={6} lg={2}>
        <SearchFilterField titleKey="TEXT_KEY">
          <Input name="key" maxLength={100} value={state.key} onChange={this.handleChange} onBlur={this.handleKeyBlur} />
        </SearchFilterField>
      </Col>
      <Col md={6} lg={2}>
        <SearchFilterField titleKey="TEXT_CHANNEL">
          <LookupDropDown name="channel" lookupKey="LIST_ALERT_CHANNELS" value={state.channel}
            onChange={this.handleChange} />
        </SearchFilterField>
      </Col>
    </Row>
    );
  }

  validateCriteria(criteria: TemplateSearchCriteria): boolean {
    return (
      criteria.contextGroupId.length > 0 && criteria.culture.length > 0 &&
      criteria.section.length > 0 && criteria.channel.length > 0
    );
  }

  handleKeyBlur(event: any) {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value.toUpperCase() });
  }
}
