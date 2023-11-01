using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Contracts.Feedback;
public record AddFeedbackRequest
(
    int LevelRating,
    string Text
);
