using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using MVCWithAngular.Models;

namespace MVCWithAngular.Controllers
{
    public class DataController : Controller
    {
        //The controller action below is resposible for returning the last record
        public JsonResult getLastRecord()
        {
            Contact c = null;
            //Below is our Database Entities or our Database Context within the using statement
            using (MyDatabaseEntities2 EDM = new MyDatabaseEntities2())
            {
                c = EDM.Contacts.OrderByDescending(a => a.ContactId).Take(1).FirstOrDefault();

            }

            return new JsonResult{ Data = c, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        

        }

        public JsonResult UserLogin(LoginData d)
        {
            using (MyDatabaseEntities2 EDM = new MyDatabaseEntities2())
            {
                var user = EDM.Users.Where(a => a.Username.Equals(d.Username) && a.Password.Equals(d.Password)).FirstOrDefault();
                return new JsonResult { Data = user, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
        }



    }

    }
