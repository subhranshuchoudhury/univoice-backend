const crypto = require('crypto');
require("dotenv").config();
const hashService = require('./hash-service');

// const smsSid = process.env.SMS_SID;
// const smsAuthToken = process.env.SMS_AUTH_TOKEN;
// const twilio = require('twilio')(smsSid, smsAuthToken, {
//     lazyLoading: true,
// });

class OtpService {
    // async generateOtp() {
    //     const otp = crypto.randomInt(1000, 9999);
    //     return otp;
    // }

    async sendBySms(phone, otp) {
        return { status: 200 };
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        // return true; // correct for every otp.
        return hashedOtp === computedHash;
    }
}

module.exports = new OtpService();
