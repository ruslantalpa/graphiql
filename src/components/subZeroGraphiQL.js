/* eslint-disable */
import React, { PropTypes } from 'react';
import { GraphiQL } from './GraphiQL';
export class subZeroGraphiQL extends React.Component {
  constructor(props) {
    super();
    this.state = {
      auth_token: null,
      schema_type: 'simple'
    };
    this._onAuthTokenChange = this._onAuthTokenChange.bind(this)
    this._fetcher = this._fetcher.bind(this)
  }

  _fetcher(graphQLParams) {
    graphQLParams.auth_token = this.state.auth_token
    return this.props.fetcher(graphQLParams)
  }

  _onAuthTokenChange(e) {
    this.setState({auth_token: e.target.value});
  }
  _onSchemaTypeChange(e) {
    this.setState({schema_type: e.target.value});
    this._fetchSchema();
  }

  render() {
    return (
      <GraphiQL 
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
          <select onChange={this._onSchemaTypeChange} value={this.state.schema_type}>
            <option value="simple">Simple Schema</option>
            <option value="relay">Relay Schema</option>
          </select>
          <input onChange={this._onAuthTokenChange} value={this.state.auth_token} placeholder="JWT value" />
        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
}