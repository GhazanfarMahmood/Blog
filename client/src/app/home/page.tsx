// COMPONENTS
import HeroBanner from "@/components/layout/heroBanner";
import MainContent from "@/components/layout/mainContent";
import TrendingTopic from "@/components/layout/trendingTopic";

export default function Home(){
    return (<>
        <HeroBanner />
        <TrendingTopic />
        <MainContent />
    </>)
}