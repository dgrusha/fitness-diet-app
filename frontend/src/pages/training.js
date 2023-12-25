import * as React from 'react';
import { useEffect, useState }  from 'react';
import FormTraining from './formTraining.js';
import { getUserStatuses } from '../apiCalls/userProfileGetStatuses.js';
import PreparingProcess from './preparingProcess.js';
import { StatusEnum } from '../helpers/processStatuses.js';
import TrainingFinished from './trainingFinished.js';

function Training() {
	const [userStatuses, setUserStatuses] = useState({});

	useEffect(() => {
		getUserStatuses().then((data) => {
			if (data.errorCode === 200) {
				setUserStatuses(data.data);
			} else {
				setUserStatuses({ dietStatus: -1, trainingStatus: -1 });
			}
		});
	}, []);

	const renderContent = () => {
        console.log(userStatuses.trainingStatus);
        console.log(StatusEnum.NotStarted);
		switch (userStatuses.trainingStatus) {
			case StatusEnum.NotStarted:
				return <FormTraining setUserStatuses={setUserStatuses} mode={0}/>;
			case StatusEnum.InProgress:
				return <PreparingProcess mode={"training"}/>;
			case StatusEnum.Finished:
				return (
					<TrainingFinished />
				);
			case StatusEnum.ToTake:
				return <PreparingProcess mode={"training"}/>;
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
