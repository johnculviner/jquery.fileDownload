using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using MvcDemo.Common;

namespace MvcDemo.Controllers
{
    public class FileDownloadController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }


        [HttpGet, FileDownload]
        public FilePathResult DownloadReport(int id)
        {
            return GetReport(id);
        }

        [HttpPost, FileDownload]
        public FilePathResult DownloadReportPost(int foo)
        {
            return GetReport(foo);
        }

        private FilePathResult GetReport(int id)
        {
            //simulate generating the report
            Thread.Sleep(3000);

            //only even file ids will work
            if (id % 2 == 0)
                //the required cookie for jquery.fileDownload is written by the FileDownloadAttribute for all
                //result types that inherit from FileResult but could be done manually here if desired
                return File("~/Report.pdf", "application/pdf", string.Format("Report{0}.pdf", id));


            throw new Exception(string.Format("File Report{0}.pdf could not be found. \r\n\r\n NOTE: This is for demonstration purposes only, customErrors should always be enabled in a production environment.", id));
        }
    }
}
