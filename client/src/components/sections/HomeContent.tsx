import HeroBanner from "./HeroBanner";
import MainContent from "./MainContent";
import TrendingTopic from "./TrendingTopic";


export default function HomeContent() {
    return <>
        <HeroBanner />
        <TrendingTopic />
        <MainContent />
    </>
}