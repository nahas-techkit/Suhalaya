import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import "./pt.css"

export default function PrintComponent() {
  let componentRef = useRef();

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <ComponentToPrint ref={(el) => (componentRef = el)} />
      </div>
    </>
  );
}
class ComponentToPrint extends React.Component {
    render() {
      return (
        <div className="main">
          {/* <h2 style={{color: "green"}}>Suhayala</h2> */}
         <div className="pt">
            <div className="left">
            {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
            </div>
            <div className="center">
            <span>SUHAYALA </span>
            <span>Trip sheet </span>
            </div>
            <div className="right">
            {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
            </div>
         </div>

         <diV className="heading">
          <h1>Customer Details</h1>
         </diV>
         <div className="pt">
            <div className="left">
            <span>Booking Id : </span>
            <span>Customer Name :</span>
            </div>
            <div className="center2">
            <span>Phone Number :</span>
            <span>Location :</span>
          
            </div>
            <div className="right">
            {/* <span>Customer Name</span>
            <span>Customer Phone number</span> */}
            </div>
         </div>
         <diV className="heading">
          <h1>Trip Details</h1>
         </diV>


         <div className="pt">
            <div className="left">
            <span>Pickup Location :</span>
            <span>Drop Location :</span>
            <span>Extra Location :</span>
            <span>Date :</span>
            <span>Vehicle Type :</span>
            </div>
            <div className="center2">
            <span>Vehicle Model :</span>
            <span>Total Km :</span>
            <span>Extra Km :</span>
            <span>Expecting Time :</span>
            <span>Extra Hour :</span>
            </div>
            <div className="right">
            {/* <span>Customer Name</span>
            <span>Customer Phone number</span> */}
            </div>
         </div>
         <diV className="heading">
          <h1>Driver Details</h1>
         </diV>
         <div className="pt">
            <div className="left">
            <span>Driver Name :</span>
            <span>Phone number :</span>
            <span>Car No :</span>
            </div>
            <div className="center2">
            <span>Cost :</span>
            <span>Digital Sign : </span>
            </div>
            <div className="right">
            {/* <span>Customer Name</span>
            <span>Customer Phone number</span> */}
            </div>
         </div>

         <div className="pt3">
            <div className="left3">
            <span>Driver Sign :</span>
            </div>
            <div className="center3">
            <span>Customer Sign : </span>
            </div>
            <div className="right3">
            {/* <span>Customer Name</span>
            <span>Customer Phone number</span> */}
            </div>
         </div>
        
        </div>
      );
    }
  }