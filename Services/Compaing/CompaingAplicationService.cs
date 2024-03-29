﻿using Core.Compaings;
using Core.KeyWords;
using Core.Widgets;
using CsvHelper;
using Dal.Context;
using Dal.ViewModels;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using WebApp.ViewModels;
using static Google.Ads.GoogleAds.V8.Enums.KeywordMatchTypeEnum.Types;

namespace Services.Compaing
{
  public interface ICompaingAplicationService
  {
    Task<ADCompaing> AddAsync(CampaignViewModel value, string userId);
    List<CSVModel> GetCSVByIdAsync(CampaignViewModel model);
    Task SaveKeyWords(KeyWordsViewModel model);
  }
  public class CompaingAplicationService : ICompaingAplicationService
  {
    private CampaingContext campaingContext;

    public CompaingAplicationService(CampaingContext campaingContext)
    {
      this.campaingContext = campaingContext;
    }

    public async Task<ADCompaing> AddAsync(CampaignViewModel campaignViewModel, string userId)
    {

      var ddd = await campaingContext.Compaings.Include(x => x.CompaingGroups).ThenInclude(x => x.KeyWords).Where(x => x.UserId == userId).ToListAsync();
      var db_campaign = new ADCompaing
      {
        ValidFlag = true,

        Name = campaignViewModel.Name,
        Budget = campaignViewModel.Budget,
        Exact = campaignViewModel.Exact,
        Phrase = campaignViewModel.Phrase,
        Modifier = campaignViewModel.Modifier,
        Broad = campaignViewModel.Broad,
        NegativePhrase = campaignViewModel.NegativePhrase,
        Skag = campaignViewModel.Skag,
        Stag = campaignViewModel.Stag,
        UserId = userId
      };

      db_campaign.CompaingGroups = new List<CompaingGroup>();
      foreach (var item in campaignViewModel.AdGroupList)
      {
        var adGroup = new CompaingGroup
        {
          AdGroup = item.AdGroup,
          KeyWords = new List<CompaingKeyWord>()
        };



        var keyWord = item.Keywords.Where(x => x != null).FirstOrDefault().ToLower();

        if (campaignViewModel.Exact)
        {
          var keyWordDb = new CompaingKeyWord
          {
            KeyWords = new List<string>(),
            KeywordGroupName = item.AdGroup
          };

          keyWordDb.KeywordMatchType = KeywordMatchType.Exact;
          keyWordDb.KeyWords.Add(keyWord);
          adGroup.KeyWords.Add(keyWordDb);
        }

        if (campaignViewModel.Phrase)
        {
          var keyWordDb = new CompaingKeyWord
          {
            KeyWords = new List<string>(),
            KeywordGroupName = item.AdGroup
          };

          keyWordDb.KeywordMatchType = KeywordMatchType.Phrase;
          keyWordDb.KeyWords.Add(keyWord);
          adGroup.KeyWords.Add(keyWordDb);
        }

        if (campaignViewModel.Broad)
        {
          var keyWordDb = new CompaingKeyWord
          {
            KeyWords = new List<string>(),
            KeywordGroupName = item.AdGroup
          };

          keyWordDb.KeywordMatchType = KeywordMatchType.Broad;
          keyWordDb.KeyWords.Add(keyWord);
          adGroup.KeyWords.Add(keyWordDb);
        }

        var listTxtAd = new List<ExpTxtAd>();
        foreach (var adModel in item.ExpTxtAds)
        {
          var textAd = new ExpTxtAd();
          textAd.AdGroupName = item.AdGroup;
          textAd.DescriptionOne = adModel.DescriptionOne;
          textAd.DescriptionTwo = adModel.DescriptionTwo;
          textAd.FinalURL = adModel.FinalURL;
          textAd.HeadlineOne = adModel.HeadlineOne;
          textAd.HeadlineTwo = adModel.HeadlineTwo;
          textAd.HeadlineThree = adModel.HeadlineThree;
          textAd.PathOne = adModel.PathOne;
          textAd.PathTwo = adModel.PathTwo;
          listTxtAd.Add(textAd);
        }

        adGroup.ExpTxtAds = listTxtAd;


        var listCallOnlyAd = new List<CallOnlyAd>();
        foreach (var adModel in item.CallOnlyAds)
        {
          var textAd = new CallOnlyAd();
          textAd.AdGroupName = item.AdGroup;
          textAd.DescriptionOne = adModel.DescriptionOne;
          textAd.DescriptionTwo = adModel.DescriptionTwo;
          textAd.PhoneNumber = adModel.PhoneNumber;
          textAd.HeadlineOne = adModel.HeadlineOne;
          textAd.HeadlineTwo = adModel.HeadlineTwo;
          textAd.BusinessName = adModel.BusinessName;
          textAd.VerificationURL = adModel.VerificationURL;
          textAd.Country = adModel.Country;
          listCallOnlyAd.Add(textAd);
        }

        adGroup.CallOnlyAds = listCallOnlyAd;

        var listRespSerachAd = new List<RespSearchAd>();
        foreach (var adModel in item.RespSearchAds)
        {
          var textAd = new RespSearchAd();
          textAd.AdGroupName = item.AdGroup;
          textAd.DescriptionOne = adModel.DescriptionOne;
          textAd.DescriptionTwo = adModel.DescriptionTwo;
          textAd.FinalURL = adModel.FinalURL;
          textAd.PathOne = adModel.PathOne;
          textAd.PathTwo = adModel.PathTwo;
          textAd.DescriptionThree = adModel.DescriptionThree;
          textAd.DescriptionFour = adModel.DescriptionFour;
          listRespSerachAd.Add(textAd);
        }

        adGroup.RespSearchAds = listRespSerachAd;

        adGroup.Compaing = db_campaign;
        adGroup.ExpTxtAds = listTxtAd;
        db_campaign.CompaingGroups.Add(adGroup);
      }
      await campaingContext.Compaings.AddAsync(db_campaign);
      await campaingContext.SaveChangesAsync();

      return db_campaign;
    }



