using Core.Compaings;
using Core.Widgets;
using Dal.Context;
using Dal.ViewModels;
using Dal.ViewModels.Responces;
using Google.Ads.GoogleAds.Examples;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V8.Common;
using Google.Ads.GoogleAds.V8.Enums;
using Google.Ads.GoogleAds.V8.Errors;
using Google.Ads.GoogleAds.V8.Resources;
using Google.Ads.GoogleAds.V8.Services;
using Google.Api.Gax;
using Microsoft.EntityFrameworkCore;
using Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Google.Ads.GoogleAds.V8.Enums.AdCustomizerPlaceholderFieldEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdGroupAdStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdGroupCriterionStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdGroupStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.AdvertisingChannelTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.BudgetDeliveryMethodEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.CampaignStatusEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.ExtensionTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.FeedAttributeTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.KeywordMatchTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.PlaceholderTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Enums.ServedAssetFieldTypeEnum.Types;
using static Google.Ads.GoogleAds.V8.Resources.Campaign.Types;

namespace Services.Compaing
{
  public interface IGoogleService
  {
    Task<GoogleResponceViewModel> PostCurrentCampaing(string userId, GoogleAdsClient client, long customerId);
    Task<GoogleAccountListResponce> GetGoogleAccountList(string userId, GoogleAdsClient client);
  }
  public class GoogleService : IGoogleService
  {
    private CampaingContext campaingContext;
    private ICSVHelper iCSVHelper;
    private ADCompaing aDCompaing;

    public GoogleService(CampaingContext campaingContext, ICSVHelper iCSVHelper)
    {
      this.campaingContext = campaingContext;
      this.iCSVHelper = iCSVHelper;
    }

    public async Task<GoogleAccountListResponce> GetGoogleAccountList(string userId, GoogleAdsClient client)
    {
      var user = await campaingContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
      var accountList = new List<GoogleAccount>();
      if (user.IsGoogleUser)
      {
        accountList = GetAccountList(client);
      }

      return new GoogleAccountListResponce { GoogleAccountList = accountList };
    }

    /// <summary>
    /// Get google account list
    /// </summary>
    /// <param name="googleAdsClient">The Google Ads client instance.</param>
    /// will instead list the accounts accessible from the authenticated Google Ads account.
    /// </param>
    public List<GoogleAccount> GetAccountList(GoogleAdsClient googleAdsClient)
    {
      CustomerServiceClient customerService = googleAdsClient.GetService(Google.Ads.GoogleAds.Services.V8.CustomerService);

      var customerList = new List<GoogleAccount>();
      // Retrieve the list of customer resources.
      string[] customerResourceNames = customerService.ListAccessibleCustomers();

      // Display the result.
      foreach (string customerResourceName in customerResourceNames)
      {
        Customer customer = customerService.GetCustomer(customerResourceName);
        var account = new GoogleAccount
        {
          AccountName = customer.DescriptiveName,
          GoogleId = customer.Id
        };
        customerList.Add(account);
      }

      return customerList;
    }

    public async Task<GoogleResponceViewModel> PostCurrentCampaing(string userId, GoogleAdsClient client, long customerId)
    {

      //CreateStatesFeed(client, customerId);
      aDCompaing = await campaingContext.Compaings
      .Include(x => x.CompaingGroups).ThenInclude(x => x.KeyWords)
      .Include(x => x.CompaingGroups).ThenInclude(x => x.RespSearchAds)
      .Include(x => x.CompaingGroups).ThenInclude(x => x.CallOnlyAds)
      .Include(x => x.CompaingGroups).ThenInclude(x => x.ExpTxtAds).OrderBy(x => x).LastOrDefaultAsync();

      var budgetResources = CreateBudget(client, customerId);
      var compResouces = CreateCampaign(client, customerId, budgetResources);
      var adGroupResources = CreateAdGroups(client, customerId, compResouces);
      var compaignId = long.Parse(compResouces.Split('/').Last());
      var adGroups = GetAdGroups(client, customerId, compaignId);

      // Get the AdGroupCriterionService.
      AdGroupCriterionServiceClient adGroupCriterionService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.AdGroupCriterionService);

