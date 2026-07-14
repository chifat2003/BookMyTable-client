import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  $InferAuth: {
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          returned: true,
          input: true,
        },
      },
    },
  },
});
