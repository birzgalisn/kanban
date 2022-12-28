import { ZodError, ZodIssue } from "zod";

export class InputError extends ZodError {
  constructor(message: ZodIssue["message"], path: ZodIssue["path"]) {
    /** Initialize ZodError */
    super([]);

    /** Create an issue */
    this.addIssue({ message, path, code: "custom" });
  }
}
