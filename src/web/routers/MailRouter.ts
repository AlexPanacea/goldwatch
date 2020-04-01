import * as express from "express";
import { MailService } from "../services/MailService";
const router = express.Router();

const mailService: MailService = new MailService();

router.get('/', (req, res) => {
  mailService.renderedPage().then((mailContent) => {
    res.render('mail', mailContent);
  });
});

export const MailRouter: express.Router = router;
