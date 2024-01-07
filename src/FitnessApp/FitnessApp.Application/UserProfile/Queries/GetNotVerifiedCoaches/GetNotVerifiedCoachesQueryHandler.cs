using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using MediatR;
using Newtonsoft.Json;

namespace FitnessApp.Application.UserProfile.Queries.GetNotVerifiedCoaches;
public class GetNotVerifiedCoachesQueryHandler : IRequestHandler<GetNotVerifiedCoachesQuery, string>
{

    private readonly IUserRepository _userRepository;
    private readonly IAmazonS3 _s3Client;

    public GetNotVerifiedCoachesQueryHandler(IUserRepository userRepository, IAmazonS3 s3Client)
    {
        _userRepository = userRepository;
        _s3Client = s3Client;
    }

    public async Task<string> Handle(GetNotVerifiedCoachesQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.UserId) is not User user)
        {
            return await Task.FromResult("[]");
        };

        if (user.IsAdmin == false)
        {
            return await Task.FromResult("[]");
        }

        List<CoachDto> coaches = _userRepository.GetNotVerifiedCoaches();

        if (coaches == null || coaches.Count == 0)
        {
            return await Task.FromResult("[]");
        }
        else
        {
            foreach (CoachDto coachDto in coaches)
            {
                var cv = new GetPreSignedUrlRequest
                {
                    BucketName = "fitnessdietbucket",
                    Key = coachDto.CVFileName,
                    Expires = DateTime.UtcNow.AddDays(3)
                };

                string cvUrl = _s3Client.GetPreSignedURL(cv);
                coachDto.CVFileName = cvUrl;
            }
        }
        var jsonResult = JsonConvert.SerializeObject(coaches, Formatting.Indented);

        return await Task.FromResult(jsonResult);
    }
}
