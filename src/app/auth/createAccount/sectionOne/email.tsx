import StepContainer from "@/components/StepContainer";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/Input";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { supabase } from "@/lib/supabase";
import { useRegistrationStore } from "@/store/useRegistrationState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";

import { z } from "zod";

const formSchema = z.object({
   email: z.string().email("Please enter a valid email address."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Step1() {
   const { form, updateField, setError, nextStep, resetErrors, clearError, reset } = useRegistrationStore();
   const [loading, setLoading] = useState(false);

   const router = useRouter();

   // console.log(JSON.stringify(form, null, 2));

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset: resetForm,
   } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: { email: "" },
   });

   console.log(JSON.stringify(form, null, 2));

   const onSubmit = async (values: FormValues) => {
      setLoading(true);
      try {
         const { data, error } = await supabase
            .from("profiles") // 👈 your users table
            .select("id")
            .eq("email", form.email)
            .maybeSingle();
         if (data) {
            setError("email", "This email is already registered, try another email!");
            setLoading(false);
            return;
         }
         if (error) {
            setError("email", "Error checking email, try again later");
            console.log(
               "email",
               "Error checking email, try again later",
               error.cause,
               error.details,
               error.hint,
               error.message,
               error.name,
               error.stack,
               error.code
            );
            setLoading(false);
            return;
         }
      } catch (error) {
         console.log(error, "something went wrong");
      }

      setLoading(false);
      updateField("email", values.email);
      router.push("/auth/createAccount/sectionOne/password");
   };

   // const isValidEmail = (email: string) => {
   //    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   //    return regex.test(email);
   // };

   // const handleNext = async () => {
   //    let valid = true;
   //    setLoading(true);

   //    // if (!form.email) {
   //    //    setError("email", "Email is required!");
   //    //    valid = false;
   //    //    return;
   //    // } else if (!isValidEmail(form.email)) {
   //    //    setError("email", "Enter a valid email address!");
   //    //    valid = false;
   //    //    return;
   //    // }

   //    const { data, error } = await supabase
   //       .from("profiles") // 👈 your users table
   //       .select("id")
   //       .eq("email", form.email)
   //       .maybeSingle();

   //    if (data) {
   //       setError("email", "This email is already registered, try another email!");
   //       setLoading(false);
   //       valid = false;
   //       return;
   //    }

   //    if (error) {
   //       setError("email", "Error checking email, try again later");
   //       console.log(
   //          "email",
   //          "Error checking email, try again later",
   //          error.cause,
   //          error.details,
   //          error.hint,
   //          error.message,
   //          error.name,
   //          error.stack,
   //          error.code
   //       );
   //       setLoading(false);

   //       valid = false;
   //       return;
   //    }

   //    if (valid) {
   //       nextStep();
   //       router.push("/auth/createAccount/sectionOne/name");
   //       setLoading(false);
   //    }
   // };

   return (
      <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, flex: 1 }}>
         <StepContainer
            heading="What's your email address?"
            paragraph="Enter a valid email address to continue. We’ll use this email to verify your identity and send important
               updates about your Linuty account."
         >
            <Controller
               control={control}
               name="email"
               render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                     placeholder="Email address"
                     value={value}
                     onChangeText={onChange}
                     onBlur={onBlur}
                     keyboardType="email-address"
                     inputMode="text"
                     error={errors.email?.message}
                  />
               )}
            />

            <View className="gap-2 my-6">
               <GradientButton onPress={handleSubmit(onSubmit)} text="Next" size="lg" isLoading={isSubmitting} />
            </View>
         </StepContainer>
      </View>
   );
}
