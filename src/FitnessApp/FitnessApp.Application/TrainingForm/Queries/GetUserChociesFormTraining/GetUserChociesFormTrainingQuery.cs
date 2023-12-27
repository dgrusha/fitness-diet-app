using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.TrainingForm;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.TrainingForm.Queries.GetUserChociesFormTraining;
public record GetUserChociesFormTrainingQuery
(
    Guid Id
) : IRequest<UniqueResponse<GetUserDataFormTrainingOptions>>;
