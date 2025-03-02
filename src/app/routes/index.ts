import { Router } from 'express';
import AuthRouter from '../modules/auth/auth.route';
import RentalHouseRouter from '../modules/rentalHouse/house.route';
import RentalRequestRouter from '../modules/rentalRequest/request.route';



const router: Router = Router();

const allRoutes = [
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/landlords',
    route: RentalHouseRouter
  },
  {
    path: '/tenants',
    route: RentalRequestRouter
  }
  
];

allRoutes.forEach((singleRoute) =>
  router.use(singleRoute.path!, singleRoute.route!),
);

export default router;
