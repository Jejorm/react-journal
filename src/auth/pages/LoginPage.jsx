import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { Google } from '@mui/icons-material'
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth'

const formData = {
    email: '',
    password: ''
}

const formValidations = {
    email: [ ( value ) => value.includes( '@' ), 'The email must have a @' ],
    password: [ ( value ) => value.length >= 6, 'The password must be more than 6 characters long' ],
}

export const LoginPage = () => {

    const [ formSubmitted, setFormSubmitted ] = useState( false )

    const { status, errorMessage } = useSelector( state => state.auth )

    const dispatch = useDispatch()

    const { formState, formValidation, onInputChange, isFormValid } = useForm( formData, formValidations )

    const isAuthenticating = useMemo( () => status === 'checking', [ status ] )

    const { email, password } = formState

    const { emailValid, passwordValid } = formValidation

    const onSubmit = ( e ) => {

        e.preventDefault()

        setFormSubmitted( true )

        if ( !isFormValid ) return

        dispatch( startLoginWithEmailAndPassword( { email, password } ) )
    }

    const onGoogleSignIn = () => {
        dispatch( startGoogleSignIn() )
    }

    return (

        <AuthLayout title="Login">

            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">

                <Grid container>

                    <Grid
                        item
                        xs={ 12 }
                        sx={ { mt: 2 } }
                    >

                        <TextField
                            label="Email"
                            type="email"
                            placeholder="mail@google.com"
                            name="email"
                            onChange={ onInputChange }
                            value={ email }
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
                            name="password"
                            onChange={ onInputChange }
                            value={ password }
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
                            sm={ 6 }
                        >

                            <Button
                                variant="contained"
                                type='submit'
                                disabled={ isAuthenticating }
                                fullWidth
                            >
                                Login
                            </Button>

                        </Grid>

                        <Grid
                            item
                            xs={ 12 }
                            sm={ 6 }
                        >

                            <Button
                                variant="contained"
                                onClick={ onGoogleSignIn }
                                disabled={ isAuthenticating }
                                fullWidth
                            >
                                <Google />

                                <Typography sx={ { ml: 1 } }>Google</Typography>

                            </Button>

                        </Grid>

                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >

                        <Link
                            color="inherit"
                            component={ RouterLink }
                            to="/auth/register"
                        >
                            Create an Account
                        </Link>

                    </Grid>

                </Grid>

            </form>

        </AuthLayout>
    )
}
