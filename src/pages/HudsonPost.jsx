import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import remarkGfm from "remark-gfm";

export default function HudsonPost({}) {
    const postId = useParams().postId;

    const [content, setContent] = useState("# hello");

    useEffect(() => {
        const files = import.meta.glob("/posts/hudson/posts/*.md");

        async function fetchContent() {
            const path = Object.keys(files).find((path) => path.includes(postId));
            if (path) {
                fetch(path)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");

                        console.log(lines);

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
                // rehypePlugins={[rehypeRaw]}
            >
                {content}
            </Markdown>
        </div>
    );
}
