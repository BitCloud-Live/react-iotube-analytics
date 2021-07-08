import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { Context } from '../reducer/Store';

export class SearchBox extends Component {

  static contextType = Context;

  onChangeBridge(e) {
    const [, dispatch] = this.context;
    dispatch({ type: e.target.value, payload: [] });
    console.log(e.target.value);

  }

  render() {
    return (
      <>
        <div className="row search-box-container">
          <h2 style={{ color: "white", textAlign: 'center' }}>Iotube Dashboard</h2>
          <Form className="search-form">
            <Form.Control style={{ width: '40%', textAlign: 'center', minHeight: '2.5rem' }} as="select" size="lg" custom onChange={this.onChangeBridge.bind(this)}>
              <option value='USE_ETHEREUM'>Ethereum</option>
              <option value='USE_POLYGON'>Polygon</option>
              <option value='USE_BSC'>BSC</option>
            </Form.Control>
            {/* <Button onClick={this.handleBridgeChange} variant="outline-dark">Change</Button> */}
          </Form>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      </>
    );
  }
}

export default SearchBox;
