using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.GetStarted.Commands.AddObligatoryForm;
public class AddCommandHandler : IRequestHandler<AddCommand, HttpResponseMessage>
{

    private readonly IObligatoryFormRepository _obligatoryFormRepository;
    private readonly IUserRepository _userRepository;
    private readonly IAllergyRepository _allergyRepository;

    public AddCommandHandler(IObligatoryFormRepository obligatoryFormRepository, IUserRepository userRepository, IAllergyRepository allergyRepository)
    {
        _obligatoryFormRepository = obligatoryFormRepository;
        _userRepository = userRepository;
        _allergyRepository = allergyRepository;
    }

    public async Task<HttpResponseMessage> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = _userRepository.GetUserById(request.Id);

            if (user == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such a user does not exist"),
                };
            }
            if (user.ObligatoryForm != null)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Such a user already has an obligatory form"),
                };
            }

            if (request.Weight > 200 || request.Weight < 28) 
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Not correct range of weight parameter"),
                };
            }

            if (request.Height > 270 || request.Height < 130)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest)
                {
                    Content = new StringContent("Not correct range of weight parameter"),
                };
            }

            var obligatoryForm = new ObligatoryForm
            {
                User = user,
                Weight = request.Weight,
                Height = request.Height
            };

            var allergies = _allergyRepository.GetAllergiesByName(request.Allergies).ToList();

            foreach (var allergy in allergies) 
            {
                obligatoryForm.Allergies.Add(allergy);
            }

            _obligatoryFormRepository.Add(obligatoryForm);
            _userRepository.UpdateObligatoryFormStatus(user, true);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("Obligatory form added successfully"),
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
