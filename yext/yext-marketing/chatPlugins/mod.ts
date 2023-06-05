import { z } from "https://deno.land/x/zod/mod.ts";

declare const MARKETO_CLIENT_ID: string;
declare const MARKET_CLIENT_SECRET: string;

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
  const { access_token } = await response.json();
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
  const parsedLeadData = leadDataSchema.safeParse(notes?.collectedData);

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

// export default function main() {
//   const sampleLead: LeadData = {
//     email: "mdavish+12345@yext.com",
//     firstName: "Maxwell",
//     lastName: "Darvish",
//     company: "Acme",
//     title: "Product Manager",
//   };

//   return submitMarketoLead({
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     leadData: sampleLead,
//   });
// }
