import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'auth/verifyResetCode';

export const verifyResetCode = async ({ email, code }) => {
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
                "email": email,
                "code": code
              }
            ),
        });
    
        return await response; 
      } catch (error) {
        throw new Error(`Error submitting form: ${error.message}`);
      }

};