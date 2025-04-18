class EmailService {
    constructor() {}

    public async sendActivationEmail(to: string, link: string): Promise<void> {
        console.log(to);
        console.log(link);
    }
}

export { EmailService };
