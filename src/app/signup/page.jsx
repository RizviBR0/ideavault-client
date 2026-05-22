"use client";

import { Card, Separator } from "@heroui/react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiUser, FiImage, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import signupImg from "../../assets/signup.png";

const SignUpPage = () => {
  useEffect(() => {
    document.title = "IdeaVault - Sign Up";
  }, []);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      redirect("/");
    }

    if (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#eef2ff] to-[#fce7f3] dark:from-[#0d1117] dark:to-[#161b22] px-5 py-24">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10 lg:gap-20">
        
        <div className="hidden md:flex flex-1 justify-center">
          <Image
            src={signupImg}
            alt="Sign Up Illustration"
            className="w-full max-w-125 object-contain animate-fade-up"
            priority
          />
        </div>

        <Card className="flex-1 w-full max-w-md p-8 sm:p-10 rounded-[32px] shadow-xl bg-white dark:bg-(--bg-card) border-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400 mb-3 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Join IdeaVault and start your journey to share, discover, and build amazing ideas.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
            <TextField isRequired name="name" type="text" className="flex flex-col w-full">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Name
              </Label>
              <div className="relative w-full">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <Input
                  placeholder="Enter your full name"
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
                />
              </div>
              <FieldError className="text-xs text-rose-500 mt-1.5 font-semibold" />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
              className="flex flex-col w-full"
            >
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </Label>
              <div className="relative w-full">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <Input
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
                />
              </div>
              <FieldError className="text-xs text-rose-500 mt-1.5 font-semibold" />
            </TextField>

            <TextField name="image" type="url" className="flex flex-col w-full">
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Photo URL
              </Label>
              <div className="relative w-full">
                <FiImage className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <Input
                  placeholder="Enter your photo URL (optional)"
                  className="w-full pl-11 pr-4 py-3 text-sm font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
                />
              </div>
              <FieldError className="text-xs text-rose-500 mt-1.5 font-semibold" />
            </TextField>

            <TextField
              isRequired
              minLength={6}
              name="password"
              type={isVisible ? "text" : "password"}
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }
                return null;
              }}
              className="flex flex-col w-full"
            >
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </Label>
              <div className="relative w-full">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-base" />
                <Input
                  placeholder="Create a password"
                  className="w-full pl-11 pr-12 py-3 text-sm font-semibold rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#063f49] dark:focus:border-teal-500 transition-all"
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none cursor-pointer"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FiEyeOff className="text-base" />
                  ) : (
                    <FiEye className="text-base" />
                  )}
                </button>
              </div>
              <FieldError className="text-xs text-rose-500 mt-1.5 font-semibold" />
            </TextField>

            <Button
              className="w-full bg-[#063f49] dark:bg-teal-600 text-white font-bold rounded-full py-6 mt-4 hover:bg-black transition-all shadow-md hover:shadow-lg"
              type="submit"
            >
              Sign Up
            </Button>
          </Form>

          <div className="flex items-center gap-4 my-6 opacity-60">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            className="w-full rounded-full py-6 font-semibold border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-300"
          >
            <FcGoogle className="text-xl" /> Continue with Google
          </Button>

          <div className="text-center text-sm mt-8 text-slate-600 dark:text-slate-400 font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#063f49] dark:text-teal-400 font-bold hover:underline ml-1"
            >
              Login
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
