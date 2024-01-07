
const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'auth/resetCode';

export const resetCode = async ({ email }) => {
    try {
        const response = await fetch(baseUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
                "email": email
              }
            ),
        });
    
        return await response; 
      } catch (error) {
        throw new Error(`Error submitting form: ${error.message}`);
      }

};