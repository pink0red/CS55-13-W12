import got from 'got';

// REST endpoint, category 2
const dataURL = "https://dev-cs55-13-0.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/2";

export async function getAllPostIds() {

  let jsonString;
  jsonString = await got(dataURL);
  console.log(jsonString.body);
  const jsonObj = JSON.parse(jsonString.body);

  return jsonObj.map((item) => {
    return {
      params: {
        id: item.ID.toString(),
      },
    };
  });
}

export async function getSortedPostsData() {

  let jsonString;
  jsonString = await got(dataURL);
  console.log(jsonString.body);
  const jsonObj = JSON.parse(jsonString.body);
  jsonObj.sort((a,b) => {
    return b.post_date.localeCompare(a.post_date);
  });

  return jsonObj.map(item => {
    return{
      id: item.ID.toString(),
      title: item.post_title,
      date: item.post_date
    };
  });
 
}



export async function getPostData(id) {
 
  let jsonString;
  jsonString = await got(dataURL);
  console.log(jsonString.body);
  const jsonObj = JSON.parse(jsonString.body);
 
  const objMatch = jsonObj.filter(obj => {
    return obj.ID.toString() === id;
  });

  let objReturned;
  if (objMatch.length > 0){
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return objReturned;
};
