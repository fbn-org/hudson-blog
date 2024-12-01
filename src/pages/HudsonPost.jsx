import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { mdTableJson, transformUrl } from "../utils/utils";

export default function HudsonPost({}) {
    const postId = useParams().postId;

    const [content, setContent] = useState("# hello");
    const [date, setDate] = useState("");

    useEffect(() => {
        const files = Object.values(import.meta.glob("/content/hudson/posts/*.md", { eager: true, import: "default" }));

        async function fetchContent() {
            const postIdDecoded = decodeURIComponent(postId);
            for (let path of files) {
                fetch(path)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");
                        const metadata = lines.slice(0, 4).join("\n");

                        const json = mdTableJson(metadata);
                        const date = json.date;
                        const title = json.title;

                        if (title === postIdDecoded) {
                            setContent(lines.slice(4).join("\n"));
                            setDate(date);
                        }
                    });
            }
        }

        fetchContent();
    }, [postId]);

    return (
        <div className='w-full overflow-auto flex flex-col items-center justify-start'>
            <div className='max-w-screen-md min-w-screen-md h-auto flex flex-col items-center justify-start px-5 mb-5'>
                <p className='w-full text-start'>{dayjs(date).format("MMMM D, YYYY")}</p>
                <Markdown
                    className='prose prose-lg prose-neutral mt-2 w-full h-auto'
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    urlTransform={transformUrl}
                >
                    {content}
                </Markdown>
            </div>
        </div>
    );
}
