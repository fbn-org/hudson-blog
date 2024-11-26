import { useEffect, useState } from "react";
import { NavLink } from "react-router";

export default function HudsonHome({}) {
    // const entries = useState([]);

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
                        const date = lines[0];
                        const title = lines[1];

                        resolve({ date, title });
                    });
            });
        }

        async function fetchEntries() {
            const files = Object.values(
                import.meta.glob("/posts/hudson/posts/*.md", { eager: true, import: "default" })
            );
            let entries = [];
            for (let path of files) {
                await process(path).then((entry) => {
                    entry.id = path.split("/").pop().split(".")[0];
                    entries.push(entry);
                });
            }

            // sort entries by date
            entries.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            console.log(entries);

            return entries;
        }
    }, []);

    return (
        <div className='w-full h-auto flex flex-col justify-start items-center gap-5'>
            <p className='w-auto font-bold text-5xl mt-4'>Hudson</p>

            {posts?.length > 0 && (
                <div className='w-full max-w-screen-sm h-auto flex flex-col justify-start items-start gap-1'>
                    {posts.map((entry, index) => (
                        <NavLink
                            to={`/hudson/${entry.id}`}
                            className='w-auto h-auto flex flex-row justify-start items-center gap-3'
                            key={index}
                        >
                            <p className='font-bold'>{entry.date}</p>
                            <p className='underline'>{entry.title}</p>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}
