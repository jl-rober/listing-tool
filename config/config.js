class config {
    constructor() {
        this.env = 1;

        if(this.env === 1) {
            this.ebayVars = {
                signInUrl: "https://auth.sandbox.ebay.com/oauth2/authorize?client_id=JustinRo-ebaytest-SBX-045f6444c-d84abb1e&response_type=code&redirect_uri=Justin_Roberts-JustinRo-ebayte-yrmkpfx&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/buy.order.readonly https://api.ebay.com/oauth/api_scope/buy.guest.order https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly",
                redirectUri: "Justin_Roberts-JustinRo-ebayte-yrmkpfx",
                clientSecret: "SBX-45f6444cb545-5cb2-4f08-bd57-5964",
                clientId: "JustinRo-ebaytest-SBX-045f6444c-d84abb1e",
                baseUrl: "https://api.sandbox.ebay.com/"
            }
        } else {
            this.ebayVars = {
                ebaySignInUrl: "https://auth.ebay.com/oauth2/authorize?client_id=JustinRo-ebaytest-PRD-745f6444c-1d195591&response_type=code&redirect_uri=Justin_Roberts-JustinRo-ebayte-aghtdoe&scope=https://api.ebay.com/oauth/api_scope https://api.ebay.com/oauth/api_scope/sell.marketing.readonly https://api.ebay.com/oauth/api_scope/sell.marketing https://api.ebay.com/oauth/api_scope/sell.inventory.readonly https://api.ebay.com/oauth/api_scope/sell.inventory https://api.ebay.com/oauth/api_scope/sell.account.readonly https://api.ebay.com/oauth/api_scope/sell.account https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly https://api.ebay.com/oauth/api_scope/sell.fulfillment https://api.ebay.com/oauth/api_scope/sell.analytics.readonly",
                redirectUri: "Justin_Roberts-JustinRo-ebayte-aghtdoe",
                clientSecret: "PRD-45f6444cd92d-c562-46fd-9c27-cf9d",
                clientId: "JustinRo-ebaytest-PRD-745f6444c-1d195591",
                baseUrl: "https://api.ebay.com/"
            }
        }
    }
}

module.exports = config;