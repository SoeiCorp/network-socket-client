import Logo from "@/components/auth/Logo";
import RegisterForm from "@/components/auth/RegisterForm";
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth"

export default async function RegisterPage() {
  //   const session = await getServerSession()
  //   if (session) {
  //     redirect("/landing")
  //   }

  return (
    <main className="w-full flex-col items-center bg-[#F8FAFC] h-full flex justify-center">
      <div className="flex flex-col items-center bg-white shadow-xl px-10 pt-5 pb-10 rounded-xl gap-3">
        <Logo />
        <RegisterForm />
      </div>
    </main>
  );
}
