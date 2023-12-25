using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.TrainingForm;
public record AddTrainingFormRequest
(
    string TrainingMode,
    int Days
);
