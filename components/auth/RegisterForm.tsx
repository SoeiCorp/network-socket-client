"use client";

import { FormEvent, useState } from "react";
import Input from "./Input";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import PrimaryButton from "../public/PrimaryButton";
import Link from "next/link";
import { z } from "zod";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

const defaultForm = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function RegisterForm() {
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
    // name
    if (form.name === "") {
      errors.name = "กรุณากรอกชื่อของคุณ";
    }
    // email
    if (form.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ";
    } else if (z.string().email().safeParse(form.email).success === false) {
      errors.email = "อีเมลไม่ถูกต้อง";
    }

    if (form.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ";
    } else if (form.password.length < 8) {
      errors.password = "รหัสผ่านต้องมี 8 ตัวอักษร หรือมากกว่า";
    }
    // confirm password
    if (form.confirmPassword === "") {
      errors.confirmPassword = "ยืนยันรหัสผ่านของคุณ";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
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
      // Called Register API
      try {
        setPrimaryLoading(true);
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          console.log("User registered successfully");
          console.log(response);
        } else {
          console.error("Registration failed");
        }
      } catch (error) {
        console.error("Error registering user:", error);
      } finally {
        setPrimaryLoading(false);
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center text-slate-700"
      onSubmit={handleSubmit}
    >
      <p className="font-bold leading-6 text-2xl w-full text-slate-700">
        สร้างบัญชี
      </p>
      <Input
        name="name"
        label="ชื่อ"
        inputType="text"
        warning={errors.name}
        handleChange={handleChange}
        value={form.name}
      />
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
      <ConfirmPasswordInput
        handleChange={handleChange}
        value={form.confirmPassword}
        warning={errors.confirmPassword}
      />
      <PrimaryButton
        type="submit"
        isDisabled={isDisabled}
        className="w-full mt-8 text-base"
        isLoading={primaryLoading}
        loadingMessage="กำลังดำเนินการ"
      >
        สร้างบัญชี
      </PrimaryButton>
      <p className="w-full text-center text-sm mt-[10px]">
        มีบัญชีอยู่แล้ว ?{" "}
        <Link
          href={"/login"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2"
        >
          เข้าสู่ระบบ
        </Link>
      </p>
    </form>
  );
}
