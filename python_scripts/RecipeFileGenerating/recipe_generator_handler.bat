@echo off
echo Activating virtual environment...

set venv_path="D:\fitness-diet-app\python_scripts\env\Scripts\activate"

call %venv_path%

echo Running conversation handler...

set python_executable="D:\fitness-diet-app\python_scripts\env\Scripts\python.exe"
set python_script="D:\fitness-diet-app\python_scripts\RecipeFileGenerating\main.py"

%python_executable% %python_script% > recipe_generator.log 2>&1

echo conversation handler execution complete.
pause
