import { AstroError } from "astro/errors";
import { z } from "astro/zod";
import { defineAction } from "astro:actions";

// const SubscribeSchema = z.object({
//   name: z.preprocess(
//     (value) => (value === null ? "" : value),
//     z.string().trim().min(2, "Name must be at least 2 characters."),
//   ),
//   email: z.preprocess(
//     (value) => (value === null ? "" : value),
//     z.string().trim().email("Please enter a valid email address."),
//   ),
// });

const MessageSchema = z.object({
  name: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string().trim().min(2, "Name must be at least 2 characters."),
  ),
  email: z.preprocess(
    (value) => (value === null ? "" : value),
    z.email("Please enter a valid email address."),
  ),
  message: z.preprocess(
    (value) => (value === null ? "" : value),
    z.string().trim().min(2, "Message must be at least 2 characters."),
  ),
  _gotcha: z.string().optional(),
});

export const server = {
  // subscribe: defineAction({
  //   accept: "form",
  //   input: SubscribeSchema,
  //   handler: async (input) => {
  //     return {
  //       message: `Thank you, ${input.name} for subscribing!`,
  //     };
  //   },
  // }),
  sendMessage: defineAction({
    accept: "form",
    input: MessageSchema,
    handler: async ({ _gotcha, name, email, message }) => {
      if (_gotcha) {
        // Pretend it worked.
        return {
          message: "Thank you! Your message has been sent.",
        };
      }

      const response = await fetch("https://formspree.io/f/mrenekre", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new AstroError(
          result.errors?.[0].message ?? "Unable to send message.",
        );
      }

      return {
        message: `Thank you, ${name}! Your message has been sent.`,
      };
    },
  }),
};
