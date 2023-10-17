using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace FitnessApp.Application.S3Bucket.Commands.DeleteFile;
public record DeleteFileCommand
(
    string BucketName,
    string FileName
): IRequest<HttpResponseMessage>;
