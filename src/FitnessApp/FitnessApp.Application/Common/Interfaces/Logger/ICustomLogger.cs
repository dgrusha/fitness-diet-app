using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Interfaces.Logger;
public interface ICustomLogger
{
    void LogInfoAboutException(string ProblemDetailsText);
}
