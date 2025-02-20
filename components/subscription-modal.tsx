"use client";

import axios from "axios";
import { useState } from "react";

import useProModal from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import { Check, Code, ImageIcon, Music, VideoIcon, ChevronsUp } from "lucide-react";
import { toast } from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const tools = [
    {
      label: "Image Generation",
      icon: ImageIcon,
      color: "text-sky-700",
      bgColor: "bg-sky-700/10",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      color: "text-yellow-700",
      bgColor: "bg-yellow-700/10",
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-lime-700",
      bgColor: "bg-lime-700/10",
    },
  ];

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("[STRIPE_CLIENT_ERROR]", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center flex-col items-center pb-2 gap-y-4">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Synthify 
              <Badge variant="premium" className="uppercase text-sm py-1">
                pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 flex w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("h-6 w-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">{tool.label}</div>
                  </div>
                  <Check className="text-primary w-5 h-5" />
                </Card>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={loading} size="lg" variant="premium" className="w-full" onClick={onSubscribe}>
            Upgrade <ChevronsUp className="w-6 h-6 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