    public List<CSVModel> GetCSVByIdAsync(CampaignViewModel model)
    {
      var csvModels = new List<CSVModel>();
      var compaignModel = new CSVModel();

      foreach (var item in model.AdGroupList)
      {

        var keyWord = item.Keywords.Where(x => x != null).FirstOrDefault().ToLower();

        if (model.Exact)
        {
          var csvModel = new CSVModel();
          csvModel.Campaign = model.Name;
          csvModel.Status = "Enabled";
          csvModel.AdGroup = item.AdGroup;
          csvModel.Budget = model.Budget.ToString();
          csvModel.Keyword = $"[{keyWord}]";
          csvModels.Add(csvModel);
        }
        if (model.Phrase)
        {
          var csvModel = new CSVModel();
          csvModel.Campaign = model.Name;
          csvModel.Status = "Enabled";
          csvModel.AdGroup = item.AdGroup;
          csvModel.Budget = model.Budget.ToString();
          csvModel.Keyword = $" \"{keyWord}\" ";
          csvModels.Add(csvModel);
        }
        if (model.Modifier)
        {
          var csvModel = new CSVModel();
          csvModel.Campaign = model.Name;
          csvModel.Status = "Enabled";
          csvModel.AdGroup = item.AdGroup;
          csvModel.Budget = model.Budget.ToString();
          csvModel.Keyword = $"+ {keyWord}";
          csvModels.Add(csvModel);
        }
        if (model.Broad)
        {
          var csvModel = new CSVModel();
          csvModel.Campaign = model.Name;
          csvModel.Status = "Enabled";
          csvModel.AdGroup = item.AdGroup;
          csvModel.Budget = model.Budget.ToString();
          csvModel.Keyword = keyWord;
          csvModels.Add(csvModel);
        }
        foreach (var callOnlyAd in item.CallOnlyAds)
        {
          var csvModelAd = new CSVModel();
          csvModelAd.Country = callOnlyAd.Country;
          csvModelAd.Campaign = model.Name;
          csvModelAd.PhoneNumber = callOnlyAd.PhoneNumber;
          csvModelAd.Description1 = callOnlyAd.DescriptionOne;
          csvModelAd.Description2 = callOnlyAd.DescriptionTwo;
          csvModelAd.VerificationURL = callOnlyAd.VerificationURL;
          csvModelAd.BusinessName = callOnlyAd.BusinessName;
          csvModelAd.AdGroup = item.AdGroup;
          csvModels.Add(csvModelAd);
        }

        foreach (var addExt in item.ExpTxtAds)
        {
          var csvModelAdExt = new CSVModel();
          csvModelAdExt.Headline1 = addExt.HeadlineOne;
          csvModelAdExt.Campaign = model.Name;
          csvModelAdExt.Headline2 = addExt.HeadlineTwo;
          csvModelAdExt.Headline3 = addExt.HeadlineThree;
          csvModelAdExt.Description2 = addExt.DescriptionTwo;
          csvModelAdExt.Description1 = addExt.DescriptionOne;
          csvModelAdExt.AdGroup = addExt.AdGroupName;
          csvModelAdExt.FinalURL = addExt.FinalURL;
          csvModelAdExt.Path1 = addExt.PathOne;
          csvModelAdExt.Path2 = addExt.PathTwo;

          csvModels.Add(csvModelAdExt);
        }

        foreach (var searchAd in item.RespSearchAds)
        {
          var csvModelAdSearch = new CSVModel();
          csvModelAdSearch.Campaign = model.Name;
          csvModelAdSearch.Description3 = searchAd.DescriptionThree;
          csvModelAdSearch.Description4 = searchAd.DescriptionFour;
          csvModelAdSearch.Description2 = searchAd.DescriptionTwo;
          csvModelAdSearch.Description1 = searchAd.DescriptionOne;
          csvModelAdSearch.AdGroup = searchAd.AdGroupName;
          csvModelAdSearch.FinalURL = searchAd.FinalURL;
          csvModelAdSearch.Path1 = searchAd.PathOne;
          csvModelAdSearch.Path2 = searchAd.PathTwo;
          csvModels.Add(csvModelAdSearch);
        }

        foreach (var searchAd in item.SnippetExtensions)
        {
          var csvModelSnippet = new CSVModel();
          csvModelSnippet.Campaign = model.Name;
          csvModelSnippet.Language = searchAd.Language;
          csvModelSnippet.AdGroup = searchAd.AdGroupName;
          csvModels.Add(csvModelSnippet);
        }

        if (model.NegativePhrase)
          GetAllNegativePhrase(item.AdGroup, model.AdGroupList, csvModels, model.Name);

      }
     

      return csvModels;
    }

    public Task SaveKeyWords(KeyWordsViewModel model)
    {
      throw new NotImplementedException();
    }

    private void GetAllNegativePhrase(string adGroup, List<AdGroupViewModel> AdGroupList, List<CSVModel> negModels, string name)
    {
      var negativeAdGroup = AdGroupList.Where(x => x.AdGroup != adGroup).ToList();

      foreach (var item in negativeAdGroup)
      {
        var csvModel = new CSVModel();
        csvModel.Campaign = name;
        csvModel.Status = "Enabled";
        csvModel.AdGroup = adGroup;
        csvModel.Keyword = $"-{item.AdGroup.ToLower()}";
        negModels.Add(csvModel);
      }
    }

  }
}
