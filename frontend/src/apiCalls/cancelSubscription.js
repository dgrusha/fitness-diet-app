import { getCurrentUser } from '../helpers/authHelper';

const baseUrl = 'https://localhost:7194/subscription/cancel';

export const cancelSubscription = async () => {
  const token = getCurrentUser();
	try {
      const response = await fetch(baseUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
				body: "",
      });
			console.log(response)
      return await response;
    } catch (error) {
        return [];
    }
};