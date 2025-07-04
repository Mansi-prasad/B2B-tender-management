const { z } = require("zod");

// for companies
exports.loginCompanySchema = z.object({
  email: z.string().email("Email must be valid"),
  password: z.string().min(1, "Password is required"),
});

exports.registerCompanySchema = z.object({
  name: z.string().min(2, "Name is required"),
  industry: z.string().min(2, "Industry is required"),
  description: z.string().optional(),
  logoUrl: z.string().url("Logo URL must be valid").optional(),
  images: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Email must be valid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

exports.updateCompanySchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  industry: z.string().min(2, "Industry is required").optional(),
  description: z.string().optional(),
  logoUrl: z.string().url("Logo URL must be a valid URL").optional(),
  images: z.string().optional(),
  address: z.string().optional(),
  email: z.string().email("Email must be valid").optional(),
  phone: z.string().optional(),
});

// for tenders
exports.createTenderSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  deadline: z
    .string()
    .datetime({ message: "Deadline must be a valid ISO date-time string" }),
  budget: z.number({ required_error: "Budget is required" }),
});

exports.updateTenderSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters" }),
  deadline: z
    .string()
    .datetime({ message: "Deadline must be a valid ISO date-time string" }),
  budget: z.number(),
});

// for applications
exports.createApplicationSchema = z.object({
  tenderId: z.number(),
  companyId: z.number(),
  proposalText: z.string().min(10, "Proposal text is required"),
});
