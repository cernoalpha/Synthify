import Navbar from "@/components/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
}:{
    children: React.ReactNode
}) => {
    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <main className=" bg-muted"> 
                <Navbar />
                {children}
            </main>
            {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 md:right-0 bg-gray-900"> 
                <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            </div> */}
        </div>
    );
}

export default DashboardLayout;
