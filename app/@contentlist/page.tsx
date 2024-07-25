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
    next: { tags: ["contentList"] },
  });
  const contentList: Content[] = await response.json();

  return (
    <>
      <h1 className=" text-lg">Content List Page</h1>
      <ul className="flex flex-col-reverse gap-4 overflow-y-auto">
        {contentList?.map(({ id, summary, rss_link }) => {
          const title = summary.split("\n")[0];
          const ellipsisTitle = ellipsis(title, 30);
          return (
            <Link
              href={`/?id=${id}`}
              key={id}
              className="text-ellipsis w-[400px]"
            >
              <div className="flex flex-col">
                <Markdown>{ellipsisTitle}</Markdown>
                <span className="break-words text-wrap">{rss_link}</span>
              </div>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default ContentListPage;
