import { ITransactionContent } from "../interfaces/ITransactionsContent";

export class TransactionsService {
	public async renderedPage(): Promise<ITransactionContent> {
		return Promise.resolve(
			{
				transactions: []
			});
	}
}
