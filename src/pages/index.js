import React, {useState} from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import PostList from "../components/postList"

export default ({ data }) => {

  const profileImg = getImage(data.allFile.nodes[0].childImageSharp.gatsbyImageData)
  const [posts] = useState(data.allMarkdownRemark.edges)

  return (
    <Layout>
      <div>
        <div className="p-area">
          <div><GatsbyImage image={profileImg} alt="profileImage"/></div>
          <div>
            <div className="p-name">@hyeonZIP</div>
            <div className="p-intro">#Chill Develop</div>
            <div> [아이콘 구역]</div>
          </div>
        </div>
        {/* 포스트 수 */}
        <h4>{posts.length} Posts</h4>
        {/* 존재하는 모든 포스트 반복 생성 */}
        <PostList posts={posts}/>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile(filter: {name: {eq: "avatar"}}){
      nodes{
        childImageSharp{
          gatsbyImageData(width: 150, height: 150)
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: {published: {ne: false}}} 
      ) 
      {
        totalCount
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
              tag
              series
              published
            }
            fields{
              slug
            }
            excerpt(truncate: true, pruneLength: 223)          
          }
        }
      }
  }
`