import React,{Component} from 'react'
import { ReactToPrint } from 'react-to-print'

const Tripsheet = () => {
  return (
    <div>
        <ReactToPrint
        trigger={()=>{
         

            return<button>Print</button>
        }}
        content= {()=>this.componentRef}
        documentTitle="new document"
        pageStyle="print"
        
        />

       <div ref={el=>(this.componentRef=el)}>
        <h1>Suhayala travels</h1>
        <p>Address:</p><p>Phone Number:</p>
        <div>
        <h2 style={{color: "green"}}>Suhayala travels</h2>
        <table>
          <thead>
            <th>Customer Name</th>
            <th>Customer Phone Number</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Extra Location</th>
            <th>Date</th>
            <th>Vehicle Type</th>
            <th>Vehicle Model</th>
            <th>Total Kms</th>
            <th>Extra Kms</th>
            <th>Expecting Time</th>
            <th>Extra Hour</th>

          </thead>
          
          <tbody>
            <tr>
              <td>saman</td>
              <td>Njoku Samson</td>
              <td>samson@yahoo.com</td>
            </tr>
        
          </tbody>
        </table>
      </div>
    </div>
    </div>


    // <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
    // <div className="p-4" id="print">
    //   <h1 className="text-center text-lg font-bold text-gray-900">
    //     suhayala
    //   </h1>
    //   <div className="mt-6">
    //     <div className="mb-4 grid grid-cols-2">
    //       <span className="font-bold">Customer Name:</span>
    //       <span>{invoiceInfo.invoiceNumber}</span>
    //       <span className="font-bold">Customer Phone Number:</span>
    //       <span>{invoiceInfo.cashierName}</span>
    //       <span className="font-bold">Pickup Location:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Drop Location:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Extra Location:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Date:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Vehicle Type:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Vehicle Model:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Total Kms:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Extra Kms:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Expecting Time:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Extra Hour:</span>
    //       <span>{invoiceInfo.customerName}</span>
          
    //       <Divider></Divider>

    //       <div><h2>Driver Details</h2></div>
    //       <span className="font-bold">Driver Name:</span>
    //       <span>{invoiceInfo.customerName}</span>
    //       <span className="font-bold">Car No:</span>
    //       <span>{invoiceInfo.cashierName}</span>
    //       <span className="font-bold">Cost:</span>
    //       <span>{invoiceInfo.cashierName}</span>
    //       <span className="font-bold">Digital Sign:</span>
    //       <span>{invoiceInfo.cashierName}</span>
    //     </div>
    //     </div>
    //     </div>
    //     </div>
    

  )
}

export default Tripsheet
