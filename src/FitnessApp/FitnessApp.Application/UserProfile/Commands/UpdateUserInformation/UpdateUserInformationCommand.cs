﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Commands.UpdateUserInformation;
public record UpdateUserInformationCommand
(
    Guid Id, 
    string FirstName,
    string LastName
) : IRequest<HttpResponseMessage>;
