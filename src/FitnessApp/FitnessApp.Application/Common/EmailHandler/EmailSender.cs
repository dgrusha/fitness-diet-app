using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

namespace FitnessApp.Application.Common.EmailHandler;
public class EmailSender : IEmailSender
{
    private readonly IConfiguration _configuration;

    public EmailSender(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmail(string toEmail, string subject, string text)
    {
        try
        {
            using (SmtpClient client = new SmtpClient(_configuration.GetValue<string>("EmailHandler:Server"), _configuration.GetValue<int>("EmailHandler:Port")))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(_configuration.GetValue<string>("EmailHandler:Email"), _configuration.GetValue<string>("EmailHandler:Password"));

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_configuration.GetValue<string>("EmailHandler:Email")),
                    To = { toEmail },
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = $"<h1>{subject}</h1><br /><p>{text}</p>"
                };

                await client.SendMailAsync(mailMessage);
            }
        }
        catch (SmtpException ex)
        {
            Console.WriteLine($"Error sending email: {ex.Message}");
            throw;
        }
    }
}
