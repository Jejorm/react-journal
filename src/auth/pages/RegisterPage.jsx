import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startCreatingUserWithEmailAndPassword } from '../../store/auth'

const formData = {
    displayName: '',
    email: '',
    password: '',
}

const formValidations = {
    displayName: [ ( value ) => value.length >= 1, 'The name is required' ],
    email: [ ( value ) => value.includes( '@' ), 'The email must have a @' ],
    password: [ ( value ) => value.length >= 6, 'The password must be more than 6 characters long' ],
}

export const RegisterPage = () => {

    const [ formSubmitted, setFormSubmitted ] = useState( false )

    const dispatch = useDispatch()

    const { status, errorMessage } = useSelector( state => state.auth )

    const isCheckingAuthentication = useMemo( () => status === 'checking', [ status ] )

    const { formState, formValidation, onInputChange, isFormValid } = useForm( formData, formValidations )

    const { displayName, email, password } = formState

    const { displayNameValid, emailValid, passwordValid } = formValidation

    const onSubmit = ( event ) => {

        event.preventDefault()

        setFormSubmitted( true )

        if ( !isFormValid ) return

        dispatch( startCreatingUserWithEmailAndPassword( formState ) )
    }

    return (

        <AuthLayout title="Create Account">

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">

                <Grid container>

                    <Grid
                        item
                        xs={ 12 }
                        sx={ { mt: 2 } }
                    >

                        <TextField
                            label="Name"
                            type="text"
                            placeholder="Name"
                            name='displayName'
                            value={ displayName }
                            onChange={ onInputChange }
                            error={ !!displayNameValid && formSubmitted }
                            helperText={ displayNameValid }
                            fullWidth
                        />

                    </Grid>

                    <Grid
                        item
                        xs={ 12 }
                        sx={ { mt: 2 } }
                    >

                        <TextField
                            label="Email"
                            type="email"
                            placeholder="mail@google.com"
                            name='email'
                            value={ email }
                            onChange={ onInputChange }
                            error={ !!emailValid && formSubmitted }
                            helperText={ emailValid }
                            fullWidth
                        />

                    </Grid>

                    <Grid
                        item
                        xs={ 12 }
                        sx={ { mt: 2 } }
                    >

                        <TextField
                            label="Password"
                            type="password"
                            placeholder="********"
                            name='password'
                            value={ password }
                            onChange={ onInputChange }
                            error={ !!passwordValid && formSubmitted }
                            helperText={ passwordValid }
                            fullWidth
                        />

                    </Grid>

                    <Grid
                        container
                        spacing={ 2 }
                        sx={ { mb: 2, mt: 1 } }
                    >

                        <Grid
                            item
                            xs={ 12 }
                            display={ !!errorMessage ? '' : 'none' }
                        >

                            <Alert severity='error'>{ errorMessage }</Alert>

                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                        >

                            <Button
                                disabled={ isCheckingAuthentication }
                                variant="contained"
                                type='submit'
                                fullWidth
                            >
                                Create Account
                            </Button>

                        </Grid>

                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >

                        <Typography sx={ { mr: 1 } }>Already have an Account?</Typography>
                        <Link
                            color="inherit"
                            component={ RouterLink }
                            to="/auth/login"
                        >
                            Login
                        </Link>

                    </Grid>

                </Grid>

            </form>
        </AuthLayout>

    )
}
