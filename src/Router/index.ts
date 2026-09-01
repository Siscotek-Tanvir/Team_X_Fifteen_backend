import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { EventRoutes } from "../modules/events/event.route";
import { SeminarRoutes } from "../modules/seminars/seminar.route";
import { UserRoutes } from "../modules/user/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/events",
    route: EventRoutes,
  },
  {
    path: "/seminars",
    route: SeminarRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
