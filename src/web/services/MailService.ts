import { getManager } from "typeorm";
import { IMailContent } from "../interfaces/IMailContent";
import { Mail } from "../../entities/cmangos/Mail";
import { IConfiguration } from "../../app/interfaces/IConfiguration";

export class MailService {

    private readonly config: IConfiguration;

    constructor() {
        this.config = require("../../config.json");
    }

    public async renderedPage(): Promise<IMailContent> {
        const latestMails: Mail[] = await getManager("cmangosDB")
            .createQueryBuilder(Mail, "mail")
            .where("money > 0")
            .orderBy("id", "DESC")
            // tslint:disable-next-line: no-magic-numbers
            .limit(this.config.website.showMailAmount)
            .getMany();
        return Promise.resolve({mails: latestMails});
    }
}
