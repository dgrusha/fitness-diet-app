﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp.Application.Common.Helpers;
public interface IHashing
{
    string HashFileName(string name);

    string GetUniqueName(string sender, string receiver);
}
