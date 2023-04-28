import { Button, Grid, Stack, styled, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import axios from "../../utils/axiosInstance";
import "./pt.css";
import Signpad from "./Signpad";
import humanizeDuration from "../../utils/humanizeDuration";
import { fDateTime } from "../../utils/formatTime";
import { UPLOAD_URL } from "../../constant/defaultValues";
import useAuth from "../../hook/useAuth";
import { toast } from "react-hot-toast";

export default function PrintComponent() {
  const componentRef = useRef();
  const { id } = useParams();
  const [trip, setTrip] = useState();
  const getTrip = (id, signal) => {
    axios.get(`/api/v1/trip/${id}`, { signal }).then((res) => {
      // let dateTime = moment(res.data.date)
      // const date = dateTime.format('YYYY-MM-DD');
      // const time = dateTime.format('HH:mm:ss');
      setTrip({ ...res.data /*, date, time*/ });
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    getTrip(id, controller.signal);
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <>
      <div>
        {/* button to trigger printing of target component */}

        <ComponentToPrint trip={trip} getTrip={getTrip} ref={componentRef} />
        <Stack direction='row' justifyContent={'end'}>
          <ReactToPrint
            trigger={() => (
              <Button
                sx={{ mb: 4 }}
                variant="contained"
                size="large"
              >
                PRINT
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Stack>
      </div>
    </>
  );
}

const Content = styled(Grid)(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  // width:'100%'
}));

const RootStyle = styled("div")(({ theme }) => ({
  // border: `5px solid ${theme.palette.common.black}`,
  padding: theme.spacing(2),
}));
const ContentText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontSize: "17px",
}));
const ComponentToPrint = forwardRef(({ trip, getTrip }, ref) => {
  const { id } = useParams();
  const { user } = useAuth();
  const onAdminSign = (data) => {
    const formData = new FormData();
    formData.append("adminSign", data, "adminSign.png");
    axios
      .post("/api/v1/trip/sign/" + id, formData)
      .then((res) => {
        toast.success(res.data.message);
        getTrip(id);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || err.message);
      });
  };
  const onDriverSign = (data) => {
    const formData = new FormData();
    formData.append("driverSign", data, "driverSign.png");
    formData.append("status", "completed");
    axios
      .post("/api/v1/trip/sign/" + id, formData)
      .then((res) => {
        toast.success(res.data.message);
        getTrip(id);
      })
      .catch((err) => {
        toast.error(err.response?.data.message || err.message);
      });
  };
  return (
    <RootStyle ref={ref}>
      {/* <h2 style={{color: "green"}}>Suhayala</h2> */}
      <div className="pt">
        <div className="left">
          {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
        </div>
        <div className="center">
          <span>SUHAYALA </span>
          <Typography variant="h2">Trip sheet </Typography>
        </div>
        <div className="right">
          {/* <span>Customer Name :</span>
            <span>Customer Phone number :</span> */}
        </div>
      </div>

      <div className="heading">
        <h1>Customer Details</h1>
      </div>
      <Content container>
        <Grid item md={6} pr={2}>
          <ContentText variant="subtitle1">
            Booking Id : {trip?._id}
          </ContentText>
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
          {/* <ContentText>Extra Location : {trip?.extraLocation}</ContentText> */}
          <ContentText>Date : {fDateTime(trip?.date)}</ContentText>
        </Grid>
        <Grid item md={6}>
          <ContentText>Vehicle Type : {trip?.vehicleType}</ContentText>
          <ContentText>Vehicle Model : {trip?.vehicleModel}</ContentText>
          <ContentText>Total Km : {trip?.totalKM} km</ContentText>
          {/* <ContentText>Extra Km : {trip?.extraKM} km</ContentText> */}
          <ContentText>
            Expecting Time : {humanizeDuration(trip?.expectedTime)}
          </ContentText>
          {/* <ContentText>Extra Time : {trip?.extraHour}</ContentText> */}
        </Grid>
      </Content>
      <diV className="heading">
        <h1>Driver Details</h1>
      </diV>
      <Content container>
        <Grid item md={6} pr={2}>
          <ContentText>Driver Name : {trip?.driverName}</ContentText>
          <ContentText>Phone number : {trip?.driverPhone}</ContentText>
          <ContentText>Car No : {trip?.vehicleNo}</ContentText>
          <ContentText>Driver Sign : </ContentText>
          {trip?.driverSign?.path ? (
            <img
              src={UPLOAD_URL + trip.driverSign.path}
              alt="Driver signature"
              style={{ maxWidth: 312, maxHeight: 162, minHeight: 120 }}
            />
          ) : (
            <Signpad onSave={onDriverSign} disabled={user?.role !== "driver"} />
          )}
        </Grid>
        <Grid item md={6}>
          <ContentText>Cost : {trip?.cost}</ContentText>
          <ContentText>Digital Sign : </ContentText>
          {trip?.adminSign?.path ? (
            <img
              src={UPLOAD_URL + trip.adminSign.path}
              alt="Admin signature"
              style={{ maxWidth: 312, maxHeight: 162, minHeight: 120 }}
            />
          ) : (
            <Signpad onSave={onAdminSign} disabled={user?.role !== "admin"} />
          )}
        </Grid>
        {/* <div className="right">
          <span>Customer Name</span>
            <span>Customer Phone number</span>
        </div> */}
      </Content>

      {/* <div className="pt3">
        <div className="left3">
          <span>Driver Sign :</span>
        </div>
        <div className="right3">
            <span>Customer Name</span>
            <span>Customer Phone number</span>
          </div>
      </div> */}
    </RootStyle>
  );
});
