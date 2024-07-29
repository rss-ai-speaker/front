export const dynamic = "force-dynamic";

import { BASE_URL } from "@/app/apis";
import { fetcher } from "@/app/apis/fetcher";
import Markdown from "markdown-to-jsx";

interface PageProps {
  searchParams: {
    id: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const feedSummary = await fetcher<{text:string}>(
    `${BASE_URL}/api/summarize?id=${searchParams.id}`,
    { next: { tags: ["feedSummary", searchParams.id] } }
  );

  const markdownText = feedSummary.text
  return <Markdown>{markdownText}</Markdown>;
}
