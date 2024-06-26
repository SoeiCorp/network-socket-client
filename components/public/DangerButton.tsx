import Image from "next/image";
import LoadingRing from "@/public/icons/loading-ring.svg";

type Props = {
  className?: string;
  type?: "submit" | "reset" | "button";
  isDisabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingMessage?: string;
};

export default function DangerButton(props: Props) {
  const {
    className,
    type,
    isDisabled,
    onClick,
    children,
    isLoading,
    loadingMessage,
  } = props;
  return (
    <button
      type={type || "button"}
      className={`px-[20px] py-[10px] rounded-[6px] text-sm font-medium text-slate-400 border border-1 border-slate-_00 hover:bg-red-500 focus:bg-red-500 focus:text-white hover:text-white active:opacity-60 disabled:opacity-60 ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? (
        <div className="flex gap-2 justify-center items-center">
          <Image src={LoadingRing} alt="logo" width={20} height={20} />
          {loadingMessage}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
