import React, { useState, useEffect } from "react";
import Header from "../templates/Header/Header";
import Slider from "react-slick";
import "./Index.scss";
import "../../App.scss";
import Property from "../../services/Properties";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Icon } from "semantic-ui-react";

const sliderRef = React.createRef();

const handlePrevClick = () => {
  sliderRef.current.slickPrev();
};

const handleNextClick = () => {
  sliderRef.current.slickNext();
};

const settings = {
  autoplay: false,
  dots: false,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const options = {
  prevArrow: <div className="custom-arrow"></div>,
  nextArrow: <div className="custom-arrow"></div>,
  dots: true,
  autoplay: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Index = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const propertyObj = new Property();
        const data = await propertyObj.list();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);
  return (
    <div className="Index" data-testid="Index">
      <Header />
      <section className="hero is-large is-primary custom-hero">
        <div class="hero-content">
          <div className="container has-text-centered">
            <h1 class="title">Find your Dream Home</h1>
            <h2 className="subtitle">Discover No. 1 Real Estate Hub</h2>
          </div>
        </div>
      </section>

      <div class="position-relative">
        <section className="search-bar">
          <div class="search-with-addon">
            <div class="input-icon">
              <input
                type="text"
                className="input-search"
                placeholder="Enter address eg. Street, city, state or zip"
              />
              <i className="fa fa-search"></i>
            </div>
          </div>
        </section>
      </div>

      {/* category section */}

      <section class="home-category">
        <div className="container">
          <div className="row d-flex gy-2 justify-content-center align-items-center w-100">
            <div className="col-12 col-md-4">
              <h3 class="text-bold">Looking For Something Specific?</h3>
            </div>
            <div className="col-6 col-md-2">
              <a className="category-box" href="#link">
                <i className="fa fa-building"></i>
                <p>Apartments</p>
              </a>
            </div>
            <div className="col-6 col-md-2">
              <a className="category-box" href="#link">
                <i className="fa fa-home"></i>
                <p>Houses</p>
              </a>
            </div>
            <div className="col-6 col-md-2">
              <a className="category-box" href="#link">
                <i className="fas fa-warehouse"></i>
                <p>Garages</p>
              </a>
            </div>
            <div className="col-6 col-md-2">
              <a className="category-box" href="#link">
                <i className="fas fa-store"></i>
                <p>Commercials</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* hot properties */}
      <section className="padding">
        <div className="container">
          <div className="row d-flex justify-content-between w-100 columns is-vcentered is-justify-content-between">
            <div className="col-md-4">
              <h2 class="text-bold">
                Hot <span class="text-primary">Properties</span>
              </h2>
            </div>

            <div className="col-md-3 ml-auto">
              <div className="has-text-right">
                <a href="#link">See all properties</a>
              </div>
            </div>
          </div>

          <Slider className="properties" ref={sliderRef} {...settings}>
            {properties
              .filter((property) => property.property_images.length > 0)
              .map((property) => (
                <div className="property-col" key={property.id}>
                  <div className="property-card">
                    <div className="label">{property.property_request}</div>

                    <div className="property-image-carousel">
                      <Slider className="property-image" {...options}>
                        {property.property_images.map((image, index) => (
                          <div className="property-slider" key={index}>
                            <img
                              alt={`Property ${index + 1}`}
                              src={`https://api.imbapano.com/${image.image_path}`}
                            />
                          </div>
                        ))}
                      </Slider>
                      <div class="property-agent">
                        <a href="#link">
                          <img
                            src={
                              property.avatar
                                ? `https://api.imbapano.com/${property.avatar}`
                                : "/assets/images/avatar.png"
                            }
                            alt="User Avatar"
                          />
                        </a>
                      </div>
                      <div class="details">
                        <div class="property-name">
                          <a href="details">{property.property_title} </a>
                        </div>
                        <div class="property-price">
                          <p>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(property.price)}
                          </p>
                        </div>
                      </div>

                      <div class="address">
                        <p>
                          <i class="fa fa-map-marker"></i> {property.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </Slider>

          <br />
          <div className="slider-arrows">
            <Button basic size="tiny" onClick={handlePrevClick}>
              <Icon name="angle left" />
            </Button>
            <Button basic size="tiny" onClick={handleNextClick}>
              <Icon name="angle right" />
            </Button>
          </div>
        </div>
      </section>
      
      <div class="mt-10"></div>
        <section class="padding">
        <div class="container">
            <div class="row d-flex justify-content-start w-100 columns">
              <div class="col-md-5">
                <h2 class="text-bold">
                    Most viewed and most popular <span class="text-primary">Places</span>
                </h2>
              </div>
            </div>
          </div>
          </section>

          <section class="padding">
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center w-100">
      <div class="col-md-7">
          <div class="text-center">
              <h2 class="text-bold">Find Landlord</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. </p>

              <div class="tags">
                  <a className="ui negative tiny round circular button active-tag" href="#any">Any</a>
                  <a className="ui basic tiny round circular button" href="#any">Interior Decorators</a>
                  <a className="ui basic tiny round circular button" href="#any">Interior Decorators</a>
                  <a className="ui basic tiny round circular button" href="#any">Architectures</a>
                  <a className="ui basic tiny round circular button" href="#any">Construction Workers</a>
              </div>
              <br />
              <section class="search-bar d-flex justify-content-center">
              <div class="search-with-addon">
                <div class="input-icon">
                  <input type="search" className="input-search" placeholder="Enter agent name" />
                  <i class="fa fa-search"></i>
                </div>
              </div>
            </section>
          </div>
      </div>
    </div>
  </div>
</section>

<section class="padding padding-bottom-20 bg-colored negative-space-45">
    

</section>
    </div>
  );
};

export default Index;
