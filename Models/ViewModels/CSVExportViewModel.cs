using System.Text;

namespace Dal.ViewModels
{
    public class CSVExportViewModel
    {
        public string FileName { get; set; }
        public StringBuilder data { get; set; }
    }
}
