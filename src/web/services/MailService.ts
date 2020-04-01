import { getManager } from "typeorm";
import { IMailContent } from "../interfaces/IMailContent";
import { Mail } from "../../entities/cmangos/Mail";

export class MailService {
    public async renderedPage(): Promise<IMailContent> {
        const latestMails: Mail[] = await getManager("cmangosDB")
            .createQueryBuilder(Mail, "mail")
            .getMany();
        return Promise.resolve({mails: latestMails});
    }
}
