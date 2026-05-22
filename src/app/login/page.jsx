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
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import loginImg from "../../assets/login.png";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      redirect("/");
    }

    if (error) {
      toast.error(error.message || "Invalid credentials");
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
        
        {/* Left Side - Illustration */}
        <div className="hidden md:flex flex-1 justify-center">
          <Image
            src={loginImg}
            alt="Login Illustration"
            className="w-full max-w-125 object-contain animate-fade-up"
            priority
          />
        </div>

        {/* Right Side - Form Card */}
        <Card className="flex-1 w-full max-w-md p-8 sm:p-10 rounded-[32px] shadow-xl bg-white dark:bg-(--bg-card) border-none">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-[#063f49] dark:text-teal-400 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
              Log in to access your ideas, collaborate, and turn your concepts into reality.
            </p>
          </div>

          <Form onSubmit={onSubmit} className="flex w-full flex-col gap-5">
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
            >
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email
              </Label>
              <Input
                placeholder="Enter your email"
                startContent={<FiMail className="text-slate-400 mr-2" />}
                className="w-full"
                classNames={{
                  inputWrapper: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#063f49] focus-within:border-[#063f49] focus-within:ring-1 focus-within:ring-[#063f49] transition-all rounded-xl",
                  input: "text-sm",
                }}
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type={isVisible ? "text" : "password"}
            >
              <Label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </Label>
              <Input
                placeholder="Enter your password"
                startContent={<FiLock className="text-slate-400 mr-2" />}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FiEyeOff className="text-slate-400 text-lg hover:text-slate-600 transition" />
                    ) : (
                      <FiEye className="text-slate-400 text-lg hover:text-slate-600 transition" />
                    )}
                  </button>
                }
                className="w-full"
                classNames={{
                  inputWrapper: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-[#063f49] focus-within:border-[#063f49] focus-within:ring-1 focus-within:ring-[#063f49] transition-all rounded-xl",
                  input: "text-sm",
                }}
              />
              <FieldError className="text-xs text-red-500 mt-1" />
            </TextField>

            <div className="flex justify-end w-full -mt-2.5">
              <Link
                href="#"
                className="text-xs font-semibold text-[#063f49] dark:text-teal-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full bg-[#063f49] dark:bg-teal-600 text-white font-bold rounded-full py-6 mt-2 hover:bg-black transition-all shadow-md hover:shadow-lg"
              type="submit"
            >
              Login
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
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#063f49] dark:text-teal-400 font-bold hover:underline ml-1"
            >
              Sign Up
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
