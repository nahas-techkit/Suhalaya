import React, { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import "./sign.css";
import { Box, Button, Stack } from "@mui/material";

function Signpad({ onSave, disabled, file }) {
  let sigPad = useRef({});
  let data = "";
  const [viewBtn, setBtn] = useState(true);

  function clear() {
    sigPad.current.clear();
  }
  function save() {
    const canvas = sigPad.current.getCanvas();
    canvas.toBlob((blob) => {
      console.log(blob);
      onSave?.(blob);
    });
    setBtn(false);
  }
  function show() {
    sigPad.current.fromDataURL(data);
  }
  if (disabled) return null;

  return (
    <div>
      <Box>
        <SignaturePad
          ref={sigPad}
          canvasProps={{
            style: {
              border: viewBtn ? "2px solid black" : "none",
              maxWidth: 312,
              maxHeight: 162,
              minHeight: 120,
            },
          }}
          penColor={viewBtn ? "green" : "transparent"}
        />
      </Box>
      {viewBtn && (
        <Stack spacing={1} direction="row">
          <Button size="small" variant="contained" onClick={clear}>
            Clear
          </Button>
          <Button size="small" variant="contained" onClick={save}>
            Save
          </Button>
          {/* <button onClick={show}>Show</button> */}
        </Stack>
      )}
    </div>
  );
}

export default Signpad;
