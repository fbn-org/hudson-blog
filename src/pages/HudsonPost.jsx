import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function HudsonPost({}) {
    const postId = useParams().postId;

    const [content, setContent] = useState("# hello");

    useEffect(() => {
        const files = Object.values(import.meta.glob("/posts/hudson/posts/*.md", { eager: true, import: "default" }));
        console.log(files);

        async function fetchContent() {
            for (let path of files) {
                fetch(path)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");
                        const date = lines[0].split(":")[1].trim();
                        const title = lines[1].split(":")[1].trim();
                        if (`${title}` === postId) {
                            setContent(lines.slice(2).join("\n"));
                        }
                    });
            }
        }

        fetchContent();
    }, [postId]);

    return (
        <div className='min-w-screen w-full overflow-auto px-5 flex flex-col items-center justify-start h-full'>
            <Markdown
                className='max-w-screen-md prose prose-lg prose-neutral mt-2 w-full'
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                urlTransform={(url) => {
                    if (url.startsWith("/images")) {
                        if (import.meta.env.DEV) {
                            return `/posts/hudson${url}`;
                        }
                        return `https://github.com/fbn-org/hudson-blog/blob/main/posts/hudson${url}?raw=true`;
                    } else {
                        return url;
                    }
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}
