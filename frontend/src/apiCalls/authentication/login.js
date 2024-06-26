const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'auth/login';

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