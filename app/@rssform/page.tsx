import Button from "@/app/_components/Button";
import { BASE_URL } from "@/app/apis";
import { redirect } from "next/navigation";

export default function RssFormPage() {
  const generateFeed = async (formData: FormData) => {
    "use server";

    const link = formData.get("link");

    const response = await fetch(`${BASE_URL}/api/summarize`, {
      method: "POST",
      body: JSON.stringify({ link }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const text = await response.text();
    return redirect(`/feed-summary?id=${text}`);
  };

  return (
    <form
      action={generateFeed}
      className="flex flex-col items-center space-y-4"
    >
      <h1 className="text-4xl font-bold">generate your rss feed</h1>
      <p className="text-lg text-center">
        Enter your RSS feed URL to generate a new feed.
      </p>
      <input
        type="text"
        name="link"
        placeholder="RSS feed URL"
        className="border border-gray-300 rounded-md px-4 py-2"
      />
      <Button>Generate</Button>
    </form>
  );
}
