import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";

import { getAllPostIds, getPostByIdAsync } from "../../lib/posts";

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            {postData.title}
            <br />
            {postData.id}
            <br />
            <Date dateString={postData.date} />
            <br />
            <div dangerouslySetInnerHTML={{ __html: postData.html }}></div>
        </Layout>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const { id } = params;
    const postData = await getPostByIdAsync(id);

    return {
        props: {
            postData,
        },
    };
}
