import React, { Component } from "react";

export class Footer extends Component {
  render() {
    return (
      <>
        <div className="container-fluid footer-container">
          <div className="footer-card mt-5 mx-5">
            <div className="row mb-4 ">
              <div className="col-md-4 col-sm-11 col-xs-11">
                <div className="footer-text pull-left">
                  <div className="d-flex">
                    <h1
                      className="footer-brand font-weight-bold mr-2 px-3"
                    >
                      IO
                    </h1>
                    <h1 className="footer-logo">Devs</h1>
                  </div>
                  <p className="card-text">
                    This is a Analytics dashboard for IoTube developed for the community 
                  </p>
                  <div className="social mt-2 mb-3">
                        {/* social network links could be added later */}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-4 col-xs-4" style={{textAlign: 'end'}}>
                <h5 className="heading">IoTube</h5>
                <ul className="card-text">
                  <li>GitHub</li>
                </ul>
              </div>
            </div>
            <div className="divider mb-4"> </div>
            <div className="row" style={{fontSize: '10px'}}>
              <div className="col-md-6 col-sm-6 col-xs-6">
                <div className="pull-left">
                  <p>
                    <i className="fa fa-copyright"></i> 2021 IoTube Dashboard
                  </p>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6">
                <div className="pull-right mr-4 d-flex policy">
                  {/* some other link could be added here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
