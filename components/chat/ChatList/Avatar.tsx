/* eslint-disable react/prop-types */
import React from "react";

interface AvatarProps {
  name: string;
  userId: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ name, userId, className }) => {
  const colors: string[] = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-teal-200",
    "bg-orange-200",
    "bg-pink-200",
    "bg-gray-200",
  ];
  const colorIndex: number = userId % colors.length;
  const color: string = colors[colorIndex];

  return (
    <div className="shrink-0">
      <div
        className={
          `w-[48px] h-[48px] text-lg rounded-full flex items-center justify-center ${className} ` +
          color
        }
      >
        <div className="text-slate-800">{name[0].toUpperCase()}</div>
      </div>
    </div>
  );
};

export default Avatar;
