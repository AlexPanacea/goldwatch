import * as express from "express";
import { HomeService } from "../services/HomeService";
const router = express.Router();

const homeService: HomeService = new HomeService();

router.get('/', (req, res) => {
  homeService.renderedPage().then((homeContent) => {
    res.render('home', homeContent);
  });
});

export const HomeRouter: express.Router = router;
