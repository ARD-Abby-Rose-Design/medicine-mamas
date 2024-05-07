console.log("recharge.js");
recharge.init({
  storeIdentifier: "{{ shop.permanent_domain }}",
  storefrontAccessToken:
    "strfnt_2e5c340ec66ff790ec09ab7141158456cb142e4dce223f4fc56451b11aae5ab0",
  loginRetryFn: (fn) => {
    console.log(fn);
    return recharge.auth.loginShopifyAppProxy().then((session) => {
      console.log("recharge session", session);
      return session;
    });
  }
});
