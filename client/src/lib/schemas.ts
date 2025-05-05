import { z } from "zod";

export const infoFormSchema = () =>
  z.object({
    given_name: z.string().nonempty("First name is required"),
    family_name: z.string().nonempty("Last name is required"),
    address: z.string().max(50).nonempty("Address is required"),
    city: z.string().max(50).nonempty("City is required"),
    state: z.string().min(2).max(2).nonempty("State is required"),
    postalCode: z.string().min(3).max(6).nonempty("Postal code is required"),
    dateOfBirth: z.string().min(3).nonempty("Date of birth is required"),
    ssn: z.string().min(3).nonempty("SSN is required"),
  });
