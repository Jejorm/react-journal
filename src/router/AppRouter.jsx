import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"

export const AppRouter = () => {

    return (

        <Routes>

            {/* Login & Register */ }
            <Route path="auth/*" element={ <AuthRoutes /> } />

            {/* JouralApp */ }
            <Route path="/*" element={ <JournalRoutes /> } />

        </Routes>

    )
}