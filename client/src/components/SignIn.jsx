import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "@/helpers/showToast";
import GoogleLogin from "./GoogleLogin";
import StarsBackgroundWrapper from "./StarsBackground";

//  Validation Schema
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password is required"),
})


const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  Initialize react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //  Submit Handler with API call
  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        return showToast("error", data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      showToast("success", data.message || "Login successful!");

      if (data.role === "BUYER") {
        navigate("/buyer-popup");
      } else {
        navigate("/farmer-popup");
      }


    } catch (err) {
      showToast("error", err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StarsBackgroundWrapper />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="min-h-screen flex justify-center items-center"
      >
        <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100">
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white mb-6 text-3xl font-extrabold text-center"
          >
            Login to SeedToServe
          </motion.h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium flex items-center gap-2">
                      <FaEnvelope className="text-[#2563eb]" /> Email
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Input
                          placeholder="you@example.com"
                          {...field}
                          className="border-gray-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 transition text-white"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white font-medium flex items-center gap-2">
                      <FaLock className="text-[#2563eb]" /> Password
                    </FormLabel>
                    <FormControl>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className="border-gray-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/30 transition text-white"
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  className="w-full py-3 bg-[#2563eb] text-white font-semibold rounded-lg shadow-md hover:bg-[#1d4ed8] transition duration-300"
                  disabled={loading}
                >
                  {loading ? "signing in..." : "Sign In"}
                </Button>
              </motion.div>
            </form>
          </Form>

          <div className="flex items-center justify-center my-6">
            <span className="text-sm text-white">OR</span>
          </div>

          <div>
            <GoogleLogin />
          </div>

          <p className="text-sm text-white mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/signup"
              className="text-[#2563eb] font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
