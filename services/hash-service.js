const crypto = require('crypto');

class HashService {
    hashOtp(data) {
        return crypto
            .createHmac('sha256', '9c11ad54ca524e091f669997d8b415d37984685d88ac31ee91c562000a3c14fe27af5213a5b4581541515efb17a2d3f6e1703f97eb16ca163463c079c08d189c')
            .update(data)
            .digest('hex');
    }
}

module.exports = new HashService();
