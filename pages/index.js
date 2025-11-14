// Import the <Head> component from Next.js to manage the document head (e.g., title, meta)
import Head from 'next/head';

// Import the default export (Layout component) and a named export (siteTitle) from the layout component
import Layout, { siteTitle } from '../components/layout';

// Import CSS module styles from the utils.module.css file
import utilStyles from '../styles/utils.module.css';

// Import a function that reads markdown files from the 'posts' directory,
// extracts their metadata (like title, date, and id), and returns them sorted by date
import { getSortedPostsData } from '../lib/posts';

// Import the Link component for client-side navigation between routes
import Link from 'next/link';

// Import the Date component for formatting and displaying date strings
import Date from '../components/date';

// getStaticProps runs at build time to fetch data and pass it to the page component as props
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// Home component renders the blog list using the data provided by getStaticProps
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  );
}