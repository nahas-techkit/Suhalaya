import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Header from "../../components/Header";

import React from "react";

function adddept() {
  return (
    <div>
        
       <Box
        width="40%"
        m="0 auto"
        p="5px"
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        
        // display="flex"
        justifyContent="center"
        // backgroundColor={colors.greenAccent[700]}
        borderRadius="4px">
       <TextField
                fullWidth
                
                variant="filled"
                type="text"
                label="Name Of Departent "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 4" }}
              />

               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Department id "
                // onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.nameOfComapnie}
                name="nameOfComapnie"
                // error={!!touched.nameOfComapnie && !!errors.nameOfComapnie}
                // helperText={touched.nameOfComapnie && errors.nameOfComapnie}
                sx={{ gridColumn: "span 4" }}
              />
         <div>
           <button className="btn_blue" >Sumbmit</button>
         </div>
               <Box>
         


       {/* {dept && <Add/>} */}
    {/* </div> */}
    </Box>

       </Box>
    </div>
  );
}

export default adddept;
