import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks/useCheckAuth'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {

    const { status } = useCheckAuth()

    if ( status === 'checking' ) return <CheckingAuth />

    return (

        <Routes>

            {
                ( status === 'authenticated' )
                    /* Login & Register */
                    ? <Route path="/*" element={ <JournalRoutes /> } />
                    /* JouralApp */
                    : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' /> }></Route>

        </Routes>

    )
}