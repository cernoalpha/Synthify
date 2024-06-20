"use client"

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-sky-700",
    bgColor: "bg-sky-700/10",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-yellow-700",
    bgColor: "bg-yellow-700/10",
    href: "/video"
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/music"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-lime-700",
    bgColor: "bg-lime-700/10",
    href: "/code"
  },
]
export default function DashboardPage() {

  const router = useRouter()

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center max-w-2xl mx-auto">
          Your personalized hub for accessing and managing AI tools. Get an overview of your recent activity, usage statistics, and quick access to all features. Navigate effortlessly to image, video, music, and code generation tools, manage your account, and explore new capabilities.
        </p>
        <div className="px-4 md:px-20 lg:px-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card key={tool.href}
                onClick={() => router.push(tool.href)}
                className="p-4 h-64 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer">
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={cn("w-8 h-8", tool.color)} />
                  </div>
                  <div className="font-semibold">
                    {tool.label}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
