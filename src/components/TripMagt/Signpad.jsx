import React,{useRef, useState} from 'react'
import SignaturePad from "react-signature-canvas"
import "./sign.css"

function Signpad() {
    let sigPad = useRef({});
    let data = "";
    const [viewBtn, setBtn]=useState(true)

    function clear(){
        sigPad.current.clear();
    }
    function save(){
        data=sigPad.current.toDataURL();
        setBtn(false)
    }
    function show(){
        sigPad.current.fromDataURL(data);
    }

  return (
    <div  >
        
        <div className='sign'>
        <SignaturePad
        ref={sigPad}
        penColor="green"/>
        </div>
        {
         viewBtn &&   <>
            <button onClick={clear}>Clear</button>
        <button onClick={save}>Save</button>
        {/* <button onClick={show}>Show</button> */}
            </>
        }
    </div>
  )
}

export default Signpad