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

export async function getHome(lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const field_prefix = lang == "cn" ? "Cn" : "";

  const entries = await fetchGraphQL(
    `query {
      homeCollection 
      (locale: "${q}")
      {
        items 
        {
          title: title${field_prefix}
          heading: heading${field_prefix}
          footer:footer${field_prefix}{
            json
          }
        }
      }
  projectCollection(order:[sys_publishedAt_ASC],locale: "${q}")
  {
    items{
      thumbnail
      {
        url
      }
      title:title${field_prefix}
      subTitle:subTitle${field_prefix}
      slug
    }
  }
    }`
  );
  return entries;
}

export async function getPage(slug, lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const entries = await fetchGraphQL(
    `query {
  staticPageCollection(where:{slug:"${slug}"},locale: "${q}"){
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

export async function getAbout(lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const field_prefix = lang == "cn" ? "Cn" : "";
  const entries = await fetchGraphQL(
    `query 
    {
     aboutCollection(locale:"${q}")
  {
    items
    {
      title:title${field_prefix}
      image
      {
          url(transform:{width:645})
      }
      leftText:leftText${field_prefix}
      {
        json
      }
      rightText:rightText${field_prefix}
      {
        json
      }
      quote:quote${field_prefix}
      {
        json
      }
      quotePerson:quotePerson${field_prefix}
    }
  }
    }`
  );

  return entries;
}

export async function getTeam(lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const field_prefix = lang == "cn" ? "Cn" : "";
  const ids = await fetchGraphQL(
    `query {
   teamCollection(locale: "${q}") { items{
    
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
   team(id:"${teamId}",locale: "${q}"){
  
      title:title${field_prefix}
      subText:subText${field_prefix}
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
      teamMembersCollection:teamMembers${field_prefix}Collection
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

export async function getPress(lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const entries = await fetchGraphQL(
    `query {
     pressCollection(locale: "${q}")
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

export async function getProjects(lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const field_prefix = lang == "cn" ? "Cn" : "";
  const entries = await fetchGraphQL(
    `query {
  projectCollection(order:[sys_publishedAt_ASC],locale: "${q}")
  {
    items{
      thumbnail
      {
        url
      }
      title:title${field_prefix}
      subTitle:subTitle${field_prefix}
      slug
    }
  }
    }`
  );
  return entries;
}

export async function getProject(slug, lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const field_prefix = lang == "cn" ? "Cn" : "";
  const entries = await fetchGraphQL(
    `query {
projectCollection(where:{ 
		 slug: "${slug}" 
		
},limit:1,locale: "${q}"){
  items
  {
      sys
      {
        publishedAt
      }
    title:title${field_prefix}
    heroBanner
    {
      url
    }
    subTitle:subTitle${field_prefix}
    blocksCollection:blocks${field_prefix}Collection(preview:false)
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

export async function getPrevNext(createdAt, lang) {
  const q = lang == "jp" ? "ja-JP" : "en-US";
  const entries = await fetchGraphQL(
    `query {
 prev:projectCollection(order:sys_publishedAt_DESC,limit:1,locale: "${q}",where:{sys:{publishedAt_lt:"${createdAt}"}}){
    items
    {
     	title
      slug
    }
  }
 next:projectCollection(order:sys_publishedAt_ASC,limit:1,locale: "${q}",where:{sys:{publishedAt_gt:"${createdAt}"}}){
    items
    {
     	title
      slug
    }
  }

first:projectCollection(order:sys_publishedAt_ASC,limit:1,locale: "${q}"){
    items
    {
     	title
      slug
    }
  }

last:projectCollection(order:sys_publishedAt_DESC,limit:1,locale: "${q}"){
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
