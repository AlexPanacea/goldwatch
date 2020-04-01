import * as express from "express";
import { TransactionsService } from "../services/TransactionService";
const router = express.Router();

const homeService: TransactionsService = new TransactionsService();

router.get('/', (req, res) => {
  homeService.renderedPage().then((transactionContent) => {
    res.render('transactions', transactionContent);
  });
});

export const TransactionsRouter: express.Router = router;
