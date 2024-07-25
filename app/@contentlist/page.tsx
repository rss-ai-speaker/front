import { BASE_URL } from "@/app/apis";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

interface Content {
  id: string;
  rss_link: string;
  summary: string;
  created_at: string;
}

const ellipsis = (text: string, length: number) =>
  text.length > length ? text.slice(0, length) + "..." : text;

const ContentListPage = async () => {
  const response = await fetch(`${BASE_URL}/api/list`, {
    cache: "no-cache",
  });
  const contentList: Content[] = await response.json();

  return (
    <>
      <h1 className=" text-lg">Content List Page</h1>
      <ul className="flex flex-col gap-4">
        {contentList?.map(({ id, summary }) => {
          const title = summary.split("\n")[0];
          const ellipsisTitle = ellipsis(title, 30);
          return (
            <Link
              href={`/feed-summary?id=${id}`}
              key={id}
              className="text-ellipsis"
            >
              <Markdown>{ellipsisTitle}</Markdown>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default ContentListPage;
