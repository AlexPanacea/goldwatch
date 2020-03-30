// tslint:disable: no-magic-numbers

export class FormatMoney {
    public static format(money: number) {
        const moneyStr: string = String(money);

        const copper = moneyStr.substr(-2, 2);
        if (moneyStr.length <= 2) {
            return `${copper}c`;
        }
        const silver = (moneyStr.length === 3) ? moneyStr.substr(-3, 1) : moneyStr.substr(-4, 2);
        if (moneyStr.length <= 4) {
            return `${silver}s ${copper}c`;
        }

        const gold = moneyStr.substr(0, moneyStr.length - 4);
        return `${gold}g ${silver}s ${copper}c`;
    }
}
