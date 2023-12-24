using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FitnessApp.Application.Common.Interfaces.Persistence;
using FitnessApp.Domain.Entities;
using FitnessApp.Infrastructure.Contexts;

namespace FitnessApp.Infrastructure.Persistence;
public class ResetPasswordHandlerRepository : IResetPasswordHandlerRepository
{
    private readonly FitnessContext _resetPasswordContext;

    public ResetPasswordHandlerRepository(FitnessContext resetPasswordContext)
    {
        _resetPasswordContext = resetPasswordContext;
    }

    public void AddNewResetCode(PasswordResetHolder passwordResetHolder)
    {
        var activeHolders = _resetPasswordContext.PasswordResetHolders
            .Where(u => u.UserId == passwordResetHolder.UserId && u.Active == true).ToList();
        if (activeHolders.Count > 0) 
        {
            foreach (var item in activeHolders)
            {
                item.Active = false;
            }
        }
        _resetPasswordContext.Add(passwordResetHolder);
        _resetPasswordContext.SaveChanges();
    }

    public PasswordResetHolder? GetActivePasswordResetHolderForUser(Guid id)
    {
        return _resetPasswordContext.PasswordResetHolders
            .FirstOrDefault(u => u.UserId == id && u.Active == true && u.ExpirationTime >= DateTime.Now);
    }
}
