using CsvHelper;
using Dal.ViewModels;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace Services.Helpers
{
  public interface ICSVHelper
  {
    List<CSVUSStateModel> GetStateModel();
  }
  public class CSVHelper : ICSVHelper
  {
    public List<CSVUSStateModel> GetStateModel()
    {
      IEnumerable<CSVUSStateModel> records;
      using (var reader = new StreamReader(@"B:\Work\compaingapp\Campaing App\WebApp\wwwroot\doc\usstatecode.csv")) //TODO add to data base
      using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
      {
        records = csv.GetRecords<CSVUSStateModel>();
        return records.ToList();
      }

    }
  }
}
