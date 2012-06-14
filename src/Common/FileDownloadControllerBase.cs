using System;
using System.Web;
using System.Web.Mvc;

namespace MvcDemo.Common
{
    public class FileDownloadControllerBase : Controller
    {
        protected override void OnResultExecuting(ResultExecutingContext context)
        {
            CheckAndHandleFileResult(context);

            base.OnResultExecuting(context);
        }


        private const string FILE_DOWNLOAD_COOKIE_NAME = "fileDownload";

        /// <summary>
        /// If the current response is a FileResult (an MVC base class for files) then write a
        /// cookie to inform jquery.fileDownload that a successful file download has occured
        /// </summary>
        /// <param name="context"></param>
        private void CheckAndHandleFileResult(ResultExecutingContext context)
        {
            if (context.Result is FileResult)
                //jquery.fileDownload uses this cookie to determine that a file download has completed successfully
                Response.SetCookie(new HttpCookie(FILE_DOWNLOAD_COOKIE_NAME, "true"){Path = "/"});
            else
                //ensure that the cookie is removed in case someone did a file download without using jquery.fileDownload
                if (Request.Cookies[FILE_DOWNLOAD_COOKIE_NAME] != null)
                    Response.Cookies[FILE_DOWNLOAD_COOKIE_NAME].Expires = DateTime.Now.AddYears(-1);
        }
    }
}