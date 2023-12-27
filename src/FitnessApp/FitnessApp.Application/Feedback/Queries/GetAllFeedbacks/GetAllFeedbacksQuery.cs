using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Feedback.Queries.GetAllFeedbacks;
public record GetAllFeedbacksQuery 
(
    Guid UserId
) : IRequest<string>;
