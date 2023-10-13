import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/userProfile/getUser';

export const getUser = async () => {
    console.log(1);
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