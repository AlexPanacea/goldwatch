import { getManager } from "typeorm";
import { IMailContent } from "../interfaces/IMailContent";
import { Mail } from "../../entities/cmangos/Mail";

export class MailService {
    public async renderedPage(): Promise<IMailContent> {
        const latestMails: Mail[] = await getManager("cmangosDB")
            .createQueryBuilder(Mail, "mail")
            .where("money > 0")
            // tslint:disable-next-line: no-magic-numbers
            .limit(10)
            .getMany();
            console.log(latestMails);
        return Promise.resolve({mails: latestMails});
    }
}
