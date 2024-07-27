using crud_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace crud_MVC.Controllers
{
    public class HomeController : Controller
    {
        EmployeeDB empDB = new EmployeeDB();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var employees = empDB.ListAll();
            var jsonResult = Json(employees, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue; 
            return jsonResult;
        }

        public JsonResult Add(Employee emp)
        {
            return Json(empDB.Add(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            try
            {
                var employee = empDB.ListAll().Find(x => x.EmployeeID == ID);
                if (employee == null)
                    return Json(new { success = false, message = "Employee not found" }, JsonRequestBehavior.AllowGet);

                return Json(employee, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return Json(new { success = false, message = "Internal server error: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        public JsonResult Update(Employee emp)
        {
            try
            {
                var result = empDB.Update(emp);
                return Json(new { success = true, result = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return Json(new { success = false, message = "Internal server error: " + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




        public JsonResult Delete(int ID)
        {
            return Json(empDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}