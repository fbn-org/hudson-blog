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
            const path = files.find((path) => path.includes(postId));
            if (path) {
                fetch(path)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");

                        console.log(lines.join("\n"));

                        setContent(lines.slice(2).join("\n"));
                    });
            }
        }

        fetchContent();
    }, [postId]);

    return (
        <div className='min-w-full overflow-auto px-5'>
            <Markdown
                className='prose prose-lg prose-neutral mt-2 min-w-full'
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
