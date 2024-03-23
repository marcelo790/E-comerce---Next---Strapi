import { ENV, authFetch } from "@/utils";

export class User {
    async getMe() {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER_ME}`;
            const params = {
                headers: {
                    Authorization: 'Bearer '
                }
            }

            const response = await authFetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            
            return result;
        } catch (error) {
            throw error;
        }
    }
}