import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router";
import { Card, Button, Form, Row, Col, Label, Input, FormGroup } from "reactstrap";
import ListingContextProvider from "../contexts/ListingContextProvider";
import "../stylings/Listings.css";

const ListingUpload = (props) => {
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);
  const [reservedPrice, setReservedPrice] = useState([]);
  const [image, setImage] = useState([]);
  const [startingBid, setStartingBid] = useState([]);
  const [numberOfDays, setNumberOfDays] = useState();
  const [file, setFile] = useState();
  const [picture, setPicture] = useState({});

  const uploadPicture = e => {
    setImage(e.target.value)
    setPicture({
      
      /* contains the preview, if you want to show the picture to the user
           you can access it with this.state.currentPicture
       */
      picturePreview: URL.createObjectURL(e.target.files[0]),
      /* this contains the file we want to send */
      pictureAsFile: e.target.files[0]
    });
  };

 // const {appendListing} = useContext(ListingContextProvider);

 const secondstringtest = async event => {
   event.preventDefault();
   let endDate = Date.now() + numberOfDays * 24 * 60 * 60 * 1000;

   const credentials = {
    title: title,
    description: description,
    reservedPrice: reservedPrice,
    startingBid: startingBid,
    endDate: endDate,
  };


  const myjson = JSON.stringify(credentials);
  const blob = new Blob([myjson], {
    type: 'application/json'
    });
   const formData = new FormData();

   formData.append('listing', blob);
   formData.append("images", picture.pictureAsFile);

   const data = await fetch("http://localhost:4037/rest/v1/listings/tripple", {
    method: "post",
    //headers: { "Content-Type": "multipart/form-data" },
    body: formData
  });
  const uploadedImage = await data.json();
  if (uploadedImage) {
    console.log("Successfully uploaded image");
  } else {
    console.log("Error Found");
  }
 }

   const submitListing = async (e) => {
    let endDate = Date.now() + numberOfDays * 24 * 60 * 60 * 1000;
    
    // )
    //   .toISOString()
    //   .replace(/T/, " ")
    //   .replace(/\..+/, "");

    console.log(endDate);

    const credentials = {
      title: title,
      description: description,
      reservedPrice: reservedPrice,
      startingBid: startingBid,
      endDate: endDate,
    };

    console.log(credentials);
    let response = await fetch("/rest/v1/listings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    try {
      response = await response.json();
    } catch {
      console.log("Bad credentials");
    }
  };
  
  // useEffect(() => {


  //   console.log(days);
  // }, []);
  // const selectOptions = days.map((day) => <option key={day.toString()}>{day}</option>);
  const optionsArray = () => {
    const days = [];
        for (var i = 1; i <= 31; i++) {
          days.push(
            <option key={i} value={i}>
              {i}
            </option>
          );
        }
        return days;
  }


  return (
    <div id="listings-div">
      <Card id="listing-upload">
        <Form id="listing-form">
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="item-image-upload">Upload Image</Label>
                <Input
                  type="file"
                  name="file"
                  id="item-image-upload"
                  multiple
                  value={image}
                  onChange={uploadPicture}
                  //onChange={(e) => fileSelectHandler(e)}
                  //onChange={(e) => fileSelectHandler(e)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="starting-price-input">Starting price</Label>
                <Input
                  id="starting-price-input"
                  value={startingBid}
                  onChange={(e) => setStartingBid(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="title-input">Title</Label>
                <Input
                  id="title-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="reservation-price-input">Reservation price</Label>
                <Input
                  id="reservation-price-input"
                  value={reservedPrice}
                  onChange={(e) => setReservedPrice(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="description-text">Item Description</Label>
            <Input
              type="textarea"
              name="text"
              id="description-text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="end-time-select">Choose end time</Label>
            <Input
            type="select"
              id="end-time-select"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
            >
              {optionsArray()}
            </Input>
          </FormGroup>
          <Button color="primary" onClick={secondstringtest}>
            Upload Listing
          </Button>
        </Form>
      </Card>
    </div>
  );
};
export default withRouter(ListingUpload);
//onClick={submitListing}>
