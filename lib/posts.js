//import fs from 'fs'; defunct
//import path from 'path'; defunct
//import matter from 'gray-matter'; defunct
//import { remark } from 'remark'; defunct
//import html from 'remark-html'; defunct

import got from 'got';

//const postsDirectory = path.join(process.cwd(), 'posts'); defunct

// REST endpoint
const dataURL = "https://dev-cs55-13-0.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/1";

export async function getSortedPostsData() {
  //const fileNames = fs.readdirSync(postsDirectory); defunct

  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error){
    jsonString.body = [];
    console.log(error);
  }

  const jsonObj = JSON.parse(jsonString.body);

  const allPostsData = fileNames.map((fileName) => {
    //const id = fileName.replace(/\.md$/, '');
    //const fullPath = path.join(postsDirectory, fileName);
    //const fileContents = fs.readFileSync(fullPath, 'utf8');
    //const matterResult = matter(fileContents);
 
    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.post_date < b.post_date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getAllPostIds() {
  //const fileNames = fs.readdirSync(postsDirectory); defunct
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error){
    jsonString.body = [];
    console.log(error);
  }
 
  const jsonObj = JSON.parse(jsonString.body);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id) {
  //const fullPath = path.join(postsDirectory, `${id}.md`); defunct
  //const fileContents = fs.readFileSync(fullPath, 'utf8'); defunct
 
  let jsonString;
  try {
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch (error){
    jsonString.body = [];
    console.log(error);
  }

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
 
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
 
  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}