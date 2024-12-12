// import APIService from "./APIService";
// import endPoints from "./EndPoints";
// import { Helpers } from "../utils";

// class CampaignServiceClass {
//   /**
//    * This function calls the api to get all campaigns
//    * @returns {Object} Containing whether the call was successful and the campaigns data
//    */

//   /**
//    * This function calls the api to get all campaigns
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and the campaigns data
//    */
//   async getCampaigns() {
//     // ---------- @todo: remove the hard coded data --------

//     // return Helpers.returnObj(true, [
//     //   {
//     //     schemaVersion: "2.4.0",
//     //     campaignId: "HIGH_VALUE_SALES_2024",
//     //     name: "Crediverse High-Value Sales Recognition 2024",
//     //     description:
//     //       "Custom USSD response for high-value wholesale transactions",
//     //     campaignVersion: 1,
//     //     status: "ACTIVE",
//     //     startDateTime: "2024-01-01T00:00:00Z",
//     //     endDateTime: "2024-12-31T23:59:59Z",
//     //     lastModifiedDateTime: "2024-10-21T14:30:00Z",
//     //     collectionMappings: [],
//     //     persistentVariableDefinitions: [],
//     //     localVariableDefinitions: [],
//     //     entities: [
//     //       {
//     //         entityId: "CREDIVERSE",
//     //         entityName: "Crediverse EVD System",
//     //         transactionContexts: [
//     //           {
//     //             contextId: "WHOLESALE_AIRTIME_PURCHASE_PRE",
//     //             contextName: "Wholesale Airtime Credit Purchase",
//     //             rules: [
//     //               {
//     //                 ruleId: "CUSTOM_RESPONSE_RULE",
//     //                 name: "High-Value Sale Custom USSD Response",
//     //                 description:
//     //                   "Provides a custom USSD response for high-value wholesale transactions",
//     //                 priority: 1,
//     //                 condition: {
//     //                   type: "COMPARISON",
//     //                   operator: ">",
//     //                   parameters: {
//     //                     leftOperand: "{purchaseAmount}",
//     //                     rightOperand: 5000,
//     //                   },
//     //                 },
//     //                 actions: [
//     //                   {
//     //                     type: "OverrideStandardUssdResponse",
//     //                     parameters: {
//     //                       newResponse:
//     //                         "Congratulations! Your high-value sale of {Amount} to {RecipientMSISDN} was successful. You're a top performer! Ref {TransactionNo}.",
//     //                     },
//     //                   },
//     //                 ],
//     //                 variableOperations: [],
//     //               },
//     //             ],
//     //           },
//     //         ],
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     schemaVersion: "2.4.0",
//     //     campaignId: "MIDWEEK_STOCK_UP_2024",
//     //     name: "Fresh Mart Midweek Stock-Up Discount 2024",
//     //     description:
//     //       "2% discount on purchases over R500 on Mondays and Tuesdays",
//     //     campaignVersion: 1,
//     //     status: "ACTIVE",
//     //     startDateTime: "2024-01-01T00:00:00Z",
//     //     endDateTime: "2024-12-31T23:59:59Z",
//     //     lastModifiedDateTime: "2024-10-19T00:00:00Z",
//     //     collectionMappings: [],
//     //     persistentVariableDefinitions: [],
//     //     localVariableDefinitions: [
//     //       {
//     //         variableId: "discountedAmount",
//     //         name: "Discounted Amount",
//     //         description: "The purchase amount after applying the discount",
//     //         type: "number",
//     //         defaultValue: 0,
//     //       },
//     //     ],
//     //     entities: [
//     //       {
//     //         entityId: "RETAIL_POS",
//     //         entityName: "Fresh Mart Retail Point of Sale",
//     //         transactionContexts: [
//     //           {
//     //             contextId: "PURCHASE",
//     //             contextName: "Customer Purchase",
//     //             rules: [
//     //               {
//     //                 ruleId: "APPLY_MIDWEEK_DISCOUNT",
//     //                 name: "Apply Midweek Discount",
//     //                 description:
//     //                   "Applies 2% discount for purchases over R500 on Mondays and Tuesdays",
//     //                 priority: 2,
//     //                 condition: {
//     //                   type: "LOGICAL",
//     //                   operator: "AND",
//     //                   parameters: {
//     //                     conditions: [
//     //                       {
//     //                         type: "LOGICAL",
//     //                         operator: "OR",
//     //                         parameters: {
//     //                           conditions: [
//     //                             {
//     //                               type: "DATE",
//     //                               operator: "IS_DAY",
//     //                               parameters: {
//     //                                 date: "{timestamp}",
//     //                                 day: "MONDAY",
//     //                               },
//     //                             },
//     //                             {
//     //                               type: "DATE",
//     //                               operator: "IS_DAY",
//     //                               parameters: {
//     //                                 date: "{timestamp}",
//     //                                 day: "TUESDAY",
//     //                               },
//     //                             },
//     //                           ],
//     //                         },
//     //                       },
//     //                       {
//     //                         type: "COMPARISON",
//     //                         operator: ">",
//     //                         parameters: {
//     //                           leftOperand: "{purchaseAmount}",
//     //                           rightOperand: 500,
//     //                         },
//     //                       },
//     //                     ],
//     //                   },
//     //                 },
//     //                 variableOperations: [
//     //                   {
//     //                     variableId: "discountedAmount",
//     //                     operation: "SET",
//     //                     value: "{purchaseAmount}",
//     //                   },
//     //                   {
//     //                     variableId: "discountedAmount",
//     //                     operation: "MULTIPLY",
//     //                     value: 0.98,
//     //                   },
//     //                 ],
//     //                 actions: [
//     //                   {
//     //                     type: "ApplyDiscount",
//     //                     parameters: {
//     //                       purchaseAmount: "{discountedAmount}",
//     //                     },
//     //                   },
//     //                 ],
//     //               },
//     //             ],
//     //           },
//     //         ],
//     //       },
//     //     ],
//     //   },
//     // ]);

