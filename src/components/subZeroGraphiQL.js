/* eslint-disable */
import React, { PropTypes } from 'react';
import { GraphiQL } from './GraphiQL';
export class subZeroGraphiQL extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth_token: null,
      schema_type: props.schema_type
    };
    this._onAuthTokenChange = this._onAuthTokenChange.bind(this)
    this._onSchemaTypeChange = this._onSchemaTypeChange.bind(this)
    this._fetcher = this._fetcher.bind(this)
  }

  _fetcher(graphQLParams) {
    graphQLParams.auth_token = this.state.auth_token
    graphQLParams.schema_type = this.state.schema_type
    return this.props.fetcher(graphQLParams)
  }

  _onAuthTokenChange(e) {
    this.setState({auth_token: e.target.value});
  }
  _onSchemaTypeChange(e) {
    this.setState({schema_type: e.target.value});
    if (this.props.onSchemaTypeChange) {
      this.props.onSchemaTypeChange(e.target.value);
    }
  }

  handleClickPrettifyButton(event) {
    const editor = this.graphiql.getQueryEditor();
    const currentText = editor.getValue();
    const { parse, print } = require('graphql');
    const prettyText = print(parse(currentText));
    editor.setValue(prettyText);
  }

  render() {
    return (
      <GraphiQL
        ref={c => { this.graphiql = c; }}
        state={this.state} 
        fetcher={this._fetcher}
        query={this.props.query}
        variables={this.props.variables}
        operationName={this.props.operationName}
        onEditQuery={this.props.onEditQuery}
        onEditVariables={this.props.onEditVariables}
        onEditOperationName={this.props.onEditOperationName}
        onToggleDocs={this.props.onToggleDocs}>
        <GraphiQL.Toolbar>
          <GraphiQL.Button
            onClick={this.handleClickPrettifyButton}
            label="Prettify"
            title="Prettify Query"
          />
          <select onChange={this._onSchemaTypeChange} value={this.state.schema_type}>
            <option value="simple">Simple Schema</option>
            <option value="relay">Relay Schema</option>
          </select>
          <input className="auth-token" onChange={this._onAuthTokenChange} value={this.state.auth_token} placeholder="JWT value" />
        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
}