@echo off
echo Activating virtual environment...

set venv_path="D:\fitness-diet-app\python_scripts\env\Scripts\activate"

call %venv_path%

echo Running administration handler...

set python_executable="D:\fitness-diet-app\python_scripts\env\Scripts\python.exe"
set python_script="D:\fitness-diet-app\python_scripts\Administration\main.py"

%python_executable% %python_script% > conversation.log 2>&1

echo administration handler execution complete.
pause
