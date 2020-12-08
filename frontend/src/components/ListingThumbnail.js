import React, { useEffect, useState } from "react";
import { NavLink } from "reactstrap";
import "../css/thumbnail.css";
import TimeLeft from "./TimeLeft";

const ListingThumbnail = (props) => {
  const [displayImage, setDisplayImage] = useState();
  const [isActive, setIsActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState();
  let interval = null;


  useEffect(() => {
    
    
    if (isActive) {
      interval = setInterval(() => {
        let distance = props.listing.endDate - new Date();
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);

          let time = null;
          if (days > 0) {
            time = days + " days left";
          } else if (hours > 0) {
            time = hours + "h " + minutes + "m " + seconds + "s";
          }else if(minutes>0){
            time = minutes + "m " + seconds + "s";
          }else if(seconds>0){
            time = seconds + "s";
          }else{
            setIsActive(false);
          }
          setTimeLeft(time);
      }, 500);
    }
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (props.listing.images[0]) {
      console.log(props.listing.images[0].filename);
      setDisplayImage(
        "/rest/v1/download/" + props.listing.images[0].filename
      );
    } else {
      let x = Math.random(1, 100);
      setDisplayImage("https://picsum.photos/300/200?random=" + x);
    }
  }, [props.listing]);

  return (
    <>
      <NavLink
        href={"/listing-details/" + props.listing.id}
        className="card card-1"
        style={{ padding: "2px" }}
      >
        <div className="card-img">
          <img src={displayImage} className="cardImage"></img>
        </div>
        <p style={{ margin: "0px" }} className="thumbnail-name">
          <strong>{props.listing.title}</strong>
        </p>
        <span className="myInline myAlignLeft" style={{ paddingRight: "10px" }}>
          {props.listing.startingBid} kr
        </span>
        <span className="myInline myAlignLeft">3 bud</span>
        {/* <span className="myInline myAlignRight">{timeLeft} </span> */}
        <TimeLeft {...props.listing} />
      </NavLink>
    </>
  );
};

export default ListingThumbnail;
