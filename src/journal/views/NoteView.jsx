import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"

export const NoteView = () => {

    return (

        <Grid
            className="animate__animated animate__fadeIn animate__faster"
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={ { mb: 1 } }
        >

            <Grid item>

                <Typography
                    fontSize={ 39 }
                    fontWeight="light"
                >
                    28 August 2023
                </Typography>

            </Grid>

            <Grid item>

                <Button
                    color="primary"
                    sx={ { padding: 2 } }
                >

                    <SaveOutlined sx={ { fontSize: 30, mr: 1 } } />
                    Save

                </Button>

            </Grid>

            <Grid container>

                <TextField
                    type="text"
                    variant="filled"
                    placeholder="Insert a title"
                    label="Title"
                    sx={ { border: "none", mb: 1 } }
                    fullWidth
                />

                <TextField
                    type="text"
                    variant="filled"
                    placeholder="What happened today?"
                    minRows={ 5 }
                    fullWidth
                    multiline
                />

            </Grid>

            <ImageGallery />

        </Grid>
    )
}