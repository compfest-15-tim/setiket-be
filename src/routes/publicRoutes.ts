import { Router } from "express";
import { validateSchema } from "../lib/utils";
import { signInBodySchema, signUpBodySchema } from "../dtos/validation.schema";
import { signUpService } from "../services/signUpService";
import { signInService } from "../services/signInService";
import { sessionService } from "../services/sessionService";
import { signOutService } from "../services/signOutService";
import adminController from "../controllers/adminController";
import { checkUserRolePermissions } from "../middleware/checkUserRolePermissions";
import { errorMiddleware } from "../middleware/errorMiddleware";
import eventController from "../controllers/eventController";

const router = Router();

// Sign Up
router.post("/sign-up", validateSchema(signUpBodySchema), signUpService);

// Sign In
router.post("/sign-in", validateSchema(signInBodySchema), signInService);

// Sign Out
router.get("/sign-out", signOutService);

// Check Session
router.get("/session", sessionService);

router.get("/events", eventController.getAllEvent);
router.get("/events/:id", eventController.getEventById);

// event organizer
const eventOrganizerMiddleware = checkUserRolePermissions(["ADMIN", "EVENT_ORGANIZER"]);
router.post("/events", eventOrganizerMiddleware, eventController.createEvent);
router.delete("/events/:id", eventOrganizerMiddleware, eventController.deleteEvent);

// admin
const adminMiddleware = checkUserRolePermissions(["ADMIN"]);
router.post("/admin/events/:id/verify", adminMiddleware, adminController.verifyEventCreationRequest)
router.post("/admin/event-organizer/verify", adminMiddleware, adminController.verifyEORegistration)
router.get("/admin/events", adminMiddleware, adminController.verifyEORegistration)
router.get("/admin/users", adminMiddleware, adminController.verifyEORegistration)

router.use(errorMiddleware);

export default router;