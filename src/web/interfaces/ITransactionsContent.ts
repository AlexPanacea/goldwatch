export interface ITransactionEntry {
	guid: number;
	name: string;
	level: number;
	money: number;
	change: number;
	snapshots: ITransactionSnapshot[];
}

export interface ITransactionSnapshot {
	snapshottime: number;
	totaltime: number;
	money: number;
}

export interface ITransactionContent {
	transactions: ITransactionEntry[];
}
