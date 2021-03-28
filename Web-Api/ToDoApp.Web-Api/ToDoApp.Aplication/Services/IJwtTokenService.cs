using System;
using System.Collections.Generic;
using System.Text;
using ToDoApp.Domain.Identity;

namespace ToDoApp.Aplication.Services
{
    public interface IJwtTokenService
    {
        string CreateToken(AppUser user);

    }
}
