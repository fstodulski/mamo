import { z } from "zod";

export const _envServerSchema = z.object({
  MAMO_PRIVATE_SDK_KEY: z.string(),
});

const envServer = _envServerSchema.parse(process.env);

export { envServer };
