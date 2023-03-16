import { Divider } from "@mui/material";
import { padding } from "@mui/system";
import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import ReactToPrint from "react-to-print";
import "./Tripsheet.css"

export default function PrintComponent() {
    let componentRef = useRef();

    return (
        <>
            <div>
                {/* button to trigger printing of target component */}
                <ReactToPrint
                    trigger={() => <Button variant="success">Success</Button>}
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
            <div className="invoice" style={{ color: "black " }}>
                <div className="head">
               
                <div className="left">
                <span>Name</span>
                <span>Email</span>
                <span>Number</span>
                </div>
                
                <div className="center">
                 <span>SUHALAYA</span>
                <span>Tripsheet</span>
                </div>
                
                 
                <div className="right">
                 <span>Name No</span>
                 <span>Tripsheet No</span>
                <span>Date</span>
                </div>
                
                </div>

                <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                    <div className="p-4" id="print">
                        <div className="mt-6 print">
                            <div className="mb-4 grid grid-cols-2 print">
                                <span className="font-bold">Customer Name:</span>
                                {/* <span>{invoiceInfo.invoiceNumber}</span> */}
                                <span className="font-bold">Customer Phone Number:</span>
                                {/* <span>{invoiceInfo.cashierName}</span> */}
                                <span className="font-bold">Pickup Location:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Drop Location:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Extra Location:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Date:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Vehicle Type:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Vehicle Model:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Total Kms:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Extra Kms:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Expecting Time:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Extra Hour:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}



                                <div><h2>Driver Details</h2></div>
                                <span className="font-bold">Driver Name:</span>
                                {/* <span>{invoiceInfo.customerName}</span> */}
                                <span className="font-bold">Car No:</span>
                                {/* <span>{invoiceInfo.cashierName}</span> */}
                                <span className="font-bold">Cost:</span>
                                {/* <span>{invoiceInfo.cashierName}</span> */}
                                <span className="font-bold">Digital Sign:</span>
                                {/* <span>{invoiceInfo.cashierName}</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}