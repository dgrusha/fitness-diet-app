import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'subscription/cancel';

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
      return await response;
    } catch (error) {
        return [];
    }
};