import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'userProfile/getUserCoach';

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