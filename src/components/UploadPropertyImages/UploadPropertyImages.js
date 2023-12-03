import React from 'react';
import './UploadPropertyImages.scss';
import NavHeader from "../templates/Header/Header";
import { Header, Divider } from 'semantic-ui-react';
import { Row, Container, Col } from 'react-bootstrap';
import DropzoneFileUpload from '../../utils/Dropzone';

const UploadPropertyImages = () => {
  const propertyData = JSON.parse(localStorage.getItem('propertyData'));

  return (
  <div className="UploadPropertyImages" data-testid="UploadPropertyImages">
    <NavHeader />

    <Container>
      <Row className="d-flex justify-content-center vh-100 align-items-center">
        <Col md="6">
          <Header as="h2">{propertyData.property_title}</Header>
          <Header.Subheader>{propertyData.property_category} | {propertyData.property_request}</Header.Subheader>
          <Divider />
          <Header as="h4">Upload Photos</Header>
          <DropzoneFileUpload />
        </Col>
      </Row>
    </Container>
  </div>
)
};


export default UploadPropertyImages;
