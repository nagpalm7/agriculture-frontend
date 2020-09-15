import Home from '../Pages/Home/Home.js';
import District from '../Pages/District/District.js';
import Villages from '../Pages/Villages/Villages.js';
import DDA from '../Pages/DDA/DDA.js';
import ADO from '../Pages/ADO/ADO.js';
import Pending from '../Pages/Locations/pending.js';
import Ongoing from '../Pages/Locations/ongoing.js';
import Completed from '../Pages/Locations/completed.js';
import AddVillage from '../Pages/Villages/components/AddVillage.js';
import EditVillage from '../Pages/Villages/components/EditVillage.js';
import AddDda from '../Pages/DDA/components/AddDda.js';
import EditDda from '../Pages/DDA/components/EditDda.js';
import AddDistrict from '../Pages/District/components/AddDistrict';
import EditDistrict from '../Pages/District/components/EditDistrict';

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
    component: AddDistrict,
  },
  {
    exact: true,
    path: '/district/edit/:districtId',
    component: EditDistrict,
  },
  {
    exact: true,
    path: '/villages',
    component: Villages,
  },
  {
    exact: true,
    path: '/villages/add',
    component: AddVillage,
  },
  {
    exact: true,
    path: '/villages/edit/:villageId',
    component: EditVillage,
  },
  {
    exact: true,
    path: '/dda',
    component: DDA,
  },
  {
    exact: true,
    path: 'dda/add',
    component: AddDda,
  },
  {
    exact: true,
    path: 'dda/edit/:ddaId',
    component: EditDda,
  },
  {
    exact: true,
    path: '/ado',
    component: ADO,
  },
  {
    exact: true,
    path: '/locations/pending',
    component: Pending,
  },
  {
    exact: true,
    path: '/locations/ongoing',
    component: Ongoing,
  },
  {
    exact: true,
    path: '/locations/completed',
    component: Completed,
  },
];

export default dashboard_routes;
