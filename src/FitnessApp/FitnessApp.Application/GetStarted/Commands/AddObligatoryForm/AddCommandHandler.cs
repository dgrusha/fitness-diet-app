using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;

namespace FitnessApp.Application.GetStarted.Commands.AddObligatoryForm;
public class AddCommandHandler : IRequestHandler<AddCommand>
{

    private readonly IObligatoryFormRepository _obligatoryFormRepository;
    private readonly IUserRepository _userRepository;

    public AddCommandHandler(IObligatoryFormRepository obligatoryFormRepository, IUserRepository userRepository)
    {
        _obligatoryFormRepository = obligatoryFormRepository;
        _userRepository = userRepository;
    }

    public async Task<Unit> Handle(AddCommand request, CancellationToken cancellationToken)
    {
        var user = _userRepository.GetUserById(request.Id);

        if (user == null) 
        {
            throw new Exception("Such a user does not exist");
        }
        if (user.ObligatoryForm != null) 
        {
            throw new Exception("Such a user does have an obligatory form");
        }


        //TODO: verification of weight and height
        var obligatoryForm = new ObligatoryForm 
        {
            User = user,
            Weight = request.Weight,
            Height = request.Height
        };

        _obligatoryFormRepository.Add(obligatoryForm);

        return Unit.Value;

    }
}
