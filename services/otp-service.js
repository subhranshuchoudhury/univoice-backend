const crypto = require('crypto');
require("dotenv").config();
const hashService = require('./hash-service');
const mailer = require('nodemailer');
smtpProtocol = mailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: "subhransuchoudhury00@gmail.com",
        pass: process.env.MAIL_PASS,
    }
});


class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBySms(phone, otp) {
        let mailoption = {
            from: "subhransuchoudhury00@gmail.com",
            to: phone,
            subject: "UNIVOICE OTP VERIFICATION",
            html: `Hi, if you have not created a account before then contact <b>+918249587552 (whatsapp) </b><br>Your OTP is <h1>${otp}</h1>.<br>Thanks for using <b>UNIVOICE</b><br>from: Subhranshu Choudhury :)`
        }
        smtpProtocol.sendMail(mailoption, function (err, response) {
            if (err) {
                console.log(err);
            }
            console.log('Message Sent');
            return { status: 200 };

        });
        smtpProtocol.close();
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        // return true; // correct for every otp.
        return hashedOtp === computedHash;
    }
}

module.exports = new OtpService();
