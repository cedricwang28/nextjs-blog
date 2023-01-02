import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  "https://api-ca-central-1.hygraph.com/v2/clcd32skj41rr01tcgnz95q8p/master"
);
const QUERY = gql`
  {
    posts {
      id
    }
  }
`;
// const Q2 = gql`
//   {
//     query($id:ID){
//         post(where: { id: $id }) {
//             id
//             title
//             datePublished
//             author {
//                 name
//                 avatar {
//                     url
//                 }
//             }
//             coverImage {
//                 url
//             }
//             content {
//                 html
//             }
//         }
//     }
//   }
// `;

const QUERY2 = gql`
  query ($id: ID!) {
    post(where: { id: $id }) {
      id
      title
      datePublished
      author {
        name
        avatar {
          url
        }
      }
      coverImage {
        url
      }
      content {
        html
      }
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await client.request(QUERY);
  return {
    paths: posts.map((item) => ({
      params: {
        id: item.id,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  //   console.log(props);
  const data = await client.request(QUERY2, { id: params.id });
  return {
    props: {
      post: data.post,
    },
  };
}

export default function Post({ post }) {
  return (
    <div className="blog-wrapper">
      <div className="blog">
        <div className="blog-part is-menu">
          <a href="#" className="blog-menu">
            Work
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth=".7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-arrow-up-right"
              viewBox="0 0 24 24"
            >
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
          <a href="#" className="blog-menu">
            Studio
          </a>
          <a href="#" className="blog-menu">
            Blog
          </a>
          <a href="#" className="blog-menu">
            Contact
          </a>
          <a href="#" className="blog-menu mention">
            @MagazineDope
          </a>
          <a href="#" className="blog-menu subscribe">
            Subscribe
          </a>
        </div>

        <div className="blog-content">
          <div className="title">{post.title}</div>

          <div className="blog-author">
            <img src={post.author.avatar.url} alt="" />
            <div>
              <div className="date">{post.datePublished}</div>
              <div>By {post.author.name}</div>
            </div>
          </div>

          <p dangerouslySetInnerHTML={{ __html: post.content.html }}></p>
        </div>
      </div>
    </div>
  );
}
