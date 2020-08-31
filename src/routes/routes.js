import AdminDashboard from '../Layouts/AdminDashboard/AdminDashboard';
import Home from '../pages/Home/Home';

const routes = [
  {
    exact: false,
    path: '/',
    component: Home,
    layout: AdminDashboard,
  },
];

export default routes;
