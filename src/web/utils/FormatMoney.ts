// tslint:disable: no-magic-numbers

export class FormatMoney {
    public static format(money: number) {
        const moneyStr: string = String(money);
        let formatted = moneyStr.substr(0, 2);
        if (moneyStr.length === 2) {
            return formatted;
        }
        formatted = formatted.replace(/^/, `${moneyStr.substr(-2, 2)} `);
        if (moneyStr.length === 4) {
            return formatted;
        }
        return formatted = formatted.replace(/^/, `${moneyStr.substr(0, moneyStr.length - 4)} `);
    }
}
