import axios from 'axios';
import querystring from 'querystring';
import {IHmsService} from './IHmsService';

class HmsService implements IHmsService {

    async getAccessToken(clientId: number, appSecret: string): Promise<any> {
        try {
            const {data} = await axios.post('https://oauth-login.cloud.huawei.com/oauth2/v3/token',
                querystring.stringify({
                    grant_type: 'client_credentials',
                    client_secret: appSecret,
                    client_id: clientId
                }), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Host": "oauth-login.cloud.huawei.com",
                    }
                });
            return data
        } catch (error) {
            throw error

        }
    }

    async sendPushNotification(message: any): Promise<any> {
        const accessTokenRes: any = await this.getAccessToken(104288077, 'b3dd48e9c77c9f2daeddecf8e4d5f5c103672b13f008581555268a379b868b0e');
        try {

            axios.post('https://push-api.cloud.huawei.com/v2/736430079244911188/messages:send',
                {
                    'message': message,
                    'validate_only': false,
                }, {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        "Authorization": `Bearer ${accessTokenRes.access_token}`,
                    }
                }).then(function (response) {
                console.log(response)
                return response;
            });
        } catch (error) {
            console.log(error);

            return error

        }

    }


}

export default new HmsService();
 

