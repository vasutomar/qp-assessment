import { health, signin, signup } from "../controllers/authentication-controller";
import express from 'express';

export const authenticationRouter = express.Router();
authenticationRouter.get('/authentication/health', health);
authenticationRouter.post('/authentication/signup', signup);
authenticationRouter.post('/authentication/signin', signin);