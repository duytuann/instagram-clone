import { routes } from './routes';
import { RouterConfig } from './routes.config';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import Home from '@/pages/Home';

// <path : string, Component>
// Public Router
export const publicRoutes: RouterConfig[] = [{ path: routes.home, page: Home, layout: MainLayout }];

// Private Router
export const privateRoutes = [];
