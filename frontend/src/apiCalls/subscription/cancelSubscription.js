import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = Constants.BaseUrl + 'subscription/cancel';

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