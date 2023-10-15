using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using MediatR;

namespace FitnessApp.Application.S3Bucket.Commands.AddFile;
public class AddFileCommandHandler : IRequestHandler<AddFileCommand, HttpResponseMessage>
{

    private readonly IAmazonS3 _s3Client;

    public AddFileCommandHandler(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    public async Task<HttpResponseMessage> Handle(AddFileCommand request, CancellationToken cancellationToken)
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

            var fileToAdd = new PutObjectRequest()
            {
                BucketName = request.BucketName,
                Key = request.FolderName,
                InputStream = request.File.OpenReadStream()
            };
            fileToAdd.Metadata.Add("Content-Type", request.File.ContentType);
            await _s3Client.PutObjectAsync(fileToAdd);

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent("File uploaded successfully"),
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
