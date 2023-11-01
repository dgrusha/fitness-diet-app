using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace FitnessApp.Application.S3Bucket.Commands.AddFile;
public record AddFileCommand
(
    IFormFile File,
    string BucketName, 
    string FolderName
) : IRequest<HttpResponseMessage>;