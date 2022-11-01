import { loginWithEmailAndPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from '../../../src/store/auth'
import { checkingAuthentication, startLoginWithEmailAndPassword, startGoogleSignIn, startLogout } from '../../../src/store/auth/thunks'
import { clearNotesLogout } from '../../../src/store/journal'
import { jejormUser } from '../../fixtures/authFixtures'

jest.mock( '../../../src/firebase/providers' )

describe( 'Pruebas en auth thunks', () => {

    const dispatch = jest.fn()

    beforeEach( () => jest.clearAllMocks() )

    test( 'Debe invocar checkingCredentials', async () => {

        await checkingAuthentication()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
    } )

    test( 'startGoogleSignIn debe de llamar checkingCredentials y login (Exito)', async () => {

        const loginData = {
            ok: true,
            ...jejormUser
        }

        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) )
    } )

    test( 'startGoogleSignIn debe de llamar checkingCredentials y logout (Error)', async () => {

        const loginData = {
            ok: false,
            errorMessage: 'Google error'
        }

        await signInWithGoogle.mockResolvedValue( loginData )

        await startGoogleSignIn()( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) )
    } )

    test( 'startLoginWithEmailAndPassword debe llamar checkingCredentials y login (Exito)', async () => {

        const loginData = {
            ok: true,
            ...jejormUser
        }

        const formData = {
            email: jejormUser.email,
            password: '123456'
        }

        await loginWithEmailAndPassword.mockResolvedValue( loginData )

        await startLoginWithEmailAndPassword( formData )( dispatch )

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() )
        expect( dispatch ).toHaveBeenCalledWith( login( { ...loginData } ) )
    } )

    test( 'startLogout debe llamar logoutFirebase, clearNotesLogout y logout', async () => {

        await startLogout()( dispatch )

        expect( logoutFirebase ).toHaveBeenCalled()
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() )
        expect( dispatch ).toHaveBeenCalledWith( logout() )
    } )
} )
