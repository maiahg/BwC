"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { infoFormSchema } from "@/lib/schemas";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateUserMutation } from "@/state/api";

const InfoForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const formSchema = infoFormSchema();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      given_name: "",
      family_name: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await updateUser(values).unwrap(); // 2. Call the mutation
      console.log("User info updated:", response);
      router.push("/link-account");
    } catch (error) {
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="info-form">
      <header className="flex flex-col gap-1 md:gap-3">
        <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
          Personal Information
        </h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <CustomInput
            control={form.control}
            name="given_name"
            label="First Name"
            placeholder="Enter your first name"
          />
          <CustomInput
            control={form.control}
            name="family_name"
            label="Last Name"
            placeholder="Enter your first name"
          />
          <CustomInput
            control={form.control}
            name="address"
            label="Address"
            placeholder="Enter your specific address"
          />
          <CustomInput
            control={form.control}
            name="city"
            label="City"
            placeholder="Enter your city"
          />
          <CustomInput
            control={form.control}
            name="state"
            label="State"
            placeholder="Example: NY"
          />
          <CustomInput
            control={form.control}
            name="postalCode"
            label="Postal Code"
            placeholder="Example: 11101"
          />
          <CustomInput
            control={form.control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="YYYY-MM-DD"
          />
          <CustomInput
            control={form.control}
            name="ssn"
            label="SSN"
            placeholder="Example: 1234"
          />

          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isLoading} className="form-btn">
              {isLoading ? (
                <>
                  <Loader2 size={20} className="animate-spin" /> &nbsp;
                  Loading...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default InfoForm;
