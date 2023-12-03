import React from 'react';
import './DownloadApp.scss';
import { Container} from 'semantic-ui-react';
import { Row, Col } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import NavHeader from '../templates/Header/Header';

const DownloadApp = () => (
  <div className="DownloadApp" data-testid="DownloadApp">
    <NavHeader />
    <section className="texture">
    <Container style={{ marginTop: "20px" }}>
      <Row className="d-flex align-items-center vh-100" style={{position: 'relative'}}>
          <Col md="4">
            <h1 className="text-light text-bold">
              Download the Imba Pano App Now
            </h1>
            <p className="text-light">Lorem Ipsium donor dhdhh dk hjdg gfg f guf gf g</p>
            <Row className="gy-3">
               <Col md="6">
                <div className="app">
                  <img alt="android app" src="./assets/images/icon/playstore.png" style={{borderRadius: '10px'}} />
                </div>
               </Col>
               <Col md="6">
                <div className="app">
                  <img alt="IOS app" src="./assets/images/icon/applestore.png" style={{borderRadius: '10px'}} />
                </div>
               </Col>
            </Row>
          </Col>

          <Col md="8" className="d-flex align-items-end" style={{position: 'absolute', bottom: '0', right: '0'}}>
              <div className="grouped-img">
                <img alt="grouped images" src="./assets/images/group2.png" />
              </div>
          </Col>
      </Row>
    </Container>
    </section>
  </div>
);


export default DownloadApp;
