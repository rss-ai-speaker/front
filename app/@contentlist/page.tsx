import { BASE_URL } from "@/app/apis";
import Markdown from "markdown-to-jsx";
import Link from "next/link";

interface Content {
  id: string;
  rss_link: string;
  summary: string;
  created_at: string;
}

const ContentListPage = async () => {
  const response = await fetch(`${BASE_URL}/api/list`, {
    cache: "no-cache",
  });
  const contentList: Content[] = await response.json();

  return (
    <>
      <h1 className=" text-lg">Content List Page</h1>
      <ul>
        {contentList?.map(({ id, summary }) => {
          const title = summary.split("\n")[0];
          return (
            <Link
              href={`/feed-summary?id=${id}`}
              key={id}
              className="text-ellipsis"
            >
              <Markdown>{title}</Markdown>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default ContentListPage;