//     // -----------------------------------------------------

//     try {
//       const response = await APIService.getApiService().get(
//         endPoints.campaign.getCampaigns
//       );

//       return Helpers.returnObj(true, response.data);
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to get the campaigns list")
//       );
//     }
//   }

//   /**
//    * This function calls the api to get all entities
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and the campaigns data
//    */
//   async getEntities() {
//     // ---------- @todo: remove the hard coded data --------

//     // return Helpers.returnObj(true, [
//     //   {
//     //     entityId: "RETAIL_POS",
//     //     entityName: "Fresh Mart Retail Point of Sale",
//     //     entityDescription: "Handles retail transactions and promotions",
//     //     globalActions: [
//     //       {
//     //         type: "ApplyDiscount",
//     //         name: "Apply Discount",
//     //         description: "Applies a discount to the purchase amount",
//     //         parameters: [
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description: "The discounted purchase amount to apply",
//     //           },
//     //         ],
//     //       },
//     //     ],
//     //     transactionContexts: [
//     //       {
//     //         contextId: "PURCHASE",
//     //         contextName: "Customer Purchase",
//     //         contextDescription: "Represents a customer purchase transaction",
//     //         properties: [
//     //           {
//     //             name: "customerId",
//     //             type: "string",
//     //             description: "The customer's unique identifier",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description: "The total purchase amount",
//     //           },
//     //         ],
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     entityId: "CREDIVERSE",
//     //     entityName: "Crediverse EVD System",
//     //     entityDescription:
//     //       "Manages airtime distribution between agents in the Crediverse network",
//     //     transactionContexts: [
//     //       {
//     //         contextId: "WHOLESALE_AIRTIME_PURCHASE_PRE",
//     //         contextName: "Pre Wholesale Airtime Credit Purchase",
//     //         contextDescription:
//     //           "Represents a wholesale airtime purchase transaction between agents, prior execution",
//     //         properties: [
//     //           {
//     //             name: "buyerAgentId",
//     //             type: "number",
//     //             description:
//     //               "The unique ID for the agent buying the airtime credit",
//     //           },
//     //           {
//     //             name: "buyerAgentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent buying the airtime credit",
//     //           },
//     //           {
//     //             name: "buyerAgentTierName",
//     //             type: "string",
//     //             description: "Tier name that the buying agent belongs to",
//     //           },
//     //           {
//     //             name: "buyerAgentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the buyer agent belongs to",
//     //           },
//     //           {
//     //             name: "buyerAgentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the buyer agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "buyerAgentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the buyer agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "buyerAgentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the buyer agent",
//     //           },
//     //           {
//     //             name: "sellerAgentId",
//     //             type: "number",
//     //             description:
//     //               "The unique ID for the agent selling the airtime credit",
//     //           },
//     //           {
//     //             name: "sellerAgentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent selling the airtime credit",
//     //           },
//     //           {
//     //             name: "sellerAgentTierName",
//     //             type: "string",
//     //             description: "Tier name that the selling agent belongs to",
//     //           },
//     //           {
//     //             name: "sellerAgentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the seller agent belongs to",
//     //           },
//     //           {
//     //             name: "sellerAgentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the seller agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "sellerAgentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the seller agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "sellerAgentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the seller agent",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description:
//     //               "The monetary value of airtime credit stock being purchased",
//     //           },
//     //           {
//     //             name: "currentTradeBonusAmount",
//     //             type: "number",
//     //             description:
//     //               "The current trade bonus applicable to the transaction",
//     //           },
//     //           {
//     //             name: "transactionChannel",
//     //             type: "string",
//     //             description:
//     //               "The transaction channel (e.g. USSD, SMS, APP, etc.)",
//     //           },
//     //         ],
//     //         contextSpecificActions: [
//     //           {
//     //             type: "SendSms",
//     //             name: "Send SMS",
//     //             description: "Send targeted messages to agents or subscribers",
//     //             parameters: [
//     //               {
//     //                 name: "recipientType",
//     //                 type: "enum",
//     //                 description:
//     //                   "The type of recipient the SMS message needs to be delivered to",
//     //                 values: ["SELLER", "BUYER"],
//     //               },
//     //               {
//     //                 name: "message",
//     //                 type: "string",
//     //                 description: "The SMS message which is to be delivered",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "OverrideStandardUssdResponse",
//     //             name: "Override Standard USSD Response",
//     //             description:
//     //               "Override default USSD responses within the transaction",
//     //             parameters: [
//     //               {
//     //                 name: "newResponse",
//     //                 type: "string",
//     //                 description:
//     //                   "The new USSD response that must be replaced and sent to the seller over the USSD channel for the current transaction.",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "OverrideStandardSmsResponse",
//     //             name: "Override Standard SMS Response",
//     //             description: "Override default SMS responses",
//     //             parameters: [
//     //               {
//     //                 name: "recipientType",
//     //                 type: "enum",
//     //                 description:
//     //                   "The type of the recipient whose default SMS message needs to be overwritten",
//     //                 values: ["SELLER", "BUYER"],
//     //               },
//     //               {
//     //                 name: "newResponse",
//     //                 type: "string",
//     //                 description:
//     //                   "The new SMS message text that needs to replace the default SMS message text",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "OverrideTradeBonus",
//     //             name: "Override Trade Bonus",
//     //             description:
//     //               "Overrides the default trade bonus for agent stock purchases using an Adjustment Account within Crediverse",
//     //             parameters: [
//     //               {
//     //                 name: "newTradeBonusAmount",
//     //                 type: "number",
//     //                 description:
//     //                   "The new trade bonus amount which is to be awarded",
//     //               },
//     //               {
//     //                 name: "adjustmentAccountMsisdn",
//     //                 type: "string",
//     //                 description:
//     //                   "The adjustment account on Crediverse from which the trade bonus difference needs to be deducted",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "AwardSellerCommission",
//     //             name: "Award Seller Commission",
//     //             description:
//     //               "Awards seller agents with commission on sale of airtime",
//     //             parameters: [
//     //               {
//     //                 name: "awardAmount",
//     //                 type: "number",
//     //                 description: "The award amount which needs to be awarded",
//     //               },
//     //               {
//     //                 name: "adjustmentAccountMsisdn",
//     //                 type: "string",
//     //                 description:
//     //                   "The adjustment account on Crediverse from which the award amount needs to be deducted",
//     //               },
//     //             ],
//     //           },
//     //         ],
//     //       },
//     //       {
//     //         contextId: "WHOLESALE_AIRTIME_PURCHASE_POST",
//     //         contextName: "Post Wholesale Airtime Credit Purchase",
//     //         contextDescription:
//     //           "Represents a wholesale airtime purchase transaction between agents, post execution",
//     //         properties: [
//     //           {
//     //             name: "buyerAgentId",
//     //             type: "number",
//     //             description:
//     //               "The unique ID for the agent buying the airtime credit",
//     //           },
//     //           {
//     //             name: "buyerAgentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent buying the airtime credit",
//     //           },
//     //           {
//     //             name: "buyerAgentTierName",
//     //             type: "string",
//     //             description: "Tier name that the buying agent belongs to",
//     //           },
//     //           {
//     //             name: "buyerAgentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the buyer agent belongs to",
//     //           },
//     //           {
//     //             name: "buyerAgentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the buyer agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "buyerAgentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the buyer agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "buyerAgentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the buyer agent",
//     //           },
//     //           {
//     //             name: "sellerAgentId",
//     //             type: "number",
//     //             description:
//     //               "The unique ID for the agent selling the airtime credit",
//     //           },
//     //           {
//     //             name: "sellerAgentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent selling the airtime credit",
//     //           },
//     //           {
//     //             name: "sellerAgentTierName",
//     //             type: "string",
//     //             description: "Tier name that the selling agent belongs to",
//     //           },
//     //           {
//     //             name: "sellerAgentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the seller agent belongs to",
//     //           },
//     //           {
//     //             name: "sellerAgentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the seller agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "sellerAgentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the seller agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "sellerAgentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the seller agent",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description:
//     //               "The monetary value of airtime credit stock being purchased",
//     //           },
//     //           {
//     //             name: "currentTradeBonusAmount",
//     //             type: "number",
//     //             description:
//     //               "The current trade bonus applicable to the transaction",
//     //           },
//     //           {
//     //             name: "transactionChannel",
//     //             type: "string",
//     //             description:
//     //               "The transaction channel (e.g. USSD, SMS, APP, etc.)",
//     //           },
//     //         ],
//     //         contextSpecificActions: [],
//     //       },
//     //       {
//     //         contextId: "RETAIL_AIRTIME_RECHARGE_PRE",
//     //         contextName: "Pre Retail Airtime Recharge",
//     //         contextDescription:
//     //           "Represents a retail airtime recharge transaction between an agent and a subscriber, prior execution",
//     //         properties: [
//     //           {
//     //             name: "agentId",
//     //             type: "number",
//     //             description: "The unique ID for the agent selling the airtime",
//     //           },
//     //           {
//     //             name: "agentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent selling the airtime",
//     //           },
//     //           {
//     //             name: "agentTierName",
//     //             type: "string",
//     //             description: "The tier name of the agent",
//     //           },
//     //           {
//     //             name: "agentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the agent belongs to",
//     //           },
//     //           {
//     //             name: "agentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "agentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "agentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the agent",
//     //           },
//     //           {
//     //             name: "subscriberMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the subscriber buying the airtime recharge",
//     //           },
//     //           {
//     //             name: "subscriberServiceClass",
//     //             type: "string",
//     //             description:
//     //               "The name of service class on Ericsson charging system that the subscriber belongs to",
//     //           },
//     //           {
//     //             name: "subscriberCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the subscriber is at the time of transaction",
//     //           },
//     //           {
//     //             name: "subscriberZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the subscriber is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "subscriberLanguage",
//     //             type: "string",
//     //             description: "The language setting of the subscriber",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description:
//     //               "The amount of airtime purchased by the subscriber",
//     //           },
//     //           {
//     //             name: "transactionChannel",
//     //             type: "string",
//     //             description:
//     //               "The transaction channel (e.g. USSD, SMS, APP, etc.)",
//     //           },
//     //         ],
//     //         contextSpecificActions: [
//     //           {
//     //             type: "SendSms",
//     //             name: "Send SMS",
//     //             description: "Send targeted messages to agents or subscribers",
//     //             parameters: [
//     //               {
//     //                 name: "recipientType",
//     //                 type: "enum",
//     //                 description:
//     //                   "The type of recipient the SMS message needs to be delivered to",
//     //                 values: ["SELLER", "BUYER"],
//     //               },
//     //               {
//     //                 name: "message",
//     //                 type: "string",
//     //                 description: "The SMS message which is to be delivered",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "OverrideStandardUssdResponse",
//     //             name: "Override Standard USSD Response",
//     //             description:
//     //               "Override default USSD responses within the transaction",
//     //             parameters: [
//     //               {
//     //                 name: "newResponse",
//     //                 type: "string",
//     //                 description:
//     //                   "The new USSD response that must be replaced and sent to the seller over the USSD channel for the current transaction.",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "OverrideStandardSmsResponse",
//     //             name: "Override Standard SMS Response",
//     //             description: "Override default SMS responses",
//     //             parameters: [
//     //               {
//     //                 name: "recipientType",
//     //                 type: "enum",
//     //                 description:
//     //                   "The type of the recipient whose default SMS message needs to be overwritten",
//     //                 values: ["SELLER", "BUYER"],
//     //               },
//     //               {
//     //                 name: "newResponse",
//     //                 type: "string",
//     //                 description:
//     //                   "The new SMS message text that needs to replace the default SMS message text",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "ApplySubscriberDiscount",
//     //             name: "Apply Subscriber Discount",
//     //             description: "Apply a discount to the subscriber's purchase",
//     //             parameters: [
//     //               {
//     //                 name: "discountValue",
//     //                 type: "number",
//     //                 description: "The value of the discount to be applied",
//     //               },
//     //               {
//     //                 name: "adjustmentAccountMsisdn",
//     //                 type: "string",
//     //                 description:
//     //                   "The MSISDN of the Adjustment account on Crediverse, from which the discountValue will be deducted",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "ApplySubscriberBonus",
//     //             name: "Apply Subscriber Bonus",
//     //             description:
//     //               "Grant additional bonus on airtime being purchased",
//     //             parameters: [
//     //               {
//     //                 name: "incentiveType",
//     //                 type: "enum",
//     //                 description: "The type of incentive to be topped up",
//     //                 values: ["AIRTIME", "VOICE", "SMS", "DATA"],
//     //               },
//     //               {
//     //                 name: "bonusAmount",
//     //                 type: "number",
//     //                 description: "The additional amount to be topped up",
//     //               },
//     //               {
//     //                 name: "adjustmentAccountMsisdn",
//     //                 type: "string",
//     //                 description:
//     //                   "The MSISDN of the Adjustment account on Crediverse, from which the bonus will be adjusted",
//     //               },
//     //             ],
//     //           },
//     //           {
//     //             type: "AdjustStock",
//     //             name: "Adjust Stock",
//     //             description: "Adjust the stock amount for the seller agent",
//     //             parameters: [
//     //               {
//     //                 name: "adjustmentStockAmount",
//     //                 type: "number",
//     //                 description:
//     //                   "The amount of stock to be adjusted for the seller agent",
//     //               },
//     //               {
//     //                 name: "adjustmentAccountMsisdn",
//     //                 type: "string",
//     //                 description:
//     //                   "The MSISDN of the Adjustment account on Crediverse, from which the adjustment stock amount will be adjusted from",
//     //               },
//     //             ],
//     //           },
//     //         ],
//     //       },
//     //       {
//     //         contextId: "RETAIL_AIRTIME_RECHARGE_POST",
//     //         contextName: "Post Retail Airtime Recharge",
//     //         contextDescription:
//     //           "Represents a retail airtime recharge transaction between an agent and a subscriber, post execution",
//     //         properties: [
//     //           {
//     //             name: "agentId",
//     //             type: "number",
//     //             description: "The unique ID for the agent selling the airtime",
//     //           },
//     //           {
//     //             name: "agentMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the agent selling the airtime",
//     //           },
//     //           {
//     //             name: "agentTierName",
//     //             type: "string",
//     //             description: "The tier name of the agent",
//     //           },
//     //           {
//     //             name: "agentGroups",
//     //             type: "array",
//     //             description: "Array of Group IDs the agent belongs to",
//     //           },
//     //           {
//     //             name: "agentCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the agent is at the time of transaction",
//     //           },
//     //           {
//     //             name: "agentZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the agent is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "agentLanguage",
//     //             type: "string",
//     //             description: "The language setting of the agent",
//     //           },
//     //           {
//     //             name: "subscriberMsisdn",
//     //             type: "string",
//     //             description:
//     //               "The unique MSISDN for the subscriber buying the airtime recharge",
//     //           },
//     //           {
//     //             name: "subscriberServiceClass",
//     //             type: "string",
//     //             description:
//     //               "The name of service class on Ericsson charging system that the subscriber belongs to",
//     //           },
//     //           {
//     //             name: "subscriberCgi",
//     //             type: "string",
//     //             description:
//     //               "The Cell Global Identity where the subscriber is at the time of transaction",
//     //           },
//     //           {
//     //             name: "subscriberZones",
//     //             type: "array",
//     //             description:
//     //               "The list of unique zone IDs where the subscriber is located at the time of transaction",
//     //           },
//     //           {
//     //             name: "subscriberLanguage",
//     //             type: "string",
//     //             description: "The language setting of the subscriber",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description:
//     //               "The amount of airtime purchased by the subscriber",
//     //           },
//     //           {
//     //             name: "transactionChannel",
//     //             type: "string",
//     //             description:
//     //               "The transaction channel (e.g. USSD, SMS, APP, etc.)",
//     //           },
//     //         ],
//     //         contextSpecificActions: [],
//     //       },
//     //     ],
//     //   },
//     //   {
//     //     entityId: "RETAIL_POS_1",
//     //     entityName: "Fresh Mart Retail Point of Sale",
//     //     entityDescription:
//     //       "Handles retail transactions and promotions for Fresh Mart stores",
//     //     globalActions: [
//     //       {
//     //         type: "ApplyDiscount",
//     //         name: "Apply Discount",
//     //         description: "Applies a calculated discount to the purchase",
//     //         parameters: [
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description: "The final purchase amount after discount",
//     //             defaultValue: 0,
//     //           },
//     //         ],
//     //       },
//     //     ],
//     //     transactionContexts: [
//     //       {
//     //         contextId: "PURCHASE",
//     //         contextName: "Product Purchase",
//     //         contextDescription: "Represents a customer's purchase transaction",
//     //         properties: [
//     //           {
//     //             name: "customerId",
//     //             type: "string",
//     //             description: "The unique identifier for the customer",
//     //           },
//     //           {
//     //             name: "purchaseAmount",
//     //             type: "number",
//     //             description: "The total purchase amount before any discounts",
//     //           },
//     //           {
//     //             name: "timestamp",
//     //             type: "date",
//     //             description: "The date and time when the transaction occurred",
//     //           },
//     //         ],
//     //         contextSpecificActions: [],
//     //       },
//     //     ],
//     //   },
//     // ]);

