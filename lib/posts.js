import got from 'got';

// REST endpoint, category 2 (pangolin)
const dataURL = "https://dev-cs55-13-0.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/2";


// fetch data from WP REST API returned as JSON object
async function dataGet(){
  const jsonString = await got(dataURL);  // http request
  return JSON.parse(jsonString.body);     // convert JSON string to JS object 
}

// return array of post ID ojbects formatted for Next.js dynamic routing
export async function getAllPostIds() {
  const jsonObj = await dataGet();
  return jsonObj.map((item) => {
    return {
      params: { // params key array must be returned for Next.js dynamic routing
        id: item.ID.toString(), // convert numeric ID to string, 
      },  // otherwise a number will be compared to string and dynamic routing fails (ex 3 vs '3')
    };
  });
}

// post data needed for index.js, sorted by date
export async function getSortedPostsData() {
  const jsonObj = await dataGet();
  // sort by date
  jsonObj.sort((a,b) => {
    return b.post_date.localeCompare(a.post_date); 
  });
  // post data to display on index.js
  return jsonObj.map(item => { 
    return{ 
      id: item.ID.toString(),
      title: item.post_title,
      date: item.post_date
    };
  });
}

// returns post data of specified id for primary use in [id].js
export async function getPostData(id) {
  const jsonObj = await dataGet();
  // filter to match id
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === id;
  });
  // returns first match or empty no match
  let objReturned;
  if (objMatch.length > 0){
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return objReturned;
};

// ? line 9 - "let jsonString", "jsonstring=" vs "const jsonstring=" Why use let with two statements instead of const?
// ? line 45 - AI is determined to change lines 45-55 to "const match = jsonObj.find(obj => obj.ID.toString() === id); return match || {};"