using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.DTO;
using MediatR;

namespace FitnessApp.Application.TrainingMode.Queries.GetAllTrainingModes;
public class GetAllTrainingModesQuery : IRequest<HashSet<TrainingModeDto>>
{
    // No properties needed for this query
}
