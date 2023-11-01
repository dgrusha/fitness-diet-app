using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.Feedback.Commands.LeaveFeedback;
public record LeaveFeedbackCommand
(
    Guid UserId,
    int RatingLevel,
    string Text
) : IRequest<HttpResponseMessage>;
