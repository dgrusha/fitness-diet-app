using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.S3Bucket;
using MediatR;

namespace FitnessApp.Application.S3Bucket.Queries.GetFile;
public record GetFileQuery
(
    string BucketName, 
    string FileName
): IRequest<FileUrlResponse>;
