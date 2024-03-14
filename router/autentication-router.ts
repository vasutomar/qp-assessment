import { health } from "../controllers/authentication-controller";
import express from 'express';

export const authenticationRouter = express.Router();
authenticationRouter.get('/authentication/health', health);