using System;
using System.Collections.Generic;
using System.Text;

namespace ToDoApp.Domain.Entities
{
    public class ToDo
    {
        public int Id { get; set; }
        public String Name { get; set; }
        public Category Category { get; set; }
        public String Description { get; set; }
        public DateTime Deadline { get; set; } 
        public DateTime DataCreate { get; set; }
    }
}
