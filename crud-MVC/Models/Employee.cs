using System;

namespace crud_MVC.Models
{
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        public byte[] Image { get; set; }

        public string ImageBase64
        {
            get { return Convert.ToBase64String(Image ?? new byte[0]); }
            set { Image = string.IsNullOrEmpty(value) ? null : Convert.FromBase64String(value); }
        }
    }


}
