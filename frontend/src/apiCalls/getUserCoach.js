import { getCurrentUser } from '../helpers/authHelper';
import { Constants } from '../helpers/constants';

const baseUrl = Constants.BaseUrl + 'userProfile/getUserCoach';

export const getCoach= async () => {
  const token = getCurrentUser();
	console.log('user searching for coach')
	try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return [];
      }
      let answer = await response.data.json();
      return answer;
    } catch (error) {
        return [];
    }
};