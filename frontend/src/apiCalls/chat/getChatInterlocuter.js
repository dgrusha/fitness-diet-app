import { getCurrentUser } from '../../helpers/authHelper';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'userProfile/getChatInterlocutor';

export const getChatInterlocuter = async () => {
  const token = getCurrentUser();
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
      let answer = await response.json();
      return answer;
    } catch (error) {
        return [];
    }
};