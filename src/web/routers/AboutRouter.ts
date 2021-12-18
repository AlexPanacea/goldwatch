import * as express from "express";
import { AboutService } from "../services/AboutService";
const router = express.Router();

const aboutService: AboutService = new AboutService();

router.get('/', (req, res) => {
	aboutService.renderedPage().then((aboutContent) => {
		res.render('about', aboutContent);
	});
});

export const AboutRouter: express.Router = router;
