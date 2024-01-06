import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = Constants.BaseUrl + 'userProfile/getUserCoach';

export const getCoach= async () => {
  const token = getCurrentUser();
	try {
      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      let answer = await response.data.json();
      return answer;
    } catch (error) {
        return [];
    }
};