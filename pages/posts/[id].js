// Import the Layout component to wrap the page with consistent site layout
import Layout from '../../components/layout';

// Import the Head component to set metadata for the page (e.g., title)
import Head from 'next/head';

// Import the custom Date component to format and display post dates
import Date from '../../components/date';

// Import CSS module for scoped styles
import utilStyles from '../../styles/utils.module.css';
 
// Import functions to:
// - generate a list of post IDs for dynamic routes (getAllPostIds)
// - fetch and return post content and metadata based on a given ID (getPostData)
import { getAllPostIds, getPostData } from '../../lib/posts';
 

// getStaticProps runs at build time and fetches the data for a single post based on its ID
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
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
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

