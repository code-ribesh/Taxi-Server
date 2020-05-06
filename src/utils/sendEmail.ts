import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API || "",
    domain: "sandbox8185996fa5e248d9afe9fd16f2b8ac58.mailgun.org"
  });
  
  const sendEmail = (subject: string, html: string) => {
    const emailData = {
      from: "ribeshbasnet19.rb@gmail.com",
      to: "ribeshbasnet19.rb@gmail.com",
      subject,
      html
    };
    return mailGunClient.messages().send(emailData);
  };
  
  export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://oyw.com/verification/${key}/">here</a>`;
    return sendEmail(emailSubject, emailBody);
  };

    