import * as express from "express";
import { HomePage } from "../pages/HomePage";
const router = express.Router();

const homePage: HomePage = new HomePage();

router.get('/', (req, res) => {
  res.send(homePage.render());
});

export const HomeRouter: express.Router = router;
