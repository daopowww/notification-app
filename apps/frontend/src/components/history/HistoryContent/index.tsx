import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import { HistorySkeletonSection } from "@/components/history/HistorySkeletonSection";
import { HistoryEmptySection } from "@/components/history/HistoryEmptySection";
import { HistoryResultSection } from "@/components/history/HistoryResultSection";
import { HistoryErrorSection } from "@/components/history/HistoryErrorSection";
import type { historyLoader } from "@/router/loaders";

export const HistoryContent = () => {
  const { history } = useLoaderData<typeof historyLoader>();

  return (
    <Suspense fallback={<HistorySkeletonSection />}>
      <Await resolve={history} errorElement={<HistoryErrorSection />}>
        {({ logs }) =>
          logs.length === 0 ? (
            <HistoryEmptySection />
          ) : (
            <HistoryResultSection logs={logs} />
          )
        }
      </Await>
    </Suspense>
  );
};
