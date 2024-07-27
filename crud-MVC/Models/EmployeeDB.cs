using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace crud_MVC.Models
{
    public class EmployeeDB
    {
        string cs = ConfigurationManager.ConnectionStrings["DESKTOP-CVAB6HE\\SQLEXPRESS01"].ConnectionString;

        public List<Employee> ListAll()
        {
            List<Employee> lst = new List<Employee>();

            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();

                SqlCommand com = new SqlCommand("SelectEmployee", conn);
                com.CommandType = CommandType.StoredProcedure;

                SqlDataReader dr = com.ExecuteReader();

                while (dr.Read())
                {
                    lst.Add(new Employee
                    {
                        EmployeeID = Convert.ToInt32(dr["EmployeeID"]),
                        Name = dr["Name"].ToString(),
                        Age = Convert.ToInt32(dr["Age"]),
                        State = dr["State"].ToString(),
                        Country = dr["Country"].ToString(),
                        Gender = dr["Gender"].ToString(),
                        Image = dr["Image"] as byte[],
                        ImageBase64 = Convert.ToBase64String(dr["Image"] as byte[] ?? new byte[0])
                    });

                }
            }

            return lst;
        }

        public int Add(Employee emp)
        {
            int i;

            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();

                SqlCommand com = new SqlCommand("InsertUpdateEmployee", conn);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@Id", emp.EmployeeID);
                com.Parameters.AddWithValue("@Name", emp.Name);
                com.Parameters.AddWithValue("@Age", emp.Age);
                com.Parameters.AddWithValue("@State", emp.State);
                com.Parameters.AddWithValue("@Country", emp.Country);
                com.Parameters.AddWithValue("@Gender", emp.Gender);
                com.Parameters.AddWithValue("@Image", emp.Image);
                com.Parameters.AddWithValue("@Action", "Insert");

                i = com.ExecuteNonQuery();
            }

            return i;
        }

        public int Update(Employee emp)
{
    try
    {
        using (SqlConnection conn = new SqlConnection(cs))
        {
            conn.Open();
            SqlCommand com = new SqlCommand("InsertUpdateEmployee", conn);
            com.CommandType = CommandType.StoredProcedure;
            com.Parameters.AddWithValue("@Id", emp.EmployeeID);
            com.Parameters.AddWithValue("@Name", emp.Name);
            com.Parameters.AddWithValue("@Age", emp.Age);
            com.Parameters.AddWithValue("@State", emp.State);
            com.Parameters.AddWithValue("@Country", emp.Country);
            com.Parameters.AddWithValue("@Gender", emp.Gender);
            com.Parameters.AddWithValue("@Image", emp.Image);
            com.Parameters.AddWithValue("@Action", "Update");
            return com.ExecuteNonQuery();
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex.ToString());
        throw; // Rethrow to let the controller catch it and log it
    }
}


        public int Delete(int ID)
        {
            int i;

            using (SqlConnection conn = new SqlConnection(cs))
            {
                conn.Open();

                SqlCommand com = new SqlCommand("DeleteEmployee", conn);
                com.CommandType = CommandType.StoredProcedure;

                com.Parameters.AddWithValue("@Id", ID);

                i = com.ExecuteNonQuery();
            }

            return i;
        }
    }
}
