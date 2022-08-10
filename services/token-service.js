const jwt = require('jsonwebtoken');
require("dotenv").config();
const accessTokenSecret = "9e03fddc477f8dddf89ca6b608d1c6cccdc882ccd104dbafcdb02ff8edd419296937b1b6562db403c0be150a0a432f70c5e13cea0b572d9ac143ac7ab0cddc3a";
const refreshTokenSecret = "3be8aba5089a46db14d7ac02cf37b0eba85bf403b767af6d04cb9cea3a7832450e13be06c40652df6b6d4decd828c395e4cf06d0f082bd29764f760e7ee8737a";
const refreshModel = require('../models/refresh-model');
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, accessTokenSecret, {
            expiresIn: '1m',
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
            expiresIn: '1y',
        });
        return { accessToken, refreshToken };
    }

    async storeRefreshToken(token, userId) {
        try {
            await refreshModel.create({
                token,
                userId,
            });
        } catch (err) {
            console.log(err.message);
        }
    }

    async verifyAccessToken(token) {
        return jwt.verify(token, accessTokenSecret);
    }

    async verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, refreshTokenSecret);
    }

    async findRefreshToken(userId, refreshToken) {
        return await refreshModel.findOne({
            userId: userId,
            token: refreshToken,
        });
    }

    async updateRefreshToken(userId, refreshToken) {
        return await refreshModel.updateOne(
            { userId: userId },
            { token: refreshToken }
        );
    }

    async removeToken(refreshToken) {
        return await refreshModel.deleteOne({ token: refreshToken });
    }
}

module.exports = new TokenService();
