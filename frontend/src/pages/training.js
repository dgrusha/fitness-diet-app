import * as React from 'react';
import { useEffect, useState } from 'react';
import { getUserStatuses } from '../apiCalls/userProfile/userProfileGetStatuses.js';
import { StatusEnum } from '../helpers/processStatuses.js';
import FormTraining from './formTraining.js';
import PreparingProcess from './preparingProcess.js';
import TrainingFinished from './trainingFinished.js';

function Training() {
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
		switch (userStatuses.trainingStatus) {
			case StatusEnum.NotStarted:
				return <FormTraining setUserStatuses={setUserStatuses} mode={0} />;
			case StatusEnum.InProgress:
				return <PreparingProcess mode={"training"} />;
			case StatusEnum.Finished:
				return (
					<TrainingFinished />
				);
			case StatusEnum.ToTake:
				return <PreparingProcess mode={"training"} />;
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

export default Training;
