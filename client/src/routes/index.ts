import { routes } from './routes';
import { RouterConfig } from './routes.config';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';

// <path : string, Component>
// Public Router
export const publicRoutes: RouterConfig[] = [
    { path: routes.home, page: Home, layout: MainLayout },
    { path: routes.profile, page: Profile, layout: MainLayout },
];

// Private Router
export const privateRoutes: RouterConfig[] = [
    { path: routes.logIn, page: Login, layout: AuthLayout },
    { path: routes.signUp, page: SignUp, layout: AuthLayout },
];
