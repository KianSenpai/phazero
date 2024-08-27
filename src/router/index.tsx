import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Home = lazy(() => import('../pages/home'))

const routes = [{ key: 'home', path: '/', Component: Home }]

export default function Router() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location} key={location.pathname}>
                {routes.map(({ key, path, Component }) => (
                    <Route key={key} path={path} element={<Component />} />
                ))}
            </Routes>
        </Suspense>
    )
}
