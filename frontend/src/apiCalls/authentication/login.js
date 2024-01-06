import { Constants } from '../../helpers/constants';

const baseUrl = Constants.BaseUrl + 'auth/login';

export const login = async ({ email, password }) => {
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
                "email": email,
                "password": password
              }
            ),
        });
    
        return await response; 
      } catch (error) {
        throw new Error(`Error submitting form: ${error.message}`);
      }

};