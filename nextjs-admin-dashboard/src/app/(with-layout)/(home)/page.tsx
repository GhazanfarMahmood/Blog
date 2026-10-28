
import { OverviewCardsGroup } from "./_components/overview-cards";
import { RecentBlogPosts } from "./_components/recent-blog-posts";
import { PendingActions } from "./_components/pending-actions";
import { BlogPublishingActivity } from "./_components/blog-publishing-activity";

export default function Home() {
  return (
    <div className="space-y-6">
      <OverviewCardsGroup />

      <BlogPublishingActivity />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RecentBlogPosts />
        <PendingActions />
      </div>
    </div>
  );
}
