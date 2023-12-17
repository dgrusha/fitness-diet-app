using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Helpers;
public class DietDataHelper
{
    public static double CountBMR(int weight, int height, int years, string gender)
    {
        double bmr;
        if (gender.Equals("male"))
        {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * years);
        }
        else if (gender.Equals("female"))
        {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * years);
        }
        else
        {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * years);
        }

        return bmr;
    }

    public static double CountTDEE(double activityModeCoef, double dietModeCoef, double bmr)
    {
        double tdee = (bmr * activityModeCoef) + dietModeCoef;
        if (tdee < 1200)
        {
            tdee = 2400;
        }

        return tdee;
    }


}
