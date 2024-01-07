using FitnessApp.Application.Common.DTO;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using Newtonsoft.Json;
using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.UserProfile.Queries.GetAllVerifiedCoaches;

public class GetAllVerifiedCoachesQueryHandler : IRequestHandler<GetAllVerifiedCoachesQuery, string>
{
    private readonly IUserRepository _userRepository;
    private readonly IAmazonS3 _s3Client;

    public GetAllVerifiedCoachesQueryHandler(IUserRepository userRepository, IAmazonS3 s3Client)
    {
        _userRepository = userRepository;
        _s3Client = s3Client;
    }

    public async Task<string> Handle(GetAllVerifiedCoachesQuery request, CancellationToken cancellationToken)
    {
        if (_userRepository.GetUserById(request.UserId) is not User user)
        {
            return await Task.FromResult("Such user doesn't exist");
        };

        if (user.Coach != null)
        {
            return await Task.FromResult("Coach can't subscribe for other coach");
        }
        else
        {
            List<CoachDto> coaches;

            coaches = _userRepository.GetAllCoachesExceptMe(request.UserId);

            if (coaches == null || coaches.Count == 0)
            {
                return await Task.FromResult("empty");
            }
            else
            {
                foreach(CoachDto coachDto in coaches)
                {
                    var photo = new GetPreSignedUrlRequest
                    {
                        BucketName = "fitnessdietbucket",
                        Key = "photos/" + coachDto.AvatarFileName,
                        Expires = DateTime.UtcNow.AddDays(3)
                    };

                    string photoUrl = _s3Client.GetPreSignedURL(photo);
                    coachDto.AvatarFileName = photoUrl;

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
}
