import config from "config";
import nodemailer from "nodemailer";
const email_config: any = {
  service: config.get<string>("email_service"),
  host: config.get<string>("smtp_host"),
  port: config.get("smtp_port"),
  auth: config.get("smtp_auth"),
};
const sendMail = (data: any) => {
  const transporter = nodemailer.createTransport(email_config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
        console.log(err)
    } else {
        console.log(info.response)
        return info.response
    }
  })
};

const sendMultipleMailToVendors = (data: any) => {
  for (const el of data) {

    sendMail({
      from: config.get("email"),
      to: el.email,
      subject: "Incoming Order"
    })
  }
} 

export default sendMail