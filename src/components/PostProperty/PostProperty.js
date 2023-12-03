import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PostProperty.scss";
import { useDropzone } from "react-dropzone";
import NavHeader from "../templates/Header/Header";
import {
  Container,
  Header,
  Form,
  Select,
  Label,
  Checkbox,
  List,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const DropzoneFileUpload = ({ onFilesChange }) => {
  // state variables
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
      onFilesChange((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
    [onFilesChange]
  );

  const removeFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Only allow image files
  });

  // handle form data
  /* form data */
  const [formData, setFormData] = useState({
    propertyTitle: "",
    propertyRequest: "",
    category: "",
    price: "",
    distressSale: "",
    description: "",
    address: "",
    province: "",
    phoneNumber: "",
    features: {
      bedroom: false,
      parlor: false,
      kitchen: false,
      toilet: false,
      waterHeader: false,
      tightSecurity: false,
    },
  });

  const handleCheckboxChange = (feature) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      features: {
        ...prevFormData.features,
        [feature]: !prevFormData.features[feature],
      },
    }));
  };

  const handleInputChange = (e, { name, value }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // select options
  const category = [
    { key: "land", text: "Land", value: "land" },
    { key: "office", text: "Office", value: "office" },
    { key: "warehouse", text: "Warehouse", value: "warehouse" },
    { key: "hotel", text: "Hotel", value: "Hotel" },
    {
      key: "serviced_apartment",
      text: "Serviced Apartment",
      value: "Serviced Apartment",
    },
    { key: "flat", text: "Flat", value: "Flat" },
    { key: "duplex", text: "Duplex", value: "Duplex" },
  ];

  const request = [
    { key: "for sale", text: "For Sale", value: "for sale" },
    { key: "for rent", text: "For Rent", value: "for rent" },
  ];

  const distress_sale = [
    { key: "no", text: "No", value: "no" },
    { key: "yes", text: "Yes", value: "yes" },
  ];

  // handle google map select
  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      // Extract province from address components
      const addressComponents = results[0].address_components;
      const province = addressComponents.find((component) =>
        component.types.includes("administrative_area_level_1")
      );

      setLocation(latLng);
      setAddress(selectedAddress);
      setLocation({
        lat: latLng.lat,
        lng: latLng.lng,
        province: province?.long_name || "",
      });

      // Update the formData with the selected address and province
      setFormData((prevFormData) => ({
        ...prevFormData,
        address: selectedAddress,
        province: province?.long_name || "",
      }));
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const handleChange = (newAddress) => {
    // store the selected address in a state
    setAddress(newAddress);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);
  const token = localStorage.getItem("token");
  const handleUpload = () => {
    setLoading(true);
    const url = "https://api.imbapano.com/api/new/property";
    const data = new FormData();
    let file = files[0];
    files.forEach((file, index) => {
      data.append(`files[]`, file);
    });
    data.append("file", file);
    data.append("propertyTitle", formData.propertyTitle);
    data.append("propertyRequest", formData.propertyRequest);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("distressSale", formData.distressSale);
    data.append("description", formData.description);
    data.append("province", formData.province);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("address", formData.address);
    Object.keys(formData.features).forEach((key) => {
      data.append(`features[]`, formData.features[key]);
      console.log(formData.features[key]);
    });;

    
  
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status_code === 201) {
          localStorage.setItem('property_id', data.property_id);
          navigate("/preview");
        } else {
          setLoading(false);
          setError("There was an error, please try again");
        }
        setLoading(false);
        setError(data.message);
      });
  };

  return (
    <div>
      <Container style={{ marginTop: "20px" }}>
        <Row className="d-flex justify-content-center">
          <Col md="6">
            <Header as="h4">
              <Header.Content>
                Sell or Rent your property
                <Divider />
                <Header.Subheader>
                  Everything you need to sell and rent your property. We are
                  here to help you every step of the way
                </Header.Subheader>
              </Header.Content>
            </Header>

            <Form onSubmit={handleUpload} style={{ paddingBottom: "20px" }}>
              <Form.Group>
                <Form.Input
                  label="Property Title"
                  placeholder="2 Bedroom apartment"
                  name="propertyTitle"
                  className="w-100"
                  value={formData.propertyTitle}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group unstackable widths={2}>
                <Form.Input
                  label="Property Request"
                  control={Select}
                  placeholder="is property for sale"
                  options={request}
                  name="propertyRequest"
                  value={formData.propertyRequest}
                  onChange={handleInputChange}
                  required
                />
                <Form.Input
                  control={Select}
                  label="Category"
                  placeholder="Category"
                  name="category"
                  options={category}
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group widths={2}>
                <Form.Input
                  labelPosition="right"
                  type="number"
                  label="Price"
                  name="price"
                  placeholder="Price"
                  className="w-100"
                  style={{
                    borderRight: "1px solid #ddd",
                    borderRightTopRadius: "5px",
                  }}
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                >
                  <Label basic>$</Label>
                  <input style={{ borderRight: "1px solid #ddd !important" }} />
                </Form.Input>

                <Form.Input
                  control={Select}
                  label="Distress Sale"
                  placeholder="Distress Sale"
                  name="distressSale"
                  options={distress_sale}
                  value={formData.distressSale}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Header as="h4">Features</Header>
              <Divider />
              <Form.Group width={4}>
                {Object.keys(formData.features).map((feature) => (
                  <Form.Input
                    key={feature}
                    control={Checkbox}
                    label={feature}
                    checked={formData.features[feature]}
                    onChange={() => handleCheckboxChange(feature)}
                  />
                ))}
              </Form.Group>

              <Header as="h4">More Information</Header>
              <Form.TextArea
                label="Description"
                placeholder="More description..."
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <Header as="h4">Location</Header>

              <PlacesAutocomplete
                value={address}
                onChange={handleChange}
                onSelect={handleSelect}
                searchOptions={{
                  types: ["address"],
                }}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: "Search Address ...",
                        className: "w-100",
                      })}
                    />
                    <List divided relaxed>
                      {loading && <List.Item>Loading...</List.Item>}
                      {suggestions.map((suggestion) => (
                        <List.Item
                          {...getSuggestionItemProps(suggestion, {
                            onClick: () => handleSelect(suggestion.description),
                          })}
                        >
                          <List.Content>
                            <List.Header style={{ cursor: "pointer" }}>
                              {suggestion.description}
                            </List.Header>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  </div>
                )}
              </PlacesAutocomplete>
              {location.lat !== 0 && location.lng !== 0 && (
                <MapComponent
                  containerElement={<div style={{ height: "300px" }} />}
                  mapElement={<div style={{ height: "100%" }} />}
                  location={location}
                />
              )}

              <Form.Input
                type="text"
                label="Province"
                placeholder="Province"
                className="w-100"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                required
              />

              <Header as="h4">Contact</Header>
              <Form.Input
                type="number"
                label="Phone Number"
                placeholder="Phone Number"
                className="w-100"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
              <Header as="h4">Gallery</Header>
              <div {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {files.length > 0 && (
                <div>
                  <div style={thumbnailContainerStyles}>
                    {files.map((file, index) => (
                      <div key={file.name} style={thumbnailStyles}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <button
                          onClick={() => removeFile(index)}
                          style={removeButtonStyles}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {error && (
                <Message negative style={{ width: "100%" }}>
                  <Message.Header>Error</Message.Header>
                  <p>{error}</p>
                </Message>
              )}

              <Button type="submit" primary loading={loading} className="w-100">
                Submit Property
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const dropzoneStyles = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginBottom: "20px",
};

const thumbnailContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: "10px",
};

const thumbnailStyles = {
  position: "relative",
  width: "80px",
  height: "80px",
  marginRight: "10px",
  marginBottom: "10px",
  overflow: "hidden",
  borderRadius: "4px",
  boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
};

const removeButtonStyles = {
  position: "absolute",
  top: "5px",
  right: "5px",
  padding: "5px",
  background: "#fff",
  color: "#ff0000",
  border: "1px solid #ff0000",
  borderRadius: "4px",
  cursor: "pointer",
};

const MapComponent = withGoogleMap(({ location }) => (
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: location.lat, lng: location.lng }}
  >
    <Marker position={{ lat: location.lat, lng: location.lng }} />
  </GoogleMap>
));
const PostProperty = () => {
  return (
    <div className="PostProperty" data-testid="PostProperty">
      <NavHeader />

      <DropzoneFileUpload />
    </div>
  );
};

export default PostProperty;
