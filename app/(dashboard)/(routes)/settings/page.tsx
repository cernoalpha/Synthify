import { Heading } from "@/components/heading";
import { SubscriptionButton } from "@/components/billing-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import { getApiLimitCount } from "@/lib/api-limit";
import FreeCounter from "@/components/usage-count";

const SettingsPage = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading title="Settings" description="Manage account settings." icon={Settings} iconColor="text-gray-700" bgColor="bg-gray-700/10" />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm pb-10">
          {isPro ? "You are currently on a pro plan." : "You are currently on a free plan."}
        </div>
        {!isPro && (
          <div className="h-full w-72 pb-10 pt-10">
            <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;