//     // -----------------------------------------------------

//     try {
//       const response = await APIService.getApiService().get(
//         endPoints.campaign.listEntities
//       );

//       return Helpers.returnObj(true, response.data);
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to get the entities list")
//       );
//     }
//   }
//   /**
//    * This function calls the api to get single campaign
//    * @param {string} campaignId - The unique identifier for the campaign
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and the campaign data
//    */
//   async getCampaign(campaignId) {
//     try {
//       const response = await APIService.getApiService().put(
//         `${endPoints.campaign.getCampaign}${campaignId}`
//       );
//       // If not successful then return
//       if (!response.data.success) return response.data;
//       return response.data;
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to get the campaign")
//       );
//     }
//   }
  
//   async createCampaign(data) {
//     // If filters are not provided then set it to empty object
//     try {
//       const response = await APIService.getApiService().post(
//         endPoints.campaign.createCampaign,
//         data
//       );

//       // We are here it means success

//       return Helpers.returnObj(true, response.data?.message);
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to create the campaign")
//       );
//     }
//   }
//   /**
//    * This function calls the api to create campaign
//    * @param {string} campaignId The existing campaign Id.
//    * @param {Object} data - The data to be sent in the request body
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and the campaign data
//    */
//   async updateCampaign(campaignId, data) {
//     // If filters are not provided then set it to empty object
//     try {
//       const response = await APIService.getApiService().put(
//         `${endPoints.campaign.updateCampaign}${campaignId}`,
//         {
//           ...data,
//         }
//       );

