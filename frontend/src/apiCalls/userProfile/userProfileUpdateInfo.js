import { getCurrentUser } from '../../helpers/authHelper';
import { Constants } from '../../helpers/constants';

const baseUrl = `${process.env.REACT_APP_BASE_URL}` + 'userProfile/updatedUser';

export const updateUserProfile = async ({ name, surname, photo }) => {
  const token = getCurrentUser();
  try {
        const formData = new FormData();
        formData.append('FirstName', name);
        formData.append('LastName', surname);
        formData.append('Photo', photo);

        const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: formData
        });
   
        return await response; 
    } catch (error) {
      throw new Error(`Error submitting form: ${error.message}`);
    }

};