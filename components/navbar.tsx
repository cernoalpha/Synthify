
import MobileSidebar from "./mobile-sidebar"
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import Sidebar from "./sidebar";




const Navbar = async ()=>{

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return(
        <div className="flex items-center p-4">
             <MobileSidebar apiLimitCount={apiLimitCount} isPro={isPro} />
            <div className="hidden md:flex w-full justify-start pb-10" >
            <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
            </div>
        </div>
    )
}

export default Navbar

