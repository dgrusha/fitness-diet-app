﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;

namespace FitnessApp.Application.Common.TrainingForm;
public class GetUserDataFormTrainingOptions
{
    public TrainingModeDto trainingMode { get; set; }
    public int days { get; set; }
}
