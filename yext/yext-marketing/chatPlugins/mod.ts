import { z } from "https://deno.land/x/zod/mod.ts";

export const MARKETO_CLIENT_SECRET = "MySiT1YbDio9kjcsys6ZQv8G9KETedVv";
export const MARKETO_CLIENT_ID = "4992ad64-78e0-4fbf-b95c-7da63acc6ff2";

const ChatFunctionPayloadSchema = z.object({
  messages: z.array(
    z.object({
      text: z.string(),
      source: z.enum(["USER", "BOT"]),
      timestamp: z.string(),
    })
  ),
  notes: z
    .object({
      currentGoal: z.string().optional(),
      currentStepIndices: z.array(z.number()).optional(),
      searchQuery: z.string().optional(),
      queryResult: z.any(),
      collectedData: z.record(z.string()).optional(),
      goalFirstMsgIndex: z.number().optional(),
    })
    .optional(),
});

export type ChatFunctionPayload = z.infer<typeof ChatFunctionPayloadSchema>;

export type ChatFunctionReturn = Partial<ChatFunctionPayload["notes"]>;

export type ChatFunction = (
  payload: ChatFunctionPayload
) => Promise<ChatFunctionReturn>;

const leadDataSchema = z.object({
  email: z.string().email(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  chatEngagementType: z
    .enum(["Demo", "Contact Us", "Webinar", "Publication"])
    .optional(),
  Opt_in__c: z.boolean().optional(),
});

export type LeadData = z.infer<typeof leadDataSchema>;

export async function submitMarketoLead({
  clientId,
  clientSecret,
  leadData,
}: {
  clientId: string;
  clientSecret: string;
  leadData: LeadData;
}) {
  // First get the token
  const tokenEndpoint = `https://906-iba-353.mktorest.com/identity/oauth/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log({ tokenEndpoint, MARKETO_CLIENT_ID, MARKETO_CLIENT_SECRET });
  const resJson = await response.json();
  console.log("Marketo Response");
  console.log(resJson);

  const access_token = resJson.access_token;
  // Throw an error if we didn't get a token
  if (!access_token) {
    throw new Error("No access token received from Marketo");
  }
  // Throw an error if the response is not ok
  if (!response.ok) {
    throw new Error("Marketo token request failed");
  }
  const leadEndpoint = `https://906-iba-353.mktorest.com/rest/v1/leads.json?access_token=${access_token}`;
  const leadResponse = await fetch(leadEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "createOrUpdate",
      input: [leadData],
      lookupField: "email",
    }),
  });
  return leadResponse;
}

export const marketoHandler: ChatFunction = async ({ notes }) => {
  const parsedLeadData = leadDataSchema.safeParse({
    ...notes?.collectedData,
    chatEngagementType: "Demo",
    Opt_in__c: false,
  });

  console.log({ parsedLeadData });

  if (!parsedLeadData.success) {
    throw new Error("Lead data was not valid");
  }

  const leadData = parsedLeadData.data;

  const response = await submitMarketoLead({
    clientId: MARKETO_CLIENT_ID,
    clientSecret: MARKETO_CLIENT_SECRET,
    leadData,
  });

  if (!response.ok) {
    throw new Error("Marketo lead submission failed");
  }

  return {};
};

export const optInHandler: ChatFunction = async ({ notes }) => {
  const parsedLeadData = leadDataSchema.safeParse({
    ...notes?.collectedData,
    chatEngagementType: "Demo",
    Opt_in__c: true,
  });

  console.log({ parsedLeadData });

  if (!parsedLeadData.success) {
    throw new Error("Lead data was not valid");
  }

  const leadData = parsedLeadData.data;

  const response = await submitMarketoLead({
    clientId: MARKETO_CLIENT_ID,
    clientSecret: MARKETO_CLIENT_SECRET,
    leadData,
  });

  if (!response.ok) {
    throw new Error("Marketo lead submission failed");
  }

  return {};
};
