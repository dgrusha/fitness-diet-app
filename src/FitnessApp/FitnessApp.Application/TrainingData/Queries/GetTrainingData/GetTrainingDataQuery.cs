using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Contracts.UniqueResponse;
using MediatR;

namespace FitnessApp.Application.TrainingData.Queries.GetTrainingData;
public record GetTrainingDataQuery 
(
    Guid Id
) : IRequest<UniqueResponse<Dictionary<string, Dictionary<string, List<Common.DTO.ExcerciseDto>>>>>;
