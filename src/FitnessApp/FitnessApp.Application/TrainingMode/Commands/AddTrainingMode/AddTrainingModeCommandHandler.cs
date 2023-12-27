using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using MediatR;

namespace FitnessApp.Application.TrainingMode.Commands.AddTrainingMode;
public class AddTrainingModeCommandHandler : IRequestHandler<AddTrainingModeCommand, HttpResponseMessage>
{
    private readonly ITrainingModeRepository _trainingModeRepository;

    public AddTrainingModeCommandHandler(ITrainingModeRepository trainingModeRepository)
    {
        _trainingModeRepository = trainingModeRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddTrainingModeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.Name.Length == 0)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Name cannot be empty"),
                };
            }

            Domain.Entities.TrainingMode trainingMode = new Domain.Entities.TrainingMode
            {
                Name = request.Name
            };

            _trainingModeRepository.Add(trainingMode);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Training mode was added successfully"),
            };

        }
        catch (Exception ex)
        {
            return new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                Content = new StringContent($"An error occurred: {ex.Message}"),
            };
        }
    }
}