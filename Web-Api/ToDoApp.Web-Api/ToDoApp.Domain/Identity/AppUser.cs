﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoApp.Domain.Identity
{
    public class AppUser:IdentityUser<long>
    {

        public virtual ICollection<AppUserRole> UserRoles { get; set; }
    }

}
