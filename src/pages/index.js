import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>@hyeon</h1>
        {/* 포스트 수 */}
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {/* 존재하는 모든 포스트 반복 생성 */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            {/* 글 제목 기본 h3 폰트를 사용하려면 onclick으로 변경*/}
            <h2><Link to={node.fields.slug}>{node.frontmatter.title}</Link></h2>
            {/* 글 날짜 */}
            <h4 style={{color: '#B7B7B7', fontSize: '0.9em'}}>{node.frontmatter.date}</h4>
            {/* 글 요약 */}
            <p>{node.excerpt}</p>
            {(node.frontmatter.tag != null) ? node.frontmatter.tag.split(",").map((tag) => (
              <span>{tag}</span>
            )):""}
            <hr/>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            tag
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