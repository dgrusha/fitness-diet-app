import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'auth/resetPassword';

export const resetPassword = async ({ email, code, password1, password2 }) => {
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
                "email": email,
                "code": code,
                "password1": password1,
                "password2": password2
              }
            ),
        });
    
        return await response; 
      } catch (error) {
        throw new Error(`Error submitting form: ${error.message}`);
      }

};