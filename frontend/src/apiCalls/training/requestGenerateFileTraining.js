import { getCurrentUser } from '../../helpers/authHelper';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'trainingForm/requestGenerateFile';

export const requestGenerateFile = async () => {
  const token = getCurrentUser();
  try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      return await response; 
    } catch (error) {
        return [];
    }
};