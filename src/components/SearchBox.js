import React, { Component } from "react";
import { Form, FormControl, Button } from "react-bootstrap";

export class SearchBox extends Component {
  render() {
    return (
      <>
        <div className="row search-box-container">          
          <h2 style={{color:'white'}}>Iotube Dashboard</h2>
          <Form className="search-form" inline>
            <FormControl type="text" placeholder="Search" className="mr-2 search-input" />
            <Button variant="outline-dark">Search</Button>
          </Form>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
       
      </>
    );
  }
}

export default SearchBox;
