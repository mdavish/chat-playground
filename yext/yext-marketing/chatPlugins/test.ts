import {
  submitMarketoLead,
  MARKETO_CLIENT_ID,
  MARKETO_CLIENT_SECRET,
} from "./mod.ts";

Deno.test("test", async () => {
  console.log("test");
  const res = await submitMarketoLead({
    clientSecret: MARKETO_CLIENT_ID,
    clientId: MARKETO_CLIENT_SECRET,
    leadData: {
      email: "mdavish@yext.com@gmail.com",
      Opt_in__c: true,
      chatEngagementType: "Demo",
    },
  });
  console.log({ res });
  await res.body?.cancel();
  return;
});
