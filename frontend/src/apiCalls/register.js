const baseUrl = 'https://localhost:7194/auth/register';

export const register = async ({ firstName, lastName, email, password }) => {
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
              }
            ),
        });
    
        return await response; 
      } catch (error) {
        throw new Error(`Error submitting form: ${error.message}`);
      }

};