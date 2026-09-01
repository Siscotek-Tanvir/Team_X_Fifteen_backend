import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { EventControllers } from "./event.controller";
import { EventValidations } from "./event.validation";

const router = Router();

// Special routes (must precede /:id parameter)
router.post("/seed", EventControllers.seedEvents);
router.get("/featured", EventControllers.getFeaturedEvents);
router.get("/categories", EventControllers.getEventCategories);
router.get("/departments", EventControllers.getEventDepartments);
router.get("/stats", EventControllers.getEventStats);

// Main collection routes
router.get("/", EventControllers.getAllEvents);
router.post(
  "/",
  validateRequest(EventValidations.createEventValidationSchema),
  EventControllers.createEvent
);

// Individual item routes
router.get("/:id", EventControllers.getSingleEvent);
router.patch(
  "/:id",
  validateRequest(EventValidations.updateEventValidationSchema),
  EventControllers.updateEvent
);
router.put(
  "/:id",
  validateRequest(EventValidations.updateEventValidationSchema),
  EventControllers.updateEvent
);
router.delete("/:id", EventControllers.deleteEvent);

// Registration route
router.post(
  "/:id/register",
  validateRequest(EventValidations.registerEventValidationSchema),
  EventControllers.registerForEvent
);

export const EventRoutes = router;
