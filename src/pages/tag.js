import React, {useState, useEffect} from "react";
import { Link, graphql, navigate } from "gatsby"
import {useLocation} from "@reach/router";
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/postList";
import TagList from "../components/tagList";

export default ({data}) => {
  const location = useLocation();

  const [selectedTag,setSelectedTag] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [tagList, setTagList]  = useState([]);
  const [selectedTagPostCount, setSelectedTagPostCount] = useState(0);

  /**
   * setSelectedTag: 쿼리파라미터에서 태그 정보 반환
   */
  useEffect(()=>{
    console.log("query effect!!!!!!!")
    const queryParams = new URLSearchParams(location.search);
    const tag = queryParams.get("tag");
    setSelectedTag(tag);
  }, [location.search]);

  /**
   * setTagList: 모든 태그와 개별 갯수 반환
   */
  useEffect(() => {
    const tagCounts = {};
    data.allTags.group.forEach(tag => {
        tag.fieldValue.split(',').forEach(t => {
            const trimmedTag = t.trim();
            tagCounts[trimmedTag] = (tagCounts[trimmedTag] || 0) + tag.totalCount;
        });
    });

    const tags = Object.entries(tagCounts).map(([fieldValue, totalCount]) => ({
      fieldValue,
      totalCount
  }));

      setTagList(tags);
  }, [data.allTags.group]);

  /**
   * setFilteredPosts: 선택된 태그에 대한 게시글 반환
   * setSelectedTagPostsCount: 선택된 태그에 대한 게시글 갯수 반환
   */
  useEffect(() => {
    const posts = data.allMarkdownRemark.edges.filter(edge => {
        if (!selectedTag) return true; // 선택된 태그가 없으면 모든 게시물 표시
        //tag가 없는 게시물도 있기 때문에 undefined 반환
        const postTags = edge.node.frontmatter.tag?.split(',').map(t => t.trim()) ?? [];
        return postTags.includes(selectedTag);
    });
    setFilteredPosts(posts);
    setSelectedTagPostCount(posts.length);
  }, [selectedTag, data.allMarkdownRemark.edges]);

  return(
    <Layout>
      {selectedTag && (
        <div className="tag-header">
          There {selectedTagPostCount === 1 ? 'is' : 'are'} {selectedTagPostCount} related 
          post{selectedTagPostCount !== 1 && 's'} #{selectedTag}
        </div>
      )}
      <TagList tags={tagList} selectedTag={selectedTag}/>
      <PostList posts={filteredPosts}/>
    </Layout>
  );
};

export const Head = () => <Seo title="Page two" />

export const query = graphql`
  query {
        allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: {published: {ne: false}}} 
      )  {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tag
          }
          fields {
            slug
          }
          excerpt(truncate: true, pruneLength: 223)
        }
      }
    }
    allTags: allMarkdownRemark(filter: { frontmatter: {published: {ne: false}}}) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
    }
  }
`
