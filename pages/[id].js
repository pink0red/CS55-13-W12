import Layout from '../components/layout'; // Import the Layout component to wrap the page with consistent site layout
import Head from 'next/head'; // Import the Head component to set metadata for the page (e.g., title)
import utilStyles from '../styles/utils.module.css'; // Import CSS module styles from the utils.module.css file

// Import functions to:
// - generate a list of post IDs for dynamic routes (getAllPostIds)
// - fetch and return post content and metadata based on a given ID (getPostData)
import { getAllPostIds, getPostData } from '../lib/posts';
 

// getStaticProps runs at build time and fetches the data for a single post based on its ID
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}
 
// getStaticPaths tells Next.js which dynamic routes to pre-render at build time
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

// Default export for the dynamic post page component
// 
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.post_title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.post_title}</h1>
        <div className={utilStyles.lightText}>
          <p>{postData.post_date}</p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.post_content }} />
      </article>
    </Layout>
  );
}

