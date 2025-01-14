import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { transformUrl } from "../utils/utils";

export default function HudsonHome({}) {
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchEntries().then((content) => {
            setContent(content);
        });

        async function fetchEntries() {
            const file = Object.values(
                import.meta.glob("/content/grill/content.md", { eager: true, import: "default" })
            )[0];
            let content = await fetch(file)
                .then((res) => res.text())
                .then((text) => {
                    return text;
                });

            return content;
        }
    }, []);

    return (
        <div className='w-full h-auto flex flex-col justify-start items-center gap-5 overflow-auto p-5'>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-1'>
                <p className='w-auto font-bold text-5xl'>Grill</p>
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
