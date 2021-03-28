using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using ToDoApp.Domain.Identity;

namespace ToDoApp.EFData.Context
{
    public class SeederDB
    {
        public static void SeedDataByAS(IServiceProvider services)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<AppRole>>();
                SeederDB.SeedData(manager, managerRole);
            }
        }

        private static void SeedData(UserManager<AppUser> userManager,
                   RoleManager<AppRole> roleManager)
        {
            var roleResult = roleManager.FindByNameAsync(Roles.Admin).Result;
            if (roleResult == null)
            {
                var roleresult = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.Admin

                }).Result;
            }
            roleResult = roleManager.FindByNameAsync(Roles.User).Result;
            if (roleResult == null)
            {
                var roleresult = roleManager.CreateAsync(new AppRole
                {
                    Name = Roles.User

                }).Result;
            }

            var email = "admin@gmail.com";

            var findUser = userManager.FindByEmailAsync(email).Result;
            if (findUser == null)
            {
                var user = new AppUser
                {
                   
                    UserName = email,
                    
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;

                result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
            }
        }
    }
}
