import * as React from 'react';
import { useEffect, useState } from 'react';
import { getUserStatuses } from '../apiCalls/userProfile/userProfileGetStatuses.js';
import { StatusEnum } from '../helpers/processStatuses.js';
import DietFinished from './dietFinished.js';
import FormDiet from './formDiet.js';
import PreparingProcess from './preparingProcess.js';

function Diet() {
	const [userStatuses, setUserStatuses] = useState({});

	useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserStatuses();
        if (data.errorCode === 200) {
          setUserStatuses(data.data);
        } else {
          setUserStatuses({ dietStatus: -1, trainingStatus: -1 });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
		const intervalId = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

	const renderContent = () => {
		switch (userStatuses.dietStatus) {
			case StatusEnum.NotStarted:
				return <FormDiet setUserStatuses={setUserStatuses} mode={0} />;
			case StatusEnum.InProgress:
				return <PreparingProcess mode={"diet"} />;
			case StatusEnum.Finished:
				return (
					<DietFinished />
				);
			case StatusEnum.ToTake:
				return <PreparingProcess mode={"diet"} />;
			default:
				return <></>;
		}
	};

	return (
		<>
			{renderContent()}
		</>
	);
}

export default Diet;
