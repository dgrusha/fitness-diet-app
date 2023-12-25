import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/userProfile/getUserCoach';

export const getCoach = async () => {
  const token = getCurrentUser();
	console.log('user searching for coach')
	try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
				body: {},
      });
			console.log(response)
      return await response;
    } catch (error) {
        return [];
    }
};