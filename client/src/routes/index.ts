import { routes } from './routes';
import { RouterConfig } from './routes.config';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages
import Home from '@/pages/Home';
import Login from '@/pages/Login';

// <path : string, Component>
// Public Router
export const publicRoutes: RouterConfig[] = [{ path: routes.home, page: Home, layout: MainLayout }];

// Private Router
export const privateRoutes = [{ path: routes.login, page: Login, layout: AuthLayout }];
