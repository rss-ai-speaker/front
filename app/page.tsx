import { BASE_URL } from "@/app/apis";
import Markdown from "markdown-to-jsx";

interface PageProps {
  searchParams: {
    id: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  const feedSummary = await fetch(
    `${BASE_URL}/api/summarize?id=${searchParams.id}`,
    { next: { tags: ["feedSummary", searchParams.id] } }
  );
  const markdownText = await feedSummary.text();
  return <Markdown>{markdownText}</Markdown>;
}
