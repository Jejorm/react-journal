import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState, jejormUser } from '../../fixtures/authFixtures'

describe( 'Pruebas en authSlice', () => {

    test( 'Debe regresar el estado inicial y llamarse "auth"', () => {

        const state = authSlice.reducer( initialState, {} )

        expect( authSlice.name ).toBe( 'auth' )

        expect( state ).toEqual( initialState )
    } )

    test( 'Debe realizar la autenticación', () => {

        const state = authSlice.reducer( initialState, login( jejormUser ) )

        expect( state ).toEqual( {
            status: 'authenticated',
            uid: jejormUser.uid,
            email: jejormUser.email,
            displayName: jejormUser.displayName,
            photoURL: jejormUser.photoURL,
            errorMessage: null,
        } )
    } )

    test( 'Debe realizar el logout sin argumentos', () => {

        const state = authSlice.reducer( authenticatedState, logout() )

        expect( state ).toEqual( {

            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        } )
    } )

    test( 'Debe realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'Credenciales no son correctas'

        const state = authSlice.reducer( authenticatedState, logout( { errorMessage } ) )

        expect( state ).toEqual( {

            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage,
        } )
    } )

    test( 'Debe cambiar el estado a "checking"', () => {

        const state = authSlice.reducer( authenticatedState, checkingCredentials() )

        expect( state.status ).toBe( 'checking' )
    } )
} )