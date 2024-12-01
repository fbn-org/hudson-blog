import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { mdTableJson, transformUrl } from "../utils/utils";

export default function HudsonHome({}) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchEntries().then((content) => {
            console.log(content);
            setContent(content);
        });

        async function process(file) {
            return new Promise((resolve) => {
                fetch(file)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");
                        const metadata = lines.slice(0, 4).join("\n");
                        const content = lines.slice(4).join("\n");

                        const json = mdTableJson(metadata);

                        resolve({ date: json.date, title: json.title, content });
                    });
            });
        }

        async function fetchEntries() {
            let content = "";
            await process("/content/grill/content.md").then((entry) => {
                console.log(entry);
                content = entry.content;
            });
            return content;
        }
    }, []);

    return (
        <div className='w-full h-auto flex flex-col justify-start items-center gap-5 overflow-auto p-5'>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-1'>
                <p className='w-auto font-bold text-5xl mt-4'>Grill</p>
            </div>

            {content?.length > 0 && (
                <div className='w-auto max-w-screen-md flex flex-col justify-start items-center'>
                    <Markdown
                        className='prose prose-lg prose-neutral mt-2 w-full h-auto'
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        urlTransform={transformUrl}
                    >
                        {content}
                    </Markdown>
                </div>
            )}
        </div>
    );
}