      // Get the AdGroupAdService.
      AdGroupAdServiceClient adGroupAdService = client.GetService(
          Google.Ads.GoogleAds.Services.V8.AdGroupAdService);


      var keyWordOperationsList = new List<AdGroupCriterionOperation>();
      var expTextAdOperationsList = new List<AdGroupAdOperation>();
      foreach (var adGroup in aDCompaing.CompaingGroups)
      {
        var googelGrop = adGroups.FirstOrDefault(x => x.Name == adGroup.AdGroup);
        var adGroupId = long.Parse(googelGrop.ResourceName.Split('/').Last());

        foreach (var item in adGroup.KeyWords)
        {
          var keyWordOption = CreateKeyWord(customerId, adGroupId, item.KeyWords.FirstOrDefault(), item.KeywordMatchType);
          keyWordOperationsList.Add(keyWordOption);
        }

        foreach (var expTxtAd in adGroup.ExpTxtAds)
        {
          var textAdOption = CreateExpandedTextAd(customerId, adGroupId, expTxtAd);
          expTextAdOperationsList.Add(textAdOption);
        }

        foreach (var respSearchAd in adGroup.RespSearchAds)
        {
          var textAdOption = CreateResponsiveSearchAd(customerId, adGroupId, respSearchAd);
          expTextAdOperationsList.Add(textAdOption);
        }

        foreach (var callhAd in adGroup.CallOnlyAds)
        {
          var textAdOption = CreateCallAd(customerId, adGroupId, callhAd);
          expTextAdOperationsList.Add(textAdOption);
        }

        if (adGroup.Negatives.Count > 0)
        {
          foreach (var neg in adGroup.Negatives)
          {
            var negativeWord = CreateNegativeKeyWord(customerId, adGroupId, neg);
            keyWordOperationsList.Add(negativeWord);
          }
        }

      }

      MutateAdGroupCriteriaResponse retVal =
                    adGroupCriterionService.MutateAdGroupCriteria(customerId.ToString(),
                        keyWordOperationsList.ToArray());

      // Create the ads.
      MutateAdGroupAdsResponse response = adGroupAdService.MutateAdGroupAds(
          customerId.ToString(), expTextAdOperationsList);


      throw new NotImplementedException();
    }

    public List<AdGroup> GetAdGroups(GoogleAdsClient client, long customerId, long? campaignId)
    {
      // Get the AdGroupService.
      GoogleAdsServiceClient googleAdsService = client.GetService(Google.Ads.GoogleAds.Services.V8.GoogleAdsService);

      var adGroupList = new List<AdGroup>();
      string searchQuery = "SELECT campaign.id, ad_group.id, ad_group.name FROM ad_group";
      if (campaignId != null)
      {
        searchQuery += $" WHERE campaign.id = {campaignId}";
      }

      // Retrieve the campaigns.
      PagedEnumerable<SearchGoogleAdsResponse, GoogleAdsRow> searchPagedResponse =
          googleAdsService.Search(customerId.ToString(), searchQuery);

      // Display the results.
      foreach (GoogleAdsRow googleAdsRow in searchPagedResponse)
      {
        AdGroup adGroup = googleAdsRow.AdGroup;
        if (adGroup != null)
        {
          adGroupList.Add(adGroup);

        }
        else
        {
          Console.WriteLine("No ad group found for row.");
        }
      }

      return adGroupList;
    }

