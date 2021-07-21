using Core.Compaings;
using Dal.Context;
using Dal.ViewModels;
using Google.Ads.GoogleAds.Examples;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V8.Common;
using Google.Ads.GoogleAds.V8.Errors;
using Google.Ads.GoogleAds.V8.Resources;
using Google.Ads.GoogleAds.V8.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Google.Ads.GoogleAds.V8.Enums.AdGroupAdStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdGroupStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdvertisingChannelSubTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdvertisingChannelTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AppCampaignAppStoreEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AppCampaignBiddingStrategyGoalTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.BudgetDeliveryMethodEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.CampaignStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.CriterionTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Resources.Campaign.Types;

namespace Services.Compaing
{
  public interface IGoogleService
  {
    Task<GoogleResponceViewModel> PostCurrentCampaing(string userId, GoogleAdsClient client, long customerId);
  }
  public class GoogleService : IGoogleService
  {
    private CampaingContext campaingContext;

    private ADCompaing aDCompaing;

    public GoogleService(CampaingContext campaingContext)
    {
      this.campaingContext = campaingContext;
    }

    public async Task<GoogleResponceViewModel> PostCurrentCampaing(string userId, GoogleAdsClient client, long customerId)
    {
      aDCompaing = await campaingContext.Compaings.Include(x=>x.CompaingGroups).ThenInclude(x => x.KeyWords).FirstOrDefaultAsync();

      // Creates a budget for the campaign.
      string budgetResourceName = CreateBudget(client, customerId);

      // Creates the campaign.
      string campaignResourceName = CreateCampaign(client, customerId,
          budgetResourceName);

      // Sets campaign targeting.
      SetCampaignTargetingCriteria(client, customerId, campaignResourceName);

      // Creates an ad group.
      string adGroupResourceName = CreateAdGroup(client, customerId,
          campaignResourceName);

      throw new NotImplementedException();
    }

    /// <summary>
    /// Creates an ad group for a given campaign
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="campaignResourceName">Resource name of the campaign to add the ad group
    /// to.</param>
    /// <returns>The resource name of the newly created ad group.</returns>
    private string CreateAdGroup(GoogleAdsClient client, long customerId,
        string campaignResourceName)
    {
      // Get the AdGroupService.
      AdGroupServiceClient adGroupService = client.GetService(Google.Ads.GoogleAds.Services.V8.AdGroupService);

      // Creates an ad group.
      // Note that the ad group type must not be set.
      // Since the advertising_channel_sub_type is APP_CAMPAIGN,
      //   1. you cannot override bid settings at the ad group level.
      //   2. you cannot add ad group criteria.

      var  operations = new List<AdGroupOperation>();

      foreach (var item in aDCompaing.CompaingGroups)
      {
        AdGroup adGroup = new AdGroup()
        {
          Name = $"Earth to Mars Cruises #{ExampleUtilities.GetRandomString()}",
          Status = AdGroupStatus.Enabled,
          Campaign = item.AdGroup
        };

        // Creates an ad group operation.
        // Create the operation.
        AdGroupOperation operation = new AdGroupOperation()
        {
          Create = adGroup
        };
        operations.Add(operation);
      }
    

      // Submits the ad group operation to add the ad group and prints the results.
      MutateAdGroupsResponse response =
          adGroupService.MutateAdGroups(customerId.ToString(), operations);

      // Prints and returns the ad group resource name.
      string adGroupResourceName = response.Results[0].ResourceName;
      Console.WriteLine($"Created an ad group with resource name '{adGroupResourceName}'.");
      return adGroupResourceName;
    }

    /// <summary>
    /// Creates the budget for the campaign.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <returns>The resource name of the newly created campaign budget.</returns>
    private string CreateBudget(GoogleAdsClient client, long customerId)
    {
      // Get the BudgetService.
      CampaignBudgetServiceClient budgetService = client.GetService(
          Google.Ads.GoogleAds.Services.V8.CampaignBudgetService);

      // Creates a campaign budget.
      CampaignBudget budget = new CampaignBudget()
      {
        Name = "Interplanetary Cruise Budget #" + ExampleUtilities.GetRandomString(),
        DeliveryMethod = BudgetDeliveryMethod.Standard,
        AmountMicros = (long)aDCompaing.Budget,
        // An App campaign cannot use a shared campaign budget.
        // explicitly_shared must be set to false.
        ExplicitlyShared = false
      };


      // Create the operation.
      CampaignBudgetOperation budgetOperation = new CampaignBudgetOperation()
      {
        Create = budget
      };

      // Create the campaign budget.
      MutateCampaignBudgetsResponse response = budgetService.MutateCampaignBudgets(
          customerId.ToString(), new CampaignBudgetOperation[] { budgetOperation });

      string budgetResourceName = response.Results[0].ResourceName;
      Console.WriteLine($"Created campaign budget with resource name " +
          $"'{budgetResourceName}'.");

      return budgetResourceName;
    }

