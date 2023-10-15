using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using FitnessApp.Application.Common.S3Bucket;
using MediatR;

namespace FitnessApp.Application.S3Bucket.Queries.GetFile;
public class GetFileQueryHandler : IRequestHandler<GetFileQuery, FileUrlResponse>
{
    private readonly IAmazonS3 _s3Client;

    public GetFileQueryHandler(IAmazonS3 s3Client)
    {
        _s3Client = s3Client;
    }

    public async Task<FileUrlResponse> Handle(GetFileQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var bucketExists = await Amazon.S3.Util.AmazonS3Util.DoesS3BucketExistV2Async(_s3Client, request.BucketName);
            if (!bucketExists)
            {
                return new FileUrlResponse("", "");
            }
            var fileToGet = new GetPreSignedUrlRequest
            {
                BucketName = request.BucketName,
                Key = request.FileName,
                Expires = DateTime.UtcNow.AddDays(3)
            };
            
            string presignedUrl = _s3Client.GetPreSignedURL(fileToGet);

            return new FileUrlResponse(request.FileName, presignedUrl);
        }
        catch (Exception ex) 
        {
            Console.WriteLine(ex);
        }
    }
}
