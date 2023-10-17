using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using MediatR;

namespace FitnessApp.Application.S3Bucket.Commands.DeleteFile;
public class DeleteFileCommandHandler : IRequestHandler<DeleteFileCommand, HttpResponseMessage>
{

    private readonly IAmazonS3 _s3Client;

    public DeleteFileCommandHandler(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    public async Task<HttpResponseMessage> Handle(DeleteFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, request.BucketName);
            if (!bucketExists)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("Such bucket does not exist"),
                };
            }

            await _s3Client.DeleteObjectAsync(request.BucketName, request.FileName);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("File deleted successfully"),
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