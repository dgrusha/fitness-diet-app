import * as React from 'react';

import {
	TextField,
	Button,
	Autocomplete,
    Typography,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import { CalendarControlled } from '../components/atoms/CalendarControlled.js';
import InfoAndCalendarTemplate from '../components/templates/InfoAndCalendarTemplate';
import image_stretching from '../img/streching.svg';
import dayjs from 'dayjs';
import { validateCoachFeedbackFormFields } from '../validators/coachFeedbackValidator.js';
import { getAllCoachesUsers } from '../apiCalls/getAllUsersOfCoach.js';
import { getDataByCoach } from '../apiCalls/getDataByCoach.js';
import { useNavigate } from 'react-router-dom';
import { CardComponentWithAction } from '../components/moleculas/cardWithAction.js';
import { MealsEnum } from '../helpers/processStatuses.js';
import image_breakfast from '../img/breakfast.png';
import image_dinner from '../img/dinner.png';
import image_lunch from '../img/lunch.png';
import { updateDietDataByCoach } from '../apiCalls/updateDietDataByCoach.js';
import { updateTrainingDataByCoach } from '../apiCalls/updateTrainingDataByCoach.js';


import { useEffect, useState }  from 'react';

function CoachesFeedback() {
    const navigate = useNavigate();
    const [date, setDate] = React.useState(dayjs());
    const [dataType, setDataType] = React.useState('diet');
    const [selectedInstance, setSelectedInstance] = useState(null);
    const [selectedMealId, setSelectedMealId] = useState(0);
    const [userData, setUserData] = useState({});
    const [userDataPerDay, setUserDataPerDay] = useState(null);

    const [commentDiet, setCommentDiet] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
	const [allUsers, setAllUsers] = useState([]);
    const [formErrors, setFormErrors] = useState({ users: "", dataType: "", general: "" });
    const setters = {
		"dataType": setDataType
	}

    const handleDate = (value) => {
		setSelectedInstance(null);
        setDate(value);
        if(userData){
            if(dataType === 'training' && userData){
                setUserDataPerDay(userData[value.day().toString()]);
            }else if(dataType === 'diet' && userData["recipes"]){
                setUserDataPerDay(userData["recipes"][value.day().toString()]);
            }
            
        }
	};

    useEffect(() => {
		getAllCoachesUsers().then((data) => {
			if (data.errorCode === 200) {
                setAllUsers(data.data);
			} else if(data.errorCode === 424){
                navigate('/');
            } else {
				setAllUsers({});
			}
		});
	}, []);

    const isOptionEqualToValue = (option, value) => {
		return option.Mail === value.Mail;
	};

    const handleChange = event => {
        setSelectedInstance(null);
		const { name, value } = event.target;
		setters[name](value);
        let errVal = validateCoachFeedbackFormFields(name, value, allUsers);
        setFormErrors(prevState => ({
			...prevState,
			[name]: errVal,
			["general"]: "",
		}))
        if(selectedUser && value){
            getDataByCoach( { userId: selectedUser.id, dataType: value }).then((data) => {
                if (data.errorCode === 200) {
                    setUserData(data.data);
                    if(value === "diet"){
                        setUserDataPerDay(data.data.recipes[date.day().toString()]);
                    }else if (value === "training"){
                        setUserDataPerDay(data.data[date.day().toString()]);
                    }
                } else if(data.errorCode === 424){
                    navigate('/');
                } else {
                    setUserData({});
                    setUserDataPerDay(null);
                    setFormErrors(prevState => ({
                        ...prevState,
                        ["general"]: data.errors[0],
                    }))
                }
            });
        }
	};

    const handleChangeUser = (event, newValue) => {
        setSelectedInstance(null);
        let errVal = validateCoachFeedbackFormFields("users", newValue, allUsers);
        setFormErrors(prevState => ({
			...prevState,
			["users"]: errVal,
			["general"]: "",
		}))
		setSelectedUser(newValue);
        if(newValue && dataType){
            getDataByCoach( { userId: newValue.id, dataType: dataType }).then((data) => {
                if (data.errorCode === 200) {
                    setUserData(data.data);
                    if(dataType === "diet"){
                        setUserDataPerDay(data.data.recipes[date.day().toString()]);
                    }else if (dataType === "training"){
                        setUserDataPerDay(data.data[date.day().toString()]);
                    }
                } else if(data.errorCode === 424){
                    navigate('/');
                } else {
                    setUserData({});
                    setUserDataPerDay(null);
                    setFormErrors(prevState => ({
                        ...prevState,
                        ["general"]: data.errors[0],
                    }))
                }
            });
        }
	};

    const handleCardClickTraining = (partType) => {
        setSelectedInstance(partType.split(" ")[0].toLowerCase());
    };

    const handleCardClickDiet = (mealType) => {
        setSelectedMealId(MealsEnum[mealType]);
        setSelectedInstance(mealType);
    };

    const updateSelectedMeal = async () => {
        setUserDataPerDay({
            ...userDataPerDay,
            [selectedMealId]: {
              ...userDataPerDay[selectedMealId],
              comment: commentDiet,
            },
          });
          const response = await updateDietDataByCoach({ recipeId: userDataPerDay[selectedMealId].id, userId: selectedUser.id, text: commentDiet });
		  const [status, message] = [response.status, await response.text()];
          console.log(message);
      };

      const handleCommentChange = (instance, index, value) => {
        const updatedUserDataPerDay = { ...userDataPerDay };
        updatedUserDataPerDay[instance][index].comment = value;
        setUserDataPerDay(updatedUserDataPerDay);
      };

      const handleTrainingCommentUpdate = async (instance, index) => {
        const updatedUserDataPerDay = { ...userDataPerDay };
        const response = await updateTrainingDataByCoach({ exerciseId: updatedUserDataPerDay[instance][index].id, userId: selectedUser.id, text: updatedUserDataPerDay[instance][index].comment });
        const [status, message] = [response.status, await response.text()];
        console.log(message);
      };

    const renderBodyContent = ({dataType}) => {
        if(dataType === 'training'){
            if (selectedInstance) {
                return (
                  <>
                    <Typography variant="h5">{`${dataType.charAt(0).toUpperCase() + dataType.slice(1)} details for ${selectedInstance}`}</Typography>
                    {userDataPerDay[selectedInstance] && userDataPerDay[selectedInstance].map((training, index) => (
                      <div key={training.name}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">{`${index + 1}. ${training.name}`}</Typography>
                        <Typography variant="body1">{`Muscle: ${training.muscle}`}</Typography>
                        <Typography variant="body1">{`Instructions: ${training.instructions}`}</Typography>
                        <TextField
                            label="Coaches Comment"
                            variant="outlined"
                            fullWidth
                            multiline
                            style={{ marginTop: '16px' }}
                            value={training.comment || ''}
                            onChange={(e) => handleCommentChange(selectedInstance, index, e.target.value)}
                        />

                        <Button 
                        variant="contained" 
                        onClick={() => handleTrainingCommentUpdate(selectedInstance, index)} 
                        style={{ marginTop: '16px', marginBottom: '16px' }}>
                            Save changes
                        </Button>
                        <br/>
                      </div>
                    ))}
                  </>
                );
              } else {
                return (
                  userDataPerDay ? (
                    Object.keys(userDataPerDay).map((key) => (
                      <CardComponentWithAction
                        key={key}
                        title={key.charAt(0).toUpperCase() + key.slice(1) + " " + dataType.charAt(0).toUpperCase() + dataType.slice(1)}
                        image={image_stretching}
                        onClickFun={handleCardClickTraining}
                      />
                    ))
                  ) : (
                    <Typography gutterBottom variant="subtitle1">Today you have some chill time ;) </Typography>
                  )
                );
              }
        }else if(dataType === 'diet'){
            if (selectedInstance) {
                if (userDataPerDay) {
                    const selectedMeal = userDataPerDay[selectedMealId];
                    return selectedMeal ? (
                      <>
                        <Typography variant="h5">{`Details for ${selectedInstance}`}</Typography>
                        <Typography>{`Name: ${selectedMeal.name}`}</Typography>
                        <Typography>{`Description: ${selectedMeal.description}`}</Typography>
                        <Typography>{`Calories: ${selectedMeal.calories}`}</Typography>
                        <Typography>{`Carbohydrate: ${selectedMeal.carbohydrate}`}</Typography>
                        <Typography>{`Fat: ${selectedMeal.fat}`}</Typography>
                        <Typography>{`Protein: ${selectedMeal.protein}`}</Typography>
                        <Typography>{`Ingredients: ${selectedMeal.ingredientsStr}`}</Typography>
                        <TextField
                        label="Coach's Comment"
                        variant="outlined"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        multiline
                        value={selectedMeal.comment}
                        onChange={(e) => setCommentDiet(e.target.value)}
                        />
                        <Button variant="contained" disabled={selectedMeal.comment === commentDiet} style={{ marginTop: '16px' }} onClick={updateSelectedMeal}>
                        Save Comment
                        </Button>
                      </>
                    ) : null;
                }
                
                }else{
                    return (userDataPerDay && userDataPerDay[0] ? (<>
                        <CardComponentWithAction 
                            title="Breakfast"
                            subtitle={userDataPerDay[0].name}
                            image={image_breakfast} 
                            imageLabel={userDataPerDay[0].calories + " Cal"} 
                            onClickFun= {handleCardClickDiet}
                        />
                        <CardComponentWithAction 
                            title="Lunch" 
                            subtitle={userDataPerDay[2].name} 
                            image={image_lunch} 
                            imageLabel={userDataPerDay[2].calories + " Cal"} 
                            onClickFun= {handleCardClickDiet}
                        />
                        <CardComponentWithAction 
                            title="Dinner" 
                            subtitle={userDataPerDay[1].name} 
                            image={image_dinner} 
                            imageLabel={userDataPerDay[1].calories + " Cal"} 
                            onClickFun= {handleCardClickDiet}
                        />
                    </>):(<></>));
                }
        }
       
      };

	return (
		<InfoAndCalendarTemplate
			title={selectedInstance ? (<><Button onClick={()=>{setSelectedInstance(null); setSelectedMealId(0); setCommentDiet('');}}>Back</Button></>)
				:(<Typography gutterBottom variant="title1">CLIENT MANAGEMENT</Typography>)}
			bodyItems={
                renderBodyContent({dataType: dataType})
			}
            footerBody={<Typography>{formErrors["general"]}</Typography>}
			leftUpperPart={
            <>
                <Autocomplete
                    options={allUsers}
                    name="users"
                    getOptionLabel={(option) => option.firstName + ' ' + option.lastName}
                    value={selectedUser}
                    isOptionEqualToValue={isOptionEqualToValue}
                    onChange={handleChangeUser}
                    fullWidth
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name="users"
                            label="Search user"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                    disableClearable
                />
                <CalendarControlled value={date} changeFunction={handleDate} />
            </>}
			leftLowerPart={
                <ToggleButtonGroup
                    value={dataType}
                    exclusive
                    fullWidth
                    onChange={handleChange}
                    name="dataType"
                    aria-label="Data type"
                    >
                    <ToggleButton name="dataType" value="diet">Diet</ToggleButton>
                    <ToggleButton name="dataType" value="training">Training</ToggleButton>
                </ToggleButtonGroup>
            }
		/>
	);
}

export default CoachesFeedback;