    public string CreateStatesFeed(GoogleAdsClient client, long customerId)
    {
      string feedName = "Geo_feed" +
          ExampleUtilities.GetShortRandomString();

      var stateList = iCSVHelper.GetStateModel();

      // Create a feed to be used as the ad customizer.
      string adCustomizerFeedResourceName =
          CreateAdCustomizerFeed(client, customerId, feedName);

      // Retrieve the attributes for the newly created feed.
      Dictionary<string, FeedAttribute> adCustomizerFeedAttributes =
          GetFeedAttributes(client, customerId, adCustomizerFeedResourceName);

      // Map the feed to the ad customizer placeholder type to mark it as an
      // ad customizer.
      CreateAdCustomizerMapping(client, customerId, adCustomizerFeedResourceName,
          adCustomizerFeedAttributes);

      // Create the feed items that will fill the placeholders in the ads customized by
      // the feed.
      var feedItemResourceNames = CreateFeedItems(client, customerId,
          adCustomizerFeedResourceName, adCustomizerFeedAttributes);

      CreateGeo(client, customerId, feedItemResourceNames, stateList);
      return "";
    }

    /// <summary>
    /// Creates an ad group for a given campaign
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="campaignResourceName">Resource name of the campaign to add the ad group
    /// to.</param>
    /// <returns>The resource name of the newly created ad group.</returns>
    private List<string> CreateAdGroups(GoogleAdsClient client, long customerId,
        string campaignResourceName)
    {
      // Get the AdGroupService.
      AdGroupServiceClient adGroupService = client.GetService(Google.Ads.GoogleAds.Services.V8.AdGroupService);

      // Creates an ad group.
      // Note that the ad group type must not be set.
      // Since the advertising_channel_sub_type is APP_CAMPAIGN,
      //   1. you cannot override bid settings at the ad group level.
      //   2. you cannot add ad group criteria.

      var operations = new List<AdGroupOperation>();

      foreach (var item in aDCompaing.CompaingGroups)
      {
        AdGroup adGroup = new AdGroup()
        {
          Name = item.AdGroup,
          Status = AdGroupStatus.Enabled,
          Campaign = campaignResourceName
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

      var listResult = new List<string>();

      foreach (var item in response.Results)
      {
        string adGroupResourceName = item.ResourceName;

        listResult.Add(adGroupResourceName);
      }

      return listResult;
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
        Name = "Budget #" + ExampleUtilities.GetRandomString(),
        DeliveryMethod = BudgetDeliveryMethod.Standard,
        AmountMicros = (long)aDCompaing.Budget,
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

      Campaign campaign = new Campaign()
      {
        Name = aDCompaing.Name + Guid.NewGuid(),
        AdvertisingChannelType = AdvertisingChannelType.Search,

        // Recommendation: Set the campaign to PAUSED when creating it to prevent
        // the ads from immediately serving. Set to ENABLED once you've added
        // targeting and the ads are ready to serve
        Status = CampaignStatus.Paused,

        // Set the bidding strategy and budget.
        ManualCpc = new ManualCpc(),
        CampaignBudget = budgetResourceName,

        // Set the campaign network options.
        NetworkSettings = new NetworkSettings
        {
          TargetGoogleSearch = true,
          TargetSearchNetwork = true,
          TargetContentNetwork = false,
          TargetPartnerSearchNetwork = false
        },

        // Optional: Set the start date.
        StartDate = DateTime.Now.AddDays(1).ToString("yyyyMMdd"),

        // Optional: Set the end date.
        EndDate = DateTime.Now.AddYears(1).ToString("yyyyMMdd"),
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

    private AdGroupCriterionOperation CreateNegativeKeyWord(long customerId, long adGroupId,
            string negativeKeywordText)
    {

      // Create a keyword.
      AdGroupCriterion criterion = new AdGroupCriterion()
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        Status = AdGroupCriterionStatus.Enabled,
        Negative = true,
        Keyword = new KeywordInfo()
        {
          Text = negativeKeywordText,
          MatchType = KeywordMatchType.Phrase
        }
      };

      // Create the operation.
      AdGroupCriterionOperation operation = new AdGroupCriterionOperation()
      {
        Create = criterion,
      };

      return operation;
    }

    private AdGroupCriterionOperation CreateKeyWord(long customerId, long adGroupId,
            string keywordText, KeywordMatchType keyWordType)
    {

      // Create a keyword.
      AdGroupCriterion criterion = new AdGroupCriterion()
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        Status = AdGroupCriterionStatus.Enabled,
        Keyword = new KeywordInfo()
        {
          Text = keywordText,
          MatchType = keyWordType
        }
      };

      // Create the operation.
      AdGroupCriterionOperation operation = new AdGroupCriterionOperation()
      {
        Create = criterion,
      };

      return operation;
    }

    private AdGroupExtensionSettingOperation AddExtensionToAdGroup(in long customerId,
           in long adGroupId, string extensionFeedItemResourceName)
    {
      // Creates an ad group extension setting, sets its type to HOTEL_CALLOUT, and attaches
      // the feed item.
      AdGroupExtensionSetting adGroupExtensionSetting = new AdGroupExtensionSetting
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        ExtensionType = ExtensionType.HotelCallout
      };
      adGroupExtensionSetting.ExtensionFeedItems.Add(extensionFeedItemResourceName);

      // Creates an ad group extension setting operation.
      AdGroupExtensionSettingOperation adGroupExtensionSettingOperation =
          new AdGroupExtensionSettingOperation
          {
            Create = adGroupExtensionSetting
          };


      return adGroupExtensionSettingOperation;
    }


    private AdGroupAdOperation CreateResponsiveSearchAd(long customerId, long adGroupId, RespSearchAd respSearchAd)
    {
      // Create the ad.
      Ad ad = new Ad()
      {
        ResponsiveSearchAd = new ResponsiveSearchAdInfo()
        {
          Headlines =
                    {
                        // Sets a pinning to always choose this asset for HEADLINE_1. Pinning is
                        // optional; if no pinning is set, then headlines and descriptions will be
                        // rotated and the ones that perform best will be used more often.
                        new AdTextAsset() {
                            Text = "Test head lines",
                            PinnedField = ServedAssetFieldType.Headline1
                        },
                        new AdTextAsset() { Text = respSearchAd.DescriptionOne },
                         new AdTextAsset() { Text = respSearchAd.DescriptionTwo },
                    },
          Descriptions =
                    {
                        new AdTextAsset() { Text = respSearchAd.DescriptionOne },
                        new AdTextAsset() { Text = respSearchAd.DescriptionTwo },
                        new AdTextAsset() { Text = respSearchAd.DescriptionThree },
                    },
          Path1 = respSearchAd.PathOne,
          Path2 = respSearchAd.PathTwo
        },
        FinalUrls = { "https://developers.google.com/" }
      };

      // Builds the final ad group ad representation.
      AdGroupAd adGroupAd = new AdGroupAd()
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        Status = AdGroupAdStatusEnum.Types.AdGroupAdStatus.Enabled,
        Ad = ad
      };

      // Creates the operation.
      AdGroupAdOperation operation = new AdGroupAdOperation()
      {
        Create = adGroupAd
      };

      return operation;
    }

