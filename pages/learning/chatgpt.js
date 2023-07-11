import Link from "next/link";

export default function ChatGPT() {
    const links = {
        'Write A ChatGPT Chatbot With Node.js': 'https://www.youtube.com/watch?v=1YU83Lw58eo',
    }

    return (
        <div>
            <h1>ChatGPT</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name} chat`}>{name}</li>
                </Link>
            ))}

        </div>
    );
}