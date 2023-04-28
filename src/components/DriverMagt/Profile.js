import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import useAuth from "../../hook/useAuth";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fShortenNumber } from "../../utils/formatNumber";
import { fDateTime } from "../../utils/formatTime";

function TripCard({ trips, title }) {
  if (!trips) return null;
  return (
    <Card sx={{ mt: 2, borderRadius: (theme) => theme.shape.borderRadius }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Grid spacing={1} container>
          {trips?.map((trip, index) => (
            <Grid component={RouterLink}
            to={"/driver/trips/status/"+trip._id}  key={index} sx={{ p: 1,textDecoration:'none' }} xs={12} md={6} item>
              <Paper
                elevation={3}
                
                sx={{
                  p: 2,
                  borderRadius: (theme) => theme.shape.borderRadius,
                  transition: ".5s",
                  "&:hover":{
                    transform:"scale(1.05)",
                  }
                }}
              >
                <Typography>Pickup location: {trip.pickupLocation}</Typography>
                <Typography>Drop location: {trip.dropLocation}</Typography>
                <Typography>Date: {fDateTime(trip.date)}</Typography>
                <Typography>Cost: {fDateTime(trip.cost)}</Typography>
                <Typography>Customer Name: {trip.customerName}</Typography>
                <Typography>Customer Phone: {trip.customerPhone}</Typography>
                <Typography>
                  Total KM: {fShortenNumber(trip.totalKM)}
                </Typography>
                <Typography>Trip type: {trip.tripType}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

function Profile() {
  const { user: driver } = useAuth();
  const [trips, setTrips] = useState({
    active: [],
    cancelled: [],
    completed: [],
  });
  useEffect(() => {
    axios
      .get("/api/v1/driver/trips/" + driver._id, {
        params: {
          segment: true,
        },
      })
      .then((res) => {
        setTrips(res.data.trips);
      });
  }, [driver._id]);
  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ p: 3, mt: 2, borderRadius: (theme) => theme.shape.borderRadius }}
      >
        <Stack>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{ width: 80, height: 80, mr: 2 }}
              alt={`${driver.firstName} ${driver?.lastName}`}
            >
              {driver?.firstName?.[0]}
              {driver?.lastName?.[0]}
            </Avatar>
            <Typography variant="h3">
              {driver?.firstName} {driver?.lastName}
            </Typography>
          </Box>
          <Stack spacing={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4">Email: {driver?.email}</Typography>
            <Typography variant="h4">Contact: {driver?.contact}</Typography>
            <Typography variant="h4">Address: {driver?.address}</Typography>
            <Typography variant="h4">
              License No.: {driver?.licenseNo}
            </Typography>
            <Typography variant="h4">
              Vehicle No.: {driver?.vehicleNo}
            </Typography>
            <Typography variant="h4">
              Vehicle Type: {driver?.vehicleType}
            </Typography>
            <Typography variant="h4">
              Vehicle Model: {driver?.vehicleModel}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
      <TripCard title={"Active Trips"} trips={trips.active?.items} />
      <TripCard title={"Completed Trips"} trips={trips.completed?.items} />
      <TripCard title={"Cancelled Trips"} trips={trips.cancelled?.items} />
    </Container>
  );
}

export default Profile;