    private AdGroupAdOperation CreateCallAd(long customerId, long adGroupId, CallOnlyAd callAd)
    {
      // Create the ad.
      Ad ad = new Ad()
      {
        CallAd = new CallAdInfo()
        {
          PhoneNumber = "+79811131933",
          CountryCode = "RU",
          Headline1 = callAd.HeadlineOne,
          Headline2 = callAd.HeadlineTwo,
          Description1 = callAd.DescriptionOne,
          Description2 = callAd.DescriptionTwo,
          PhoneNumberVerificationUrl = "https://developers.google.com/",
          BusinessName = callAd.BusinessName
        },
        FinalUrls = { "https://developers.google.com/" }
      };

      // Builds the final ad group ad representation.
      AdGroupAd adGroupAd = new AdGroupAd()
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        Status = AdGroupAdStatusEnum.Types.AdGroupAdStatus.Enabled,
        Ad = ad
      };

      // Creates the operation.
      AdGroupAdOperation operation = new AdGroupAdOperation()
      {
        Create = adGroupAd
      };

      return operation;
    }

    private AdGroupAdOperation CreateExpandedTextAd(long customerId, long adGroupId, ExpTxtAd expTxtAd)
    {

      // Create the ad group ad object.
      AdGroupAd adGroupAd = new AdGroupAd
      {
        AdGroup = ResourceNames.AdGroup(customerId, adGroupId),
        // Optional: Set the status.
        Status = AdGroupAdStatus.Enabled,
        Ad = new Ad
        {
          FinalUrls = { expTxtAd.FinalURL },
          ExpandedTextAd = new ExpandedTextAdInfo
          {
            Description = expTxtAd.DescriptionOne,
            Description2 = expTxtAd.DescriptionTwo,
            HeadlinePart1 = expTxtAd.HeadlineOne,
            HeadlinePart2 = expTxtAd.HeadlineTwo,
            Path1 = expTxtAd.PathOne,
            Path2 = expTxtAd.PathTwo
          }
        }
      };

      // Create the operation.
      var operation = new AdGroupAdOperation
      {
        Create = adGroupAd
      };

      return operation;
    }



    public void CreateGeo(GoogleAdsClient client, long customerId, List<FeedItem> feedItems,
          List<CSVUSStateModel> geoTargetConstants)
    {
      // Get the ExtensionFeedItemServiceClient.
      ExtensionFeedItemServiceClient extensionFeedItemServiceClient =
          client.GetService(Google.Ads.GoogleAds.
          Services.V8.ExtensionFeedItemService);

      var operationList = new List<FeedItemTargetOperation>();
      foreach (var item in feedItems)
      {
        var stateName = item.AttributeValues.Select(x => x.StringValue).FirstOrDefault();
        var geoTag = long.Parse(geoTargetConstants.Where(x => x.State == stateName).Select(x => x.ParentID).FirstOrDefault());

        FeedItemTarget feedItemTarget = new FeedItemTarget()
        {
          GeoTargetConstant = ResourceNames.GeoTargetConstant(geoTag),
          FeedItem = item.ResourceName
        };

        FeedItemTargetOperation feedItemTargetOperation = new FeedItemTargetOperation()
        {
          Create = feedItemTarget
        };

        operationList.Add(feedItemTargetOperation);

      }

      FeedItemTargetServiceClient feedItemTargetService =
      client.GetService(Google.Ads.GoogleAds.Services.V8.FeedItemTargetService);


      MutateFeedItemTargetsResponse response =
          feedItemTargetService.MutateFeedItemTargets(customerId.ToString(),
              operationList.ToArray());

      string feedItemTargetResourceName = response.Results[0].ResourceName;
    }


    private string CreateAdCustomizerFeed(GoogleAdsClient client, long customerId,
          string feedName)
    {
      // Get the FeedServiceClient.
      FeedServiceClient feedService = client.GetService(Google.Ads.GoogleAds.Services.V8.FeedService);

      // Creates three feed attributes: a name, a price and a date. The attribute names
      // are arbitrary choices and will be used as placeholders in the ad text fields.
      FeedAttribute nameAttribute = new FeedAttribute()
      {
        Name = "State",
        Type = FeedAttributeType.String
      };

      FeedAttribute priceAttribute = new FeedAttribute()
      {
        Name = "Abb",
        Type = FeedAttributeType.String
      };

      Feed adCustomizerFeed = new Feed()
      {
        Name = feedName,
        Attributes = { nameAttribute, priceAttribute }
      };

      FeedOperation feedOperation = new FeedOperation()
      {
        Create = adCustomizerFeed
      };

      MutateFeedsResponse response =
          feedService.MutateFeeds(customerId.ToString(), new[] { feedOperation });

      string feedResourceName = response.Results[0].ResourceName;
      Console.WriteLine($"Added feed with resource name '{feedResourceName}'.");
      return feedResourceName;
    }

    /// <summary>
    ///  Retrieves all the attributes for a feed and returns them in a map using the
    ///  attribute names as keys.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="feedResourceName">The resource name of the feed.</param>
    /// <returns>The attributes of the feed.</returns>
    private Dictionary<string, FeedAttribute> GetFeedAttributes(GoogleAdsClient client,
                long customerId, string feedResourceName)
    {
      // Get the GoogleAdsServiceClient.
      GoogleAdsServiceClient googleAdsService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.GoogleAdsService);

      string query = $"SELECT feed.attributes, feed.name FROM feed WHERE " +
          $"feed.resource_name = '{feedResourceName}'";

      SearchGoogleAdsRequest request = new SearchGoogleAdsRequest()
      {
        CustomerId = customerId.ToString(),
        Query = query
      };

      Dictionary<string, FeedAttribute> feedAttributes =
          new Dictionary<string, FeedAttribute>();

      Feed feed = googleAdsService.Search(request).First().Feed;

      Console.WriteLine($"Found the following attributes for feed with name '{feed.Name}'");
      foreach (FeedAttribute feedAttribute in feed.Attributes)
      {
        Console.WriteLine($"\t'{feedAttribute.Name}' with id {feedAttribute.Id} and " +
            $"type '{feedAttribute.Type}'");
        feedAttributes[feedAttribute.Name] = feedAttribute;
      }
      return feedAttributes;
    }

    /// <summary>
    /// Creates a feed mapping and sets the feed as an ad customizer feed.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="feedResourceName">The resource name of the feed.</param>
    /// <param name="feedAttributes">The attributes of the feed.</param>
    private void CreateAdCustomizerMapping(GoogleAdsClient client, long customerId,
        string feedResourceName, Dictionary<string, FeedAttribute> feedAttributes)
    {
      // Get the FeedMappingService.
      FeedMappingServiceClient feedMappingService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.FeedMappingService);

      // Map the feed attributes to ad customizer placeholder fields.
      // For a full list of ad customizer placeholder fields, see
      // https://developers.google.com/google-ads/api/reference/rpc/latest/AdCustomizerPlaceholderFieldEnum.AdCustomizerPlaceholderField
      AttributeFieldMapping nameFieldMapping = new AttributeFieldMapping()
      {
        FeedAttributeId = feedAttributes["State"].Id,
        AdCustomizerField = AdCustomizerPlaceholderField.String
      };

      AttributeFieldMapping priceFieldMapping = new AttributeFieldMapping()
      {
        FeedAttributeId = feedAttributes["Abb"].Id,
        AdCustomizerField = AdCustomizerPlaceholderField.String
      };


      FeedMapping feedMapping = new FeedMapping()
      {
        Feed = feedResourceName,
        PlaceholderType = PlaceholderType.AdCustomizer,
        AttributeFieldMappings = { nameFieldMapping, priceFieldMapping }
      };

      FeedMappingOperation operation = new FeedMappingOperation()
      {
        Create = feedMapping
      };

      MutateFeedMappingsResponse response =
          feedMappingService.MutateFeedMappings(customerId.ToString(), new[] { operation });

      Console.WriteLine($"Added feed mapping with resource name" +
          $" '{response.Results[0].ResourceName}'.");
    }

    /// <summary>
    /// Creates two different feed items to enable two different ad customizations.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="feedResourceName">The resource name of the feed.</param>
    /// <param name="feedAttributes">The attributes of the feed.</param>
    /// <returns>The resource names of the feed items.</returns>
    private List<FeedItem> CreateFeedItems(GoogleAdsClient client, long customerId,
                string feedResourceName, Dictionary<string, FeedAttribute> feedAttributes)
    {
      // Get the FeedItemServiceClient.
      FeedItemServiceClient feedItemService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.FeedItemService);

      List<FeedItemOperation> feedItemOperations = new List<FeedItemOperation>();

      var stateList = iCSVHelper.GetStateModel();

      int count = 0;
      foreach (var state in stateList)
      {
        feedItemOperations.Add(
          CreateFeedItemOperation(state.State, state.Abb,
              feedResourceName, feedAttributes, count));
        count++;
      }


      List<FeedItem> feedItemResourceNames = new List<FeedItem>();
      MutateFeedItemsResponse response =
          feedItemService.MutateFeedItems(customerId.ToString(), feedItemOperations);

      foreach (MutateFeedItemResult result in response.Results)
      {
        string feedItemResourceName = result.ResourceName;
        FeedItem feedItem = GetFeedItem(client, customerId, feedItemResourceName);
        feedItemResourceNames.Add(feedItem);
      }
      return feedItemResourceNames;
    }

    private FeedItem GetFeedItem(GoogleAdsClient client, long customerId,
          string feedItemResourceName)
    {
      // Get the GoogleAdsService.
      GoogleAdsServiceClient googleAdsService = client.GetService(
          Google.Ads.GoogleAds.Services.V8.GoogleAdsService);

      // Constructs the query.
      string query = "SELECT feed_item.attribute_values FROM feed_item WHERE " +
          $"feed_item.resource_name = '{feedItemResourceName}'";

      // Constructs the request.
      SearchGoogleAdsRequest request = new SearchGoogleAdsRequest()
      {
        CustomerId = customerId.ToString(),
        Query = query
      };

      return googleAdsService.Search(request).First().FeedItem;
    }

    /// <summary>
    /// Runs the code example.
    /// </summary>
    /// <param name="client">The Google Ads API client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="feedId">ID of the feed associated with the feed item set.</param>
    /// <param name="feedItemSetId">ID of the feed item set.</param>
    public List<FeedItem> GetFeedItems(GoogleAdsClient client, long customerId, string feedItemSetResourceName)
    {
      // Get the GoogleAdsService.
      GoogleAdsServiceClient googleAdsService = client.GetService(
          Google.Ads.GoogleAds.Services.V8.GoogleAdsService);


      var feedList = new List<FeedItem>();
      // Creates a query that retrieves all feed item set links associated with the specified
      // feed item set.
      string query = $@"
                SELECT
                    feed_item_set_link.feed_item
                FROM
                    feed_item_set_link
                WHERE
                    feed_item_set_link.feed_item_set = '{feedItemSetResourceName}'";

      try
      {
        // Issue a search request.
        googleAdsService.SearchStream(customerId.ToString(), query,
            delegate (SearchGoogleAdsStreamResponse resp)
            {

              foreach (GoogleAdsRow googleAdsRow in resp.Results)
              {

              }
            }
        );
      }
      catch (GoogleAdsException e)
      {
        Console.WriteLine("Failure:");
        Console.WriteLine($"Message: {e.Message}");
        Console.WriteLine($"Failure: {e.Failure}");
        Console.WriteLine($"Request ID: {e.RequestId}");
        throw;
      }

      return feedList;
    }
    /// <summary>
    /// Helper function to create a FeedItemOperation.
    /// </summary>
    /// <param name="name">The value of the Name attribute.</param>
    /// <param name="price">The value of the Price attribute.</param>
    /// <param name="date">The value of the Date attribute.</param>
    /// <param name="feedResourceName">The resource name of the feed.</param>
    /// <param name="feedAttributes">The attributes to be set on the feed.</param>
    /// <returns>A FeedItemOperation to create a feed item.</returns>
    private FeedItemOperation CreateFeedItemOperation(string state, string abb,
        string feedResourceName, Dictionary<string, FeedAttribute> feedAttributes, long id)
    {
      FeedItemAttributeValue nameAttributeValue = new FeedItemAttributeValue()
      {
        FeedAttributeId = feedAttributes["State"].Id,
        StringValue = state
      };

      FeedItemAttributeValue priceAttributeValue = new FeedItemAttributeValue()
      {
        FeedAttributeId = feedAttributes["Abb"].Id,
        StringValue = abb
      };


      FeedItem feedItem = new FeedItem()
      {
        Feed = feedResourceName,
        AttributeValues = { nameAttributeValue, priceAttributeValue }
      };

      return new FeedItemOperation()
      {
        Create = feedItem
      };
    }

    /// <summary>
    /// Restricts the feed items to work only with a specific ad group; this prevents the
    /// feed items from being used elsewhere and makes sure they are used only for
    /// customizing a specific ad group.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="adGroupIds">The ad group IDs to bind the feed items to..</param>
    /// <param name="feedItemResourceNames">The resource names of the feed items.</param>
    private void CreateFeedItemTargets(GoogleAdsClient client,
        long customerId, string feedItemResourceName, long geoTag)
    {
      // Get the FeedItemTargetServiceClient.
      FeedItemTargetServiceClient feedItemTargetService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.FeedItemTargetService);


      FeedItemTarget feedItemTarget = new FeedItemTarget()
      {
        GeoTargetConstant = ResourceNames.GeoTargetConstant(geoTag),
        FeedItem = feedItemResourceName
      };

      FeedItemTargetOperation feedItemTargetOperation = new FeedItemTargetOperation()
      {
        Create = feedItemTarget
      };



      MutateFeedItemTargetsResponse response =
          feedItemTargetService.MutateFeedItemTargets(customerId.ToString(),
              new[] { feedItemTargetOperation });

      string feedItemTargetResourceName = response.Results[0].ResourceName;
    }

    /// <summary>
    /// Creates expanded text ads that use the ad customizer feed to populate the placeholders.
    /// </summary>
    /// <param name="client">The Google Ads client.</param>
    /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
    /// <param name="adGroupIds">The ad group IDs in which to create the ads.</param>
    /// <param name="feedName">Name of the feed.</param>
    private void CreateAdsWithCustomizations(GoogleAdsClient client, long customerId,
        long[] adGroupIds, string feedName)
    {
      // Get the AdGroupAdServiceClient.
      AdGroupAdServiceClient adGroupAdService =
          client.GetService(Google.Ads.GoogleAds.Services.V8.AdGroupAdService);

      // Creates an expanded text ad using the feed attribute names as placeholders.
      Ad ad = new Ad()
      {
        ExpandedTextAd = new ExpandedTextAdInfo()
        {
          HeadlinePart1 = $"Luxury cruise to {{={feedName}.Name}}",
          HeadlinePart2 = $"Only {{={feedName}.Price}}",
          Description = $"Offer ends in {{=countdown({feedName}.Date)}}!"
        },
        FinalUrls = { "http://www.example.com" }
      };

      List<AdGroupAdOperation> adGroupAdOperations = new List<AdGroupAdOperation>();

      // Creates the same ad in all ad groups. When they serve, they will show
      // different values, since they match different feed items.
      foreach (long adGroupId in adGroupIds)
      {
        AdGroupAd adGroupAd = new AdGroupAd()
        {
          Ad = ad,
          AdGroup = ResourceNames.AdGroup(customerId, adGroupId)
        };

        adGroupAdOperations.Add(new AdGroupAdOperation()
        {
          Create = adGroupAd
        });
      }

      MutateAdGroupAdsResponse response =
          adGroupAdService.MutateAdGroupAds(customerId.ToString(), adGroupAdOperations);

      Console.WriteLine($"Added {response.Results.Count} ads:");
      foreach (MutateAdGroupAdResult result in response.Results)
      {
        Console.WriteLine($"Added an ad with resource name '{result.ResourceName}'.");
      }
    }
  }
}
