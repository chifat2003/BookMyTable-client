import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL!,
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
