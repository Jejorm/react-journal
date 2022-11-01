import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from '../../../src/auth/pages/LoginPage'
import { authSlice } from '../../../src/store/auth'
import { notAuthenticatedState } from '../../fixtures/authFixtures'

const mockStartGoogleSignIn = jest.fn()
const mockStartLoginWithEmailPassword = jest.fn()

jest.mock( '../../../src/store/auth/thunks', () => ( {
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ( { email, password } ) => {
        return () => mockStartLoginWithEmailPassword( { email, password } )
    }
} ) )

jest.mock( 'react-redux', () => ( {
    ...jest.requireActual( 'react-redux' ),
    useDispatch: () => fn => fn()
} ) )

const store = configureStore( {
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
} )

describe( 'Pruebas en <LoginPage />', () => {

    beforeEach( () => jest.clearAllMocks() )

    test( 'Debe mostrar el componente correctamente', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect( screen.getAllByText( 'Login' ).length ).toBeGreaterThanOrEqual( 1 )
    } )

    test( 'Boton de google debe llamar startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const googleBtn = screen.getByLabelText( 'google-btn' )

        fireEvent.click( googleBtn )

        expect( mockStartGoogleSignIn ).toHaveBeenCalled()
    } )

    test( 'submit debe llamar startLoginWithEmailAndPassword', () => {

        const email = 'test@mail.com'
        const password = '123456'

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const emailField = screen.getByRole( 'textbox', { name: 'Email' } )
        fireEvent.change( emailField, { target: { name: 'email', value: email } } )

        const passwordField = screen.getByTestId( 'Password' )
        fireEvent.change( passwordField, { target: { name: 'password', value: password } } )

        const loginForm = screen.getByLabelText( 'submit-form' )
        fireEvent.submit( loginForm )

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith( {
            email,
            password
        } )
    } )
} )