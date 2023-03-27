import { Box } from '@mui/material'
import React from 'react'
import Header from '../../components/Header'
import Form from '../../components/TripMagt/TripForm'

function CreateTrip() {

    return (
        <>
            <Box m="20px">
                <div className="comapny-management">
                    <Header title="TRIPS" subtitle="Managing the trips" />
                </div>
                <Form />
            </Box>
        </>
    )
}

export default CreateTrip