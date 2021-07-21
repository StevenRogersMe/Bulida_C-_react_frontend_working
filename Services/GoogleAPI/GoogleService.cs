using Google.Ads.GoogleAds.Examples;
using Google.Ads.GoogleAds.Lib;
using Google.Ads.GoogleAds.V6.Common;
using Google.Ads.GoogleAds.V6.Errors;
using Google.Ads.GoogleAds.V6.Resources;
using Google.Ads.GoogleAds.V6.Services;
using System;
using System.Collections.Generic;
using System.Text;
using static Google.Ads.GoogleAds.V6.Enums.AdvertisingChannelTypeEnum.Types;
using static Google.Ads.GoogleAds.V6.Enums.BudgetDeliveryMethodEnum.Types;
using static Google.Ads.GoogleAds.V6.Enums.CampaignStatusEnum.Types;
using static Google.Ads.GoogleAds.V6.Resources.Campaign.Types;

namespace Services.GoogleAPI
{
    public class GoogleService
    {
        /// <summary>
        /// Number of campaigns to create.
        /// </summary>
        private const int NUM_CAMPAIGNS_TO_CREATE = 5;



        /// <summary>
        /// Runs the code example.
        /// </summary>
        /// <param name="client">The Google Ads client.</param>
        /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
        //public void Run(GoogleAdsClient client, long customerId)
        //{
        //    // Get the CampaignService.
        //    CampaignServiceClient campaignService = client.GetService(ServiceTemplate.Create);

        //    // Create a budget to be used for the campaign.
        //    string budget = CreateBudget(client, customerId);

        //    List<CampaignOperation> operations = new List<CampaignOperation>();

        //    for (int i = 0; i < NUM_CAMPAIGNS_TO_CREATE; i++)
        //    {
        //        // [START add_campaigns_1]
        //        // Create the campaign.
        //        Campaign campaign = new Campaign()
        //        {
        //            Name = "Interplanetary Cruise #" + ExampleUtilities.GetRandomString(),
        //            AdvertisingChannelType = AdvertisingChannelType.Search,

        //            // Recommendation: Set the campaign to PAUSED when creating it to prevent
        //            // the ads from immediately serving. Set to ENABLED once you've added
        //            // targeting and the ads are ready to serve
        //            Status = CampaignStatus.Paused,

        //            // Set the bidding strategy and budget.
        //            ManualCpc = new ManualCpc(),
        //            CampaignBudget = budget,

        //            // Set the campaign network options.
        //            NetworkSettings = new NetworkSettings
        //            {
        //                TargetGoogleSearch = true,
        //                TargetSearchNetwork = true,
        //                TargetContentNetwork = false,
        //                TargetPartnerSearchNetwork = false
        //            },

        //            // Optional: Set the start date.
        //            StartDate = DateTime.Now.AddDays(1).ToString("yyyyMMdd"),

        //            // Optional: Set the end date.
        //            EndDate = DateTime.Now.AddYears(1).ToString("yyyyMMdd"),
        //        };
        //        // [END add_campaigns_1]

        //        // Create the operation.
        //        operations.Add(new CampaignOperation() { Create = campaign });
        //    }
        //    try
        //    {
        //        // Add the campaigns.
        //        MutateCampaignsResponse retVal = campaignService.MutateCampaigns(
        //            customerId.ToString(), operations);

        //        // Display the results.
        //        if (retVal.Results.Count > 0)
        //        {
        //            foreach (MutateCampaignResult newCampaign in retVal.Results)
        //            {
        //                Console.WriteLine("Campaign with resource ID = '{0}' was added.",
        //                    newCampaign.ResourceName);
        //            }
        //        }
        //        else
        //        {
        //            Console.WriteLine("No campaigns were added.");
        //        }
        //    }
        //    catch (GoogleAdsException e)
        //    {
        //        Console.WriteLine("Failure:");
        //        Console.WriteLine($"Message: {e.Message}");
        //        Console.WriteLine($"Failure: {e.Failure}");
        //        Console.WriteLine($"Request ID: {e.RequestId}");
        //        throw;
        //    }
        //}

        /// <summary>
        /// Creates the budget for the campaign.
        /// </summary>
        /// <param name="client">The Google Ads client.</param>
        /// <param name="customerId">The Google Ads customer ID for which the call is made.</param>
        /// <returns>The resource name of the newly created campaign budget.</returns>
        // [START add_campaigns]
        //private static string CreateBudget(GoogleAdsClient client, long customerId)
        //{
        //    Get the BudgetService.
        //   CampaignBudgetServiceClient budgetService = client.GetService(Comp);

        //    Create the campaign budget.
        //    CampaignBudget budget = new CampaignBudget()
        //    {
        //        Name = "Interplanetary Cruise Budget #" + ExampleUtilities.GetRandomString(),
        //        DeliveryMethod = BudgetDeliveryMethod.Standard,
        //        AmountMicros = 500000
        //    };

        //    Create the operation.
        //   CampaignBudgetOperation budgetOperation = new CampaignBudgetOperation()
        //   {
        //       Create = budget
        //   };

        //    Create the campaign budget.
        //    MutateCampaignBudgetsResponse response = budgetService.MutateCampaignBudgets(
        //        customerId.ToString(), new CampaignBudgetOperation[] { budgetOperation });
        //    return response.Results[0].ResourceName;
        //}
    }
}
