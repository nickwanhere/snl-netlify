async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getHome() {
  const entries = await fetchGraphQL(
    `query {
      homeCollection
      {
        items 
        {
          title
          heading
          footer{
            json
          }
        }
      }
  projectCollection(order:[sys_publishedAt_ASC])
  {
    items{
      thumbnail
      {
        url
      }
      title
      subTitle
      slug
    }
  }
    }`
  );
  return entries;
}

export async function getPage(slug) {
  const entries = await fetchGraphQL(
    `query {
  staticPageCollection(where:{slug:"${slug}"}){
    items{
      title
      content{
        json
      }
    }
  }
}`
  );
  return entries;
}

export async function getAbout() {
  const entries = await fetchGraphQL(
    `query 
    {
     aboutCollection
  {
    items
    {
      title
      image
      {
          url(transform:{width:645})
      }
      leftText
      {
        json
      }
      rightText
      {
        json
      }
      quote
      {
        json
      }
      quotePerson
    }
  }
    }`
  );
  return entries;
}

export async function getTeam() {
  const ids = await fetchGraphQL(
    `query {
   teamCollection { items{
    
    sys 
    {
      id
    }
  } }} 
   `
  );

  const teamId = ids.data.teamCollection.items[0].sys.id;

  const entries = await fetchGraphQL(
    `query {
   team(id:"${teamId}"){
  
      title
      subText
      {
        json
      }
      galleryCollection
      {
				items
        {
          url(transform:{width:645,height:670,
      resizeFocus: BOTTOM,
      resizeStrategy: CROP})
          description
        }
      }
      teamMembersCollection 
      {
        items 
        {
          jobTitle
          name
          bio 
          {
            json
          }
        }
      }
    
  }
    }`
  );
  return entries;
}

export async function getPress() {
  const entries = await fetchGraphQL(
    `query {
     pressCollection
  {
    items
    {
      title
      image
      {
        url
      }
      link
      text
      {
        json
      }
      
    }
  }
    }`
  );
  return entries;
}

export async function getProjects() {
  const entries = await fetchGraphQL(
    `query {
  projectCollection(order:[sys_publishedAt_ASC])
  {
    items{
      thumbnail
      {
        url
      }
      title
      subTitle
      slug
    }
  }
    }`
  );
  return entries;
}

export async function getProject(slug) {
  const entries = await fetchGraphQL(
    `query {
projectCollection(where:{ 
		 slug: "${slug}" 
		
},limit:1){
  items
  {
      sys
      {
        publishedAt
      }
    title
    heroBanner
    {
      url
    }
    subTitle
    blocksCollection(preview:false)
    {
				items
      {
          __typename
					... on Gallery {
            galleryCollection
            {
              items 
              {
                url(transform:{width:1095,height:700,resizeStrategy:FILL})
                description
              }
            }
          }
					... on ImageLeftTextRight {
            image
            {
              url
            }
            text 
            {
              json
            }
            link
          }
					... on ImagesRow {
            ,layout
            imagesCollection
            {
              items
              {
                url
                description
              }
            }
          }
					... on MagazineRow {
            ,topText 
            {
              json
            }
            bottomText
            {
              json
            }
            imagesCollection
            {
              items
              {
                size1:url(transform:{width:420,height:560,resizeStrategy:FILL})
                size2:url(transform:{width:532,height:313,resizeStrategy:FILL})
                size3:url(transform:{width:420,height:420,resizeStrategy:FILL})
                description
              }
            }
          }

        
					... on ExternalBlock {
            image
            {
              url
            }
            text 
            {
              json
            }
            linnk
          }
      }
    }
  }
}
}`
  );
  return entries;
}

export async function getPrevNext(createdAt) {
  const entries = await fetchGraphQL(
    `query {
 prev:projectCollection(order:sys_publishedAt_DESC,limit:1,where:{sys:{publishedAt_lt:"${createdAt}"}}){
    items
    {
     	title
      slug
    }
  }
 next:projectCollection(order:sys_publishedAt_ASC,limit:1,where:{sys:{publishedAt_gt:"${createdAt}"}}){
    items
    {
     	title
      slug
    }
  }

first:projectCollection(order:sys_publishedAt_ASC,limit:1){
    items
    {
     	title
      slug
    }
  }

last:projectCollection(order:sys_publishedAt_DESC,limit:1){
    items
    {
     	title
      slug
    }
  }
}

`
  );

  return entries;
}
