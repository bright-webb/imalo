// Preview.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Preview.scss';
import NavHeader from '../templates/Header/Header';
import Property from '../../services/Properties';
import { Label, Loader } from 'semantic-ui-react'
import { Container, Row, Col } from 'react-bootstrap';
import { APP_URL } from '../../utils/config';
import Fancybox from '../../utils/Fancybox';
import {Header, List, Icon, Divider, Button} from 'semantic-ui-react';
import  Helper from '../../utils/helper';
import LocationMap from '../../utils/map';

const Preview = () => {
  const [propertyData, setPropertyData] = useState(null);
  const [loading, setLoading] = useState(true);

  const helper = new Helper();
  useEffect(() => {
    console.log(localStorage.getItem('property_id'));
    const propertyInstance = new Property();
    const fetchData = async () => {
      try {
        const property_id = localStorage.getItem('property_id');
        
        // Set loading to true when starting the request
        setLoading(true);

        const data = await propertyInstance.getProperty(property_id);
        setPropertyData(data);

        // Set loading to false when the request is complete
        setLoading(false);
      } catch (error) {
        console.error('Error fetching property:', error.message);

        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  
  return (
    <div className="Preview" data-testid="Preview">
      <NavHeader />
      
      <Container style={{marginTop: '20px'}}>
       
        {loading && <Loader active inline='centered' />}
        
        
        {!loading && propertyData && (
          <Row className="d-flex justify-content-center">
            <Col md="12">
              <Row>
                <Col md="6">
                  <Header as="h1">{helper.capitalize(propertyData.property_title)}</Header>
                  
                  <div>
                  <List divided horizontal>
                  <List.Item>
                      {propertyData.property_category === 'Hotel' ? (
                        <Icon name="hotel" /> 
                      ) : (
                        <Icon name="home" /> 
                      )}
                      <span> {propertyData.property_category}</span> 
                    </List.Item>
                    <List.Item><Icon name="map marker alternate" /> <span> {propertyData.address}, {propertyData.province}</span> </List.Item>
                  </List>
                  </div>
                  <br />
                  <p>
                    <Label>{propertyData.property_request}</Label>
                  </p>
                  <br />
                </Col>
              </Row>
            <Fancybox options={{
                        Carousel: {
                          infinite: false,
                          transition: "slide",
                          Panzoom: {
                            decelFriction: 0.5,
                          },
                        },
                        
                        Toolbar: {
                          display: {
                            left: ["infobar"],
                            middle: [
                              "zoomIn",
                              "zoomOut",
                              "toggle1to1",
                              "rotateCCW",
                              "rotateCW",
                              "flipX",
                              "flipY",
                            ],
                            right: ["slideshow", "thumbs", "close"],
                          },
                        },
                      }}>
              <div className="grid-container">
              {propertyData.images.length > 0 && (
              <div className="grid">
                  {propertyData.images.length >= 5
                  ?
                  
                    <>
                        <a href={`${APP_URL}/${propertyData.images[0].image_path}`} data-fancybox="gallery" className="grid-item large-item f-panzoom" id="myPanzoom">
                          <img src={`${APP_URL}/${propertyData.images[0].image_path}`} alt={`Property `} />
                        </a>
                      <a href={`${APP_URL}/${propertyData.images[1].image_path}`} data-fancybox="gallery" className="grid-item">
                        <img src={`${APP_URL}/${propertyData.images[1].image_path}`} alt={`Property `} />
                      </a>
                      <a href={`${APP_URL}/${propertyData.images[2].image_path}`} data-fancybox="gallery" className="grid-item">
                        <img src={`${APP_URL}/${propertyData.images[2].image_path}`} alt={`Property `} />
                      </a>
                      <a href={`${APP_URL}/${propertyData.images[3].image_path}`} data-fancybox="gallery" className="grid-item">
                        <img src={`${APP_URL}/${propertyData.images[3].image_path}`} alt={`Property `} />
                      </a>
                      <div className="grid-item">
                        <div className="overlay-item">
                        <a className="overlay" href={`${APP_URL}/${propertyData.images[4].image_path}`} data-fancybox="gallery">
                          <div>+ {propertyData.images.slice(4).length}</div>
                        </a>
                        {propertyData.images.slice(4).map((image, index) => (
                          <a key={index} href={`${APP_URL}/${image.image_path}`} data-fancybox="gallery">
                            <img src={`${APP_URL}/${image.image_path}`} alt={`Property `} />
                          </a>
                        ))}
                         
                      </div>
                    </div>
                    
                    </>
                
                  :
                 
                    <>
                    <a href={`${APP_URL}/${propertyData.images[0].image_path}`} data-fancybox="gallery" className="grid-item f-panzoom" id="myPanzoom">
                      <img src={`${APP_URL}/${propertyData.images[0].image_path}`} alt={`Property `} />
                    </a>
                  <a href={`${APP_URL}/${propertyData.images[1].image_path}`} data-fancybox="gallery" className="grid-item">
                    <img src={`${APP_URL}/${propertyData.images[1].image_path}`} alt={`Property `} />
                  </a>
                  <a href={`${APP_URL}/${propertyData.images[2].image_path}`} data-fancybox="gallery" className="grid-item">
                    <img src={`${APP_URL}/${propertyData.images[2].image_path}`} alt={`Property `} />
                  </a>
                 
                  
                 
                </>
                  }
              </div>
              )}

              </div>
              </Fancybox>
              <br />
              <Row>
                  <Col md="7">
                     <p>{propertyData.property_description}</p>
                     <div className="map">
                      <LocationMap propertyData={propertyData} />
                     </div>
                  </Col>
                  <Col md="5">
                    <div className="box">
                        <Header as="h3" className="text-red">{helper.toCurrency(parseFloat(propertyData.price, 2))}</Header>
                        <Divider />
                        <Header as="h4">Contact Information</Header>
                        <p>{propertyData.phone_number}</p>
                        <Divider />
                        <Link to="/account/properties">
                          <Button negative className="w-100">Go to account</Button>
                        </Link>
                    </div>
                  </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Preview;