//       // If not successful then return
//       if (!response.data.success) return response.data;

//       return response.data;
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to update the campaign")
//       );
//     }
//   }
//   /**
//    * This function calls the API to delete a campaign.
//    * @param {string} campaignId - The unique identifier for the campaign to be deleted.
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and any response data.
//    */
//   async deleteCampaign(campaignId) {
//     // If filters are not provided then set it to empty object
//     try {
//       const response = await APIService.getApiService().delete(
//         `${endPoints.campaign.deleteCampaign}${campaignId}`
//       );

//       // We are here it means success

//       return Helpers.returnObj(true, "Campaign deleted successfully!");
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to delete the campaign")
//       );
//     }
//   }
//   /**
//    * This function calls the API to get all condition types that can be used in a campaign's rule.
//    * @param {string} campaignId - The unique identifier for the campaign to be fetched.
//    * @returns {Promise<{success: boolean, data: any}>} Containing whether the call was successful and the condition types data.
//    */
//   async getConditionTypes() {
//     // If filters are not provided then set it to empty object
//     try {
//       const response = await APIService.getApiService().get(
//         endPoints.campaign.getConditionTypes
//       );

//       // If not successful then return
//       if (!response.data.success) return response.data;

//       return response.data;
//     } catch (error) {
//       return Helpers.returnObj(
//         false,
//         APIService.getErrorMessage(error, "Failed to get condition types")
//       );
//     }
//   }
// }

// const CampaignService = new CampaignServiceClass();

// export default CampaignService; // Export as a singleton instance
