"use client";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs"

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-amber-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-sky-700"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-yellow-700"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-pink-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-lime-700"
    },
    {
        label: "Setting",
        icon: Settings,
        href: "/settings"
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, isPro = false }: SidebarProps) => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full w-full bg-secondary text-white">
            <div className="flex justify-between items-center px-3 py-2 bg-secondary">
                <Link href="/dashboard" className="flex items-center pl-3">
                    <div className="relative w-8 h-8 mr-4">
                        <Image
                            fill
                            alt="logo"
                            src="/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>
                        Synthify
                    </h1>
                </Link>
                    <div className="px-6 py-6 flex">
                        <UserButton afterSignOutUrl="/" />
                    </div>
               
            </div>
            <div className="flex space-x-4 px-3 py-2 bg-secondary">
                {routes.map((route) => (
                    <Link
                        href={route.href}
                        key={route.href}
                        className={cn("text-sm group flex items-center p-3 font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}
                    >
                        <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                        {route.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
