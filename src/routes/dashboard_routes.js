import Home from '../Pages/Home/Home.js';
import District from '../Pages/District/District.js';
import Villages from '../Pages/Villages/Villages.js';
import DDA from '../Pages/DDA/DDA.js';
import ADO from '../Pages/ADO/ADO.js';
import Locations from '../Pages/Locations/Locations.js';
import AddForm from '../Components/Options/AddForm.js';

const dashboard_routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/district',
    component: District,
  },
  {
    exact: true,
    path: '/district/add',
    component: AddForm,
  },
  {
    exact: true,
    path: '/villages',
    component: Villages,
  },
  {
    exact: true,
    path: '/dda',
    component: DDA,
  },
  {
    exact: true,
    path: '/ado',
    component: ADO,
  },
  {
    exact: true,
    path: '/locations',
    component: Locations,
  },
];

export default dashboard_routes;
