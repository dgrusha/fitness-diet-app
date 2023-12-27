using System.Security.Claims;
using FitnessApp.Application.Common.Helpers;
using FitnessApp.Application.Common.UserProfile;
using FitnessApp.Application.S3Bucket.Commands.AddFile;
using FitnessApp.Application.S3Bucket.Commands.DeleteFile;
using FitnessApp.Application.S3Bucket.Queries.GetFile;
using FitnessApp.Application.UserProfile.Commands.DeleteUnverifiedCoach;
using FitnessApp.Application.UserProfile.Commands.UpdateCoachStatus;
using FitnessApp.Application.UserProfile.Commands.UpdateUserAvatar;
using FitnessApp.Application.UserProfile.Commands.UpdateUserInformation;
using FitnessApp.Application.UserProfile.Queries.GetAllUsers;
using FitnessApp.Application.UserProfile.Queries.GetNotVerifiedCoaches;
using FitnessApp.Application.UserProfile.Queries.GetUserCoach;
using FitnessApp.Application.UserProfile.Queries.GetUserInformation;
using FitnessApp.Application.UserProfile.Queries.GetUserStatuses;
using FitnessApp.Contracts.UserProfile;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessApp.Api.Controllers
{
    [Route("userProfile")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IHashing _hashing;

        public UserProfileController(IMediator mediator, IHashing hashing)
        {
            _mediator = mediator;
            _hashing = hashing;
        }

        [HttpGet("getUserStatuses")]
        public async Task<IActionResult> GetUserStatuses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var query = new GetUserStatusesQuery(new Guid(userId));
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("getAllUsersExceptMe")]
        public async Task<IActionResult> GetAllUsersExceptMe() 
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var query = new GetAllUserQuery(new Guid(userId));
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("getNotVerifiedCoaches")]
        public async Task<IActionResult> GetNotVerifiedCoaches()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetNotVerifiedCoachesQuery(new Guid(userId));
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut("updateCoach")]
        public async Task<IActionResult> Post(UpdateCoachVerificationRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new UpdateCoachStatusCommand(new Guid(userId), request.Email);
            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }

        [HttpDelete("deleteUser")]
        public async Task<IActionResult> Delete(DeleteUnverifiedCoachRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var command = new DeleteUnverifiedCoachCommand(new Guid(userId), request.Email);
            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }

        [HttpGet("getUser")]
        public async Task<IActionResult> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetUserInformationQuery(new Guid(userId));

            var result = await _mediator.Send(query);

            if (result.Data != null &&  result.Data.AvatarFileName != null && result.Data.AvatarFileName != string.Empty) 
            {
                var queryGetAvatarUrl = new GetFileQuery("fitnessdietbucket", $"photos/{result.Data.AvatarFileName}");
                var resultGetAvatar = await _mediator.Send(queryGetAvatarUrl);
                var resultTmp = new GetUserProfileResult(
                    result.Data.FirstName,
                    result.Data.LastName,
                    result.Data.Email,
                    result.Data.HasObligatoryForm,
                    resultGetAvatar.PresignedUrl
                );
                result.Data = resultTmp;
            }

            
            return Ok(result);
        }

        [HttpPut("updatedUser")]
        public async Task<IActionResult> Update([FromForm] UpdateUserInfoRequest request)
        {   
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (request.Photo != null && request.Photo.Length > 0)
            {
                var fileNameHashed = $"{_hashing.HashFileName(request.Photo.FileName)}{Path.GetExtension(request.Photo.FileName)}";
                var commandUpload = new AddFileCommand
                    (
                        request.Photo,
                        "fitnessdietbucket",
                        $"photos/{fileNameHashed}"
                    );
                var resultUpload = await _mediator.Send(commandUpload);

                if (resultUpload.IsSuccessStatusCode)
                {
                    var commandUpdateAvatar = new UpdateUserAvatarCommand(new Guid(userId), fileNameHashed);

                    var resultUpdateAvatar = await _mediator.Send(commandUpdateAvatar);

                    if (resultUpdateAvatar != null && resultUpdateAvatar != string.Empty) 
                    {
                        var commandDeleteFile = new DeleteFileCommand(
                            "fitnessdietbucket",
                            $"photos/{resultUpdateAvatar}"
                            );
                        await _mediator.Send(commandDeleteFile);
                    }
                }
            }

            var command = new UpdateUserInformationCommand(new Guid(userId), request.FirstName, request.LastName);

            var result = await _mediator.Send(command);

            return StatusCode((int)result.StatusCode, await result.Content.ReadAsStringAsync());
        }


        [HttpGet("getUserCoach")]
        public async Task<IActionResult> GetUserCoach()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var query = new GetUserCoachQuery(new Guid(userId));
            var result = await _mediator.Send(query);

            return Ok(result);
        }
    }
}
