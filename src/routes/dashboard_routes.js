import Home from '../Pages/Home/Home.js';
import Analysis from '../Pages/Analysis';
import Comparison from '../Pages/Comparison/comparison';
import District from '../Pages/District/District.js';
import Villages from '../Pages/Villages/Villages.js';
import DDA from '../Pages/DDA/DDA.js';
import ADO from '../Pages/ADO/ADO.js';
import AddAdo from '../Pages/ADO/Components/AddAdo';
import Pending from '../Pages/Locations/Pending/pending.js';
import EditPending from '../Pages/Locations/Pending/EditPending';
import Ongoing from '../Pages/Locations/ongoing.js';
import Completed from '../Pages/Locations/completed.js';
import AddVillage from '../Pages/Villages/components/AddVillage.js';
import EditVillage from '../Pages/Villages/components/EditVillage.js';
import AddDda from '../Pages/DDA/components/AddDda.js';
import EditDda from '../Pages/DDA/components/EditDda.js';
import AddDistrict from '../Pages/District/components/AddDistrict';
import EditDistrict from '../Pages/District/components/EditDistrict';
import AddBlock from '../Pages/BlockComponent/components/AddBlock.js';
import React from 'react';
import EditAdo from '../Pages/ADO/Components/EditAdo.js';
import Block from '../Pages/BlockComponent/Blocks';
import renderBlockComponet from '../Pages/District/District';
import EditBlock from '../Pages/BlockComponent/components/EditBlock.js';
import Dda_villages from '../Pages/DDA_Villages/dda_village';
const role =
  localStorage.getItem('Role') == null
    ? parseInt(sessionStorage.getItem('Role'))
    : parseInt(localStorage.getItem('Role'));
console.log(role);

const dashboard_routes = [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    exact: true,
    path: '/analysis',
    component: Analysis,
  },
  {
    exact: true,
    path: '/comarison',
    component: Comparison,
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
  // {
  //   exact: true,
  //   path: '/villages',
  //   component: (role==4)?Dda_villages:Villages,
  // },
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
    path: '/ado/edit/:adoId',
    component: EditAdo,
  },
  {
    exact: true,
    path: '/dda',
    component: DDA,
  },
  {
    exact: true,
    path: '/dda/add',
    component: AddDda,
  },
  {
    exact: true,
    path: '/dda/edit/:ddaId',
    component: EditDda,
  },
  // {
  //   exact: true,
  //   path: '/ado',
  //   component: ADO,
  // },
  {
    exact: true,
    path: '/ado/addAdo',
    component: AddAdo,
  },
  // {
  //   exact: true,
  //   path: '/locations/pending',
  //   component: Pending,
  // },
  {
    exact: true,
    path: '/locations/pending/edit/:locationId',
    component: EditPending,
  },
  // {
  //   exact: true,
  //   path: '/locations/ongoing',
  //   component: Ongoing,
  // },
  // {
  //   exact: true,
  //   path: '/locations/completed',
  //   component: Completed,
  // },
  {
    exact: true,
    path: '/block/:districtId',
    component: Block,
  },
  {
    exact: true,
    path: '/block/:district_id/add',
    component: AddBlock,
  },
  {
    exact: true,
    path: '/block/:district_id/edit/:blockId',
    component: EditBlock,
  },
];

export default dashboard_routes;
