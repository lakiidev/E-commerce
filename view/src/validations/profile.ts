import z from "zod";

export const profileSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .nullish()
      .optional(),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .nullish()
      .optional(),
    email: z.string().email("Invalid email address"),
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .optional()
      .refine((val) => !val || val.length >= 6, {
        message: "New password must be at least 6 characters",
      }),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Old password is required when setting a new password",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.oldPassword === data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password must be different from the old password",
      path: ["newPassword"],
    }
  );
