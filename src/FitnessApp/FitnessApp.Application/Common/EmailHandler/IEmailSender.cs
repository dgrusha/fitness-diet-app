using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.EmailHandler;
public interface IEmailSender
{
    Task SendEmail(string toEmail, string subject, string text);
}
