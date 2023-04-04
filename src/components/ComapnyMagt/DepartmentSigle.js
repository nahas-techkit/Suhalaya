import { IconButton, ListItem, ListItemText, Paper, Stack } from '@mui/material'
import React from 'react'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


function DepartmentSigle({ onDelete, onEdit, data }) {
    return (
        <Paper sx={{ m: 1 }} elevation={2} >
            <ListItem
                secondaryAction={
                    <Stack direction={'row'} spacing={2}>
                        <IconButton onClick={() => onEdit(data)} edge="end" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton color='error' onClick={() => onDelete(data._id)} edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                }

            >
                <ListItemText
                    primary={data.name}
                />
            </ListItem>
        </Paper>
    )
}

export default DepartmentSigle