export function getAllPostIds() {
    const fileNames = [
        {
            params: {
                id: 'ssg-ssr'
            }
        },
        {
            params: {
                id: 'pre-rendering'
            }
        }
    ]

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //     .use(html)
    //     .process(matterResult.content);
    // const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        ...matterResult.data,
    };
}
