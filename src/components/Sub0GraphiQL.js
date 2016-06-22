import React, { PropTypes } from 'react';
import { GraphiQL } from './GraphiQL';
export class Sub0GraphiQL extends React.Component {
  constructor(props) {
    super();
    this.state = {
      // REQUIRED:
      // `fetcher` must be provided in order for GraphiQL to operate
      //fetcher: this.props.fetcher,
      //fetcher: this._fetcher,

      // OPTIONAL PARAMETERS
      // GraphQL artifacts
      // query: '',
      // variables: '',
      // response: '',

      // GraphQL Schema
      // If `undefined` is provided, an introspection query is executed
      // using the fetcher.
      // schema: undefined,


      // Useful to determine which operation to run
      // when there are multiple of them.
      // operationName: null,
      // storage: null,
      // defaultQuery: null,

      // Custom Event Handlers
      // onEditQuery: null,
      // onEditVariables: null,
      // onEditOperationName: null,

      // GraphiQL automatically fills in leaf nodes when the query
      // does not provide them. Change this if your GraphQL Definitions
      // should behave differently than what's defined here:
      // (https://github.com/graphql/graphiql/blob/master/src/utility/fillLeafs.js#L75)
      // getDefaultFieldNames: null
      auth_token: null
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
          <input onChange={this._onAuthTokenChange} value={this.state.auth_token} placeholder="JWT value" />
        </GraphiQL.Toolbar>
      </GraphiQL>
    );
  }
}