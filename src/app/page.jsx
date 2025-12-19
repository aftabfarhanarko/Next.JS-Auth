import { RiNextjsLine } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import Link from "next/link";
import LoginButton from "@/components/LoginButton";
export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center gap-5 ">
      <div className=" flex gap-5 space-x-4 items-center">
        <FaReact
          size={40}
          className="animate-spin duration-1000 text-sky-400"
        ></FaReact>
        <IoShieldCheckmarkSharp size={50} className="text-yellow-500" />
        <RiNextjsLine size={50}></RiNextjsLine>
        <SiMongodb size={50} className="text-green-600"></SiMongodb>
      </div>
      <div className="relative">
        <h2 className="text-5xl">NEXT AUTH</h2>
      </div>
      <div className="flex gap-5">
        <LoginButton></LoginButton>
        <Link href={"/register"} className="btn">
          Register
        </Link>
      </div>
    </div>
  );
}
