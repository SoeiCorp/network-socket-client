"use client";

import { FormEvent, useState } from "react";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import PrimaryButton from "../public/PrimaryButton";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type RegisterForm = {
  email: string;
  password: string;
};

const defaultForm = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterForm>(structuredClone(defaultForm));
  const [errors, setErrors] = useState<RegisterForm>(
    structuredClone(defaultForm)
  );
  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const validateRegisterForm = () => {
    const errors: RegisterForm = structuredClone(defaultForm);
    // email
    if (form.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ";
    } else if (z.string().email().safeParse(form.email).success === false) {
      errors.email = "อีเมลไม่ถูกต้อง";
    }
    // password
    if (form.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ";
    } else if (form.password.length < 8) {
      errors.password = "รหัสผ่านต้องมี 8 ตัวอักษร หรือมากกว่า";
    }
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm();
    const haveErrors = Object.values(validationErrors).some(
      (x) => x !== null && x !== ""
    );
    if (haveErrors) {
      setErrors(validationErrors);
    } else {
      // Called Login API
      try {
        setPrimaryLoading(true);
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          console.log("User logged in successfully");
          toast.success("เข้าสู่ระบบสำเร็จ");
          router.push("/chat");
        } else {
          console.error("Login failed");
          setErrors({
            email: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
            password: " ",
          });
        }
      } catch (error) {
        console.error("Error login user:", error);
        toast.error("System error");
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center text-slate-700"
      onSubmit={handleSubmit}
    >
      <p className="font-bold leading-6 text-2xl w-full text-slate-700">
        เข้าสู่ระบบ
      </p>
      <Input
        name="email"
        label="อีเมล"
        inputType="email"
        warning={errors.email}
        handleChange={handleChange}
        value={form.email}
      />
      <PasswordInput
        fromLoginPage={false}
        handleChange={handleChange}
        value={form.password}
        warning={errors.password}
      />
      <PrimaryButton
        type="submit"
        isDisabled={primaryLoading}
        className="w-full mt-8 text-base"
        isLoading={primaryLoading}
        loadingMessage="กำลังดำเนินการ"
      >
        เข้าสู่ระบบ
      </PrimaryButton>
      <p className="w-full text-center text-sm mt-[10px]">
        ไม่เคยมีบัญชี ?{" "}
        <Link
          href={"/register"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2"
        >
          สร้างบัญชี
        </Link>
      </p>
    </form>
  );
}
