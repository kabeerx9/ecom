import { createAuthClient } from "better-auth/react";

// Use same-origin by default. Do not hardcode localhost; in production
// this ensures the client hits the deployed domain automatically.
export const authClient = createAuthClient({});
