import { useMemo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from '../../hooks/useForm'
import { ImageGallery } from '../components'
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal'

export const NoteView = () => {

    const dispatch = useDispatch()

    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal )

    const { formState, onInputChange } = useForm( note )

    const { body, title, date } = formState

    const dateString = useMemo( () => {

        const newDate = new Date( date )

        return newDate.toUTCString()
    }, [ date ] )

    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ] )

    useEffect( () => {
        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota actualizada', messageSaved, 'success' )
        }
    }, [ messageSaved ] )

    const fileInputRef = useRef()

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    const onFileInputChange = ( { target } ) => {

        if ( target.files === 0 ) return

        dispatch( startUploadingFiles( target.files ) )
    }

    const onDelete = () => {
        dispatch( startDeletingNote() )
    }


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
                    { dateString }
                </Typography>

            </Grid>

            <Grid item>

                <input
                    type="file"
                    multiple
                    onChange={ onFileInputChange }
                    style={ { display: 'none' } }
                    ref={ fileInputRef }
                />

                <IconButton
                    color="primary"
                    disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
                >
                    <UploadOutlined />
                </IconButton>

                <Button
                    onClick={ onSaveNote }
                    disabled={ isSaving }
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
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    placeholder="What happened today?"
                    minRows={ 5 }
                    fullWidth
                    multiline
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />

            </Grid>

            <Grid
                container
                justifyContent='end'
            >
                <Button
                    onClick={ onDelete }
                    sx={ { mt: 2 } }
                    color="error"
                >

                    <DeleteOutline />

                    Delete

                </Button>

            </Grid>

            <ImageGallery
                images={ note.imageUrls }
            />

        </Grid>
    )
}