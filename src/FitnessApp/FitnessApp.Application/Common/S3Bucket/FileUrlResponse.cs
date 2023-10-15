using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.S3Bucket;
public record FileUrlResponse
(
    string? Name, 
    string? PresignedUrl
);
