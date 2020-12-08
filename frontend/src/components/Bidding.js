import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Card, CardText } from "reactstrap";
import "../css/ListingDetails.css";
import TimeLeft from "./TimeLeft";
import { ListingContext } from "../contexts/ListingContextProvider";
import { SignalCellularNull } from "@material-ui/icons";

const Bidding = (props) => {
  const listingContext = useContext(ListingContext);
  const [amount, setAmount] = useState("");
  const [listingBids, setListingBids] = useState([]);
  const [highestBid, setHighestBid] = useState(SignalCellularNull);
  
  useEffect(()=>{
    console.log(props)
    fetchData();
  },[]);

    async function fetchData() {
      setListingBids(await listingContext.getBidsFromListing(props.id));
      setHighestBid(listingBids[0].amount);
    }


  const createBid = async event => {

    let timestamp = Date.now(); 
    let listingId = props.id;

   event.preventDefault();
     const credentials = {
       listingId: listingId,
       amount: amount,
       timestamp: timestamp
     };

     console.log(credentials);
        let response = await fetch(
          "/rest/v1/listings/bids",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        console.log(response);
        try {
          response = await response.json();
        } catch(err) {
          console.log("Bad credentials ", err);
        }
    }

  return (
    <div className="payment-block">
      <div className="starting-price">
        <p className="payment-cursive-text">Highest bid</p>
        <p className="payment-regular-text">{highestBid} kr</p>
      </div>
      <div className="end-time">
        <p className="payment-cursive-text"> Ends</p>
        <TimeLeft {...props} />
      </div>
      <div className="bids">
        <p className="payment-cursive-text">Bids</p>
        <p className="payment-regular-text">bids {"0"}</p>
      </div>
      <div className="payment-component">
        <div className="payment-box">
          <label id="bidding-label">Place bid</label>
          <input
            type="text"
            id="bidding-input"
            placeholder="kr"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          ></input>
        </div>
        <button onClick={createBid}>Submit</button>
      </div>
    </div>
  );
}

export default Bidding; 