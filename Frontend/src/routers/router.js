// import Resgister from "../modules/Auth/Resgister/Resgister";
// import Login from "../modules/Auth/Login/Login";
import Home from "../pages/Home.js";
import BuyBox from "../pages/BuyBox.js";
import UnBox from "../pages/UnBox.js";
import PlantFood from '../pages/PlantFood.js';
import Admin from '../pages/Admin.js';
import Account from '../pages/Account.js';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/buybox',component: BuyBox },
    { path: '/unbox', component: UnBox },
    { path: '/plantfood', component: PlantFood},
    { path: '/account', component: Account},
]; 


const privateRoutes = [
    { path: '/', component: Admin},
];

export { publicRoutes, privateRoutes };