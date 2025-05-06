import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { mdTableJson } from "../utils/utils";

export default function HudsonHome({}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchEntries().then((entries) => {
            setPosts(entries);
        });

        async function process(file) {
            return new Promise((resolve) => {
                fetch(file)
                    .then((res) => res.text())
                    .then((text) => {
                        // the first line is the date and the second line is the title
                        const lines = text.split("\n");
                        const metadata = lines.slice(0, 4).join("\n");

                        const json = mdTableJson(metadata);

                        resolve({ date: json.date, title: json.title });
                    });
            });
        }

        async function fetchEntries() {
            const files = Object.values(
                import.meta.glob("/content/hudson/posts/*.md", { eager: true, import: "default" })
            );
            let entries = [];
            for (let path of files) {
                await process(path).then((entry) => {
                    // entry.id = path.split("/").pop().split(".")[0];
                    entry.id = encodeURIComponent(entry.title);
                    entries.push(entry);
                });
            }

            // sort entries by date
            entries.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            return entries;
        }
    }, []);

    const daysSincePost = useMemo(() => {
        if (posts.length === 0) return 0;
        const latest = posts[0];
        const latestDate = dayjs(latest.date);
        const diff = dayjs().diff(latestDate, "day");

        return diff;
    }, [posts]);

    return (
        <div className='w-full h-full flex flex-col justify-start items-center gap-5 overflow-auto p-5'>
            <div className='w-full h-auto flex flex-col justify-start items-center gap-1'>
                <p className='w-auto font-bold text-5xl'>Hudson</p>
                <p className=''>days since last post: {daysSincePost}</p>
                {daysSincePost > 7 && (
                    <p className='text-red-500 font-bold'>per the agreement, hudson must cut off a finger.</p>
                )}
            </div>

            {posts?.length > 0 && (
                <div className='w-auto max-w-screen-sm h-auto flex flex-col justify-start items-start gap-1'>
                    {posts.map((entry, index) => (
                        <NavLink
                            to={`/hudson/${entry.id}`}
                            className='w-auto h-auto flex flex-row justify-start items-start gap-3'
                            key={index}
                        >
                            <p className='font-bold'>{dayjs(entry.date).format("MM/DD/YY")}</p>
                            <p className='underline'>{entry.title}</p>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}
