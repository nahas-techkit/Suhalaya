import { Button, Grid, styled, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import axios from "../../utils/axiosInstance";
import "./pt.css"
import Signpad from "./Signpad";

export default function PrintComponent() {
  const componentRef = useRef();
  const { id } = useParams()
  const [trip, setTrip] = useState()
  const getTrip = (id, signal) => {
    axios.get(`/api/v1/trip/${id}`, { signal })
      .then((res) => {
        // let dateTime = moment(res.data.date)
        // const date = dateTime.format('YYYY-MM-DD');
        // const time = dateTime.format('HH:mm:ss');
        setTrip({ ...res.data/*, date, time*/ })
      })
  }

  useEffect(() => {
    const controller = new AbortController()

    getTrip(id, controller.signal)
    return () => {
      controller.abort()
    }
  }, [id])

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button sx={{ml:2}} variant="contained" size='large' color='secondary' >PRINT</Button>}
          content={() => componentRef.current}
        />

        {/* component to be printed */}
        <ComponentToPrint trip={trip} ref={componentRef} />
      </div>
    </>
  );
}

const Content = styled(Grid)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  // width:'100%'
}))

const RootStyle = styled('div')(({ theme }) => ({
  // border: `5px solid ${theme.palette.common.black}`,
  padding: theme.spacing(2)
}))
const ContentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: '17px'
}))
const ComponentToPrint = forwardRef(({ trip }, ref) => {
  return (
    <RootStyle ref={ref} >
      {/* <h2 style={{color: "green"}}>Suhayala</h2> */}
      <div className="pt">
        <div className="left">
          {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
        </div>
        <div className="center">
          <span>SUHAYALA </span>
          <Typography variant='h2'>Trip sheet </Typography>
        </div>
        <div className="right">
          {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
        </div>
      </div>

      <div className="heading">
        <h1>Customer Details</h1>
      </div>
      <Content container >
        <Grid item md={6} pr={2}>
          <ContentText variant="subtitle1"  >Booking Id : {trip?._id}</ContentText>
          <ContentText>Customer Name : {trip?.customerName}</ContentText>
        </Grid>
        <Grid item md={6}>
          <ContentText>Phone Number : {trip?.customerPhone}</ContentText>
        </Grid>
      </Content>
      <diV className="heading">
        <h1>Trip Details</h1>
      </diV>


      <Content container>
        <Grid item md={6} pr={2}>
          <ContentText>Pickup Location : {trip?.pickupLocation}</ContentText>
          <ContentText>Drop Location : {trip?.dropLocation}</ContentText>
          <ContentText>Trip Type : {trip?.tripType}</ContentText>
          <ContentText>Extra Location : {trip?.extraLocation}</ContentText>
          <ContentText>Date : {trip?.date}</ContentText>
        </Grid>
        <Grid item md={6}>
          <ContentText>Vehicle Type : {trip?.vehicleType}</ContentText>
          <ContentText>Vehicle Model : {trip?.vehicleModel}</ContentText>
          <ContentText>Total Km : {trip?.totalKM} km</ContentText>
          <ContentText>Extra Km : {trip?.extraKM} km</ContentText>
          <ContentText>Expecting Time : {trip?.expectedTime}</ContentText>
          <ContentText>Extra Time : {trip?.extraHour}</ContentText>
        </Grid>
      </Content>
      <diV className="heading">
        <h1>Driver Details</h1>
      </diV>
      <Content container >
        <Grid item md={6} pr={2}>
          <ContentText>Driver Name : {trip?.driverName}</ContentText>
          <ContentText>Phone number : {trip?.driverPhone}</ContentText>
          <ContentText>Car No : {trip?.vehicleNo}</ContentText>
        </Grid>
        <Grid item md={6}>
          <ContentText>Cost : {trip?.cost}</ContentText>
          <ContentText>Digital Sign : </ContentText>
          <Signpad />
        </Grid>
        {/* <div className="right">
          <span>Customer Name</span>
            <span>Customer Phone number</span>
        </div> */}
      </Content>

      <div className="pt3">
        <div className="left3">
          <span>Driver Sign :</span>
        </div>
        <div className="center3">
          <span>Customer Sign : </span>
        </div>
        {/* <div className="right3">
            <span>Customer Name</span>
            <span>Customer Phone number</span>
          </div> */}
      </div>

    </RootStyle>
  );
})