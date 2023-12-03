import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyImageSlider = ({ images }) => {
  const imageSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...imageSliderSettings}>
      {images.map((image, index) => (
        <div key={index}>
          <img src={image.image_path} alt={`Property ${index + 1}`} />
        </div>
      ))}
    </Slider>
  );
};

const FeaturedPropertyCard = ({ property }) => {
  return (
    <div className="featured-property-card">
      <PropertyImageSlider images={property.property_images} />
      <div className="property-details">
        <h3>{property.property_title}</h3>
        <p>Price: ${property.price}</p>
        <p>Category: {property.property_category}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
};

const FeaturedPropertiesSlider = ({ featuredProperties }) => {
  const mainSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 properties at a time
    slidesToScroll: 1,
  };

  return (
    <Slider {...mainSliderSettings}>
      {featuredProperties.map((property, index) => (
        <FeaturedPropertyCard key={index} property={property} />
      ))}
    </Slider>
  );
};

export default FeaturedPropertiesSlider;
