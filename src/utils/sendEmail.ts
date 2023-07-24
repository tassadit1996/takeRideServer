import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API_KEY_PRIVATE!,
    domain: "https://app.mailgun.com/app/sending/domains/sandbox78d0344bc74f483eb822559c47cc0bc1.mailgun.org"
})
const senEmail = (subject: string, html: string) => {
    const emailData = {
        from: "maghni.tassadit@gmail.com",
        to: "tassadit.magh@gmail.com",
        subject,
        html
    }
    return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`
    const emailBody = `Verify your email by clicking <a href="http://takeRide.com/verification/${key}`
    return senEmail(emailSubject, emailBody)
}