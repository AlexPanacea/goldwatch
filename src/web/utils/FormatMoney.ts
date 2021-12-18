// tslint:disable: no-magic-numbers

export class FormatMoney {

	public static format(money: number): string {
		let moneyStr: string = `${`0${money}`.slice(-2)}c`;

		if (money > 99) {
			moneyStr = `${`0${Math.floor(money % 10000 / 100)}`.slice(-2)}s ${moneyStr}`;
		}
		if (money > 9999) {
			moneyStr = `${Math.floor(money / 10000)}g ${moneyStr}`;
		}

		return moneyStr;
	}
}
