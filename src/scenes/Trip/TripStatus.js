import { Container, Grid, styled, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../utils/axiosInstance'

const ContentText = styled(Typography)(({ theme }) => ({
    fontSize: '18px'
}))
const Heading = styled('div')(({ theme }) => ({
    
}))
function TripStatus() {
    const { id } = useParams()
    const [trip, setTrip] = useState()
    const getTrip = (id, signal) => {
        axios.get(`/api/v1/trip/${id}`, { signal })
            .then((res) => {
                let dateTime = moment(res.data.date)
                const date = dateTime.format('YYYY-MM-DD');
                const time = dateTime.format('HH:mm:ss');
                setTrip({ ...res.data, date, time })
            })
    }

    useEffect(() => {
        let controller = new AbortController()
        getTrip(id, controller.signal)

        return () => {
            controller.abort()
        }
    }, [id])

    return (
        <Container maxWidth='md'>
            <Typography variant='h1' gutterBottom>TripStatus</Typography>
            <Heading>
                <h2>Customer Details</h2>
            </Heading>
            <Grid container  >
                <Grid item md={6} pr={2}>
                    <ContentText variant="subtitle1"  >Booking Id : {trip?._id}</ContentText>
                    <ContentText>Customer Name : {trip?.customerName}</ContentText>
                </Grid>
                <Grid item md={6}>
                    <ContentText>Phone Number : {trip?.customerPhone}</ContentText>
                </Grid>
            </Grid>
            <Heading>
                <h2>Trip Details</h2>
            </Heading>


            <Grid container >
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
            </Grid>
            <Heading>
                <h2>Driver Details</h2>
            </Heading>
            <Grid container>
                <Grid item md={6} pr={2}>
                    <ContentText>Driver Name : {trip?.driverName}</ContentText>
                    <ContentText>Phone number : {trip?.driverPhone}</ContentText>
                    <ContentText>Car No : {trip?.vehicleNo}</ContentText>
                </Grid>
                <Grid item md={6}>
                    <ContentText>Cost : {trip?.cost}</ContentText>
                </Grid>

            </Grid>
        </Container>
    )
}

export default TripStatus