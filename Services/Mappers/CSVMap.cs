using CsvHelper.Configuration;
using Dal.ViewModels;

namespace Services.Mappers
{
    public class CSVMap : ClassMap<CSVModel>
    {
        public CSVMap()
        {
            Map(m => m.BusinessName).Name("Business name");
            Map(m => m.Description1).Name("Description 1");
            Map(m => m.Description2).Name("Description 2");
            Map(m => m.Description3).Name("Description 3");
            Map(m => m.Description4).Name("Description 4");
            Map(m => m.Description6).Name("Description 6");
            Map(m => m.Description5).Name("Description 5");
            Map(m => m.VerificationURL).Name("Verification URL");
            Map(m => m.Headline1).Name("Headline 1");
            Map(m => m.Headline2).Name("Headline 2");
            Map(m => m.Headline3).Name("Headline 3");
            Map(m => m.Headline4).Name("Headline 4");
            Map(m => m.Headline5).Name("Headline 5");
            Map(m => m.Headline6).Name("Headline 6");
            Map(m => m.Path1).Name("Path 1");
            Map(m => m.Path2).Name("Path 2");
            Map(m => m.MatchType).Name("Match Type");
        }
    }
}
