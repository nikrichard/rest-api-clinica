import express from "express";
import cors from 'cors';

const router = express.Router();

//Import Controllers
import indexCtrl from '../controllers/indexControllers'

//indexRoutes
router.get('/', cors(), indexCtrl.welcome);

export default router;