    /// <summary>
    /// Creates an App campaign under the given customer ID.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="budgetResourceName">The budget resource name.</param>
    /// <returns>Resource name of the newly created campaign.</returns>
    private string CreateCampaign(GoogleAdsClient client, long customerId,
        string budgetResourceName)
    {
      // Get the CampaignService.
      CampaignServiceClient campaignService = client.GetService(Google.Ads.GoogleAds.Services.V8.CampaignService);

      // Create the campaign.
      Campaign campaign = new Campaign()
      {
        Name = aDCompaing.Name,
        CampaignBudget = budgetResourceName,

        // Recommendation: Set the campaign to PAUSED when creating it to prevent
        // the ads from immediately serving. Set to ENABLED once you've added
        // targeting and the ads are ready to serve
        Status = CampaignStatus.Paused,

        // All App campaigns have an advertising_channel_type of
        // MULTI_CHANNEL to reflect the fact that ads from these campaigns are
        // eligible to appear on multiple channels.
        AdvertisingChannelType = AdvertisingChannelType.MultiChannel,
        AdvertisingChannelSubType = AdvertisingChannelSubType.AppCampaign,

        // Sets the target CPA to $1 / app install.
        //
        // campaign_bidding_strategy is a 'oneof' message so setting target_cpa
        // is mutually exclusive with other bidding strategies such as
        // manual_cpc, commission, maximize_conversions, etc.
        // See https://developers.google.com/google-ads/api/reference/rpc
        // under current version / resources / Campaign.
        TargetCpa = new TargetCpa()
        {
          TargetCpaMicros = 1000000
        },

        // Sets the App campaign settings.
        AppCampaignSetting = new AppCampaignSetting()
        {
          AppId = "com.google.android.apps.adwords",
          AppStore = AppCampaignAppStore.GoogleAppStore,
          // Optional: Optimize this campaign for getting new users for your app.
          BiddingStrategyGoalType =
                  AppCampaignBiddingStrategyGoalType.OptimizeInstallsTargetInstallCost
        },

        //// Optional: Set the start date.
        //StartDate = DateTime.Now.AddDays(1).ToString("yyyyMMdd"),

        //// Optional: Set the end date.
        //EndDate = DateTime.Now.AddYears(1).ToString("yyyyMMdd"),
      };

      // Creates a campaign operation.
      CampaignOperation operation = new CampaignOperation()
      {
        Create = campaign
      };

      // Add the campaigns.
      MutateCampaignsResponse response = campaignService.MutateCampaigns(
          customerId.ToString(), new CampaignOperation[] { operation });

      // Display the results.
      string campaignResourceName = response.Results[0].ResourceName;

      return campaignResourceName;
    }

    /// <summary>
    /// Sets campaign targeting criteria for a given campaign. Both location and language
    /// targeting are illustrated.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="campaignResourceName">The resource name of the campaign to apply
    /// targeting to.</param>
    private void SetCampaignTargetingCriteria(GoogleAdsClient client, long customerId,
        string campaignResourceName)
    {
      // Get the CampaignCriterionService.
      CampaignCriterionServiceClient campaignCriterionService = client.GetService(Google.Ads.GoogleAds.
          Services.V8.CampaignCriterionService);

      List<CampaignCriterionOperation> operations = new List<CampaignCriterionOperation>();

      // Creates the location campaign criteria.
      // Besides using location_id, you can also search by location names from
      // GeoTargetConstantService.suggestGeoTargetConstants() and directly
      // apply GeoTargetConstant.resource_name here. An example can be found
      // in GetGeoTargetConstantByNames.cs.
      int[] locationIds = new int[]
      {
                21137, // California
                2484 // Mexico
      };

      foreach (int locationId in locationIds)
      {
        // Creates a campaign criterion.
        CampaignCriterion campaignCriterion = new CampaignCriterion()
        {
          Campaign = campaignResourceName,
          Type = CriterionType.Location,
          Location = new LocationInfo()
          {
            GeoTargetConstant = ResourceNames.GeoTargetConstant(locationId)
          }
        };

        // Creates a campaign criterion operation.
        CampaignCriterionOperation operation = new CampaignCriterionOperation()
        {
          Create = campaignCriterion
        };

        operations.Add(operation);
      }

      // Creates the language campaign criteria.
      int[] languageIds = new int[]
      {
                1000, // English
                1003 // Spanish
      };

      foreach (int languageId in languageIds)
      {
        // Creates a campaign criterion.
        CampaignCriterion campaignCriterion = new CampaignCriterion()
        {
          Campaign = campaignResourceName,
          Type = CriterionType.Language,
          Language = new LanguageInfo()
          {
            LanguageConstant = ResourceNames.LanguageConstant(languageId)
          }
        };

        // Creates a campaign criterion operation.
        CampaignCriterionOperation operation = new CampaignCriterionOperation()
        {
          Create = campaignCriterion
        };

        operations.Add(operation);
      }

      // Submits the criteria operations and prints their information.
      MutateCampaignCriteriaResponse response =
          campaignCriterionService.MutateCampaignCriteria(customerId.ToString(), operations);
      Console.WriteLine($"Created {response.Results.Count} campaign criteria with " +
          $"resource names:");

      foreach (MutateCampaignCriterionResult result in response.Results)
      {
        Console.WriteLine(result.ResourceName);
      }
    }
  }
}
