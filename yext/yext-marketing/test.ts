import { submitMarketoLead } from "./chatPlugins/mod.ts";

declare const MARKETO_CLIENT_ID: string;
declare const MARKETO_CLIENT_SECRET: string;

Deno.test("Sending Marketo Lead", () => {
  submitMarketoLead({
    clientId: MARKETO_CLIENT_ID,
    clientSecret: MARKETO_CLIENT_SECRET,
    leadData: {
      email: "mdavish+1234@yext.com",
      firstName: "Max",
      lastName: "Davish",
    },
  });
});
