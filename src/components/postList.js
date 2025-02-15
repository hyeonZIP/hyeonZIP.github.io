import React from "react";
import { Link } from "gatsby";

const PostList = ({ posts }) => {
  return (
    <div>
      {/* 존재하는 모든 포스트 반복 생성 */}
      {posts.map(({ node }) => {
        return (
          <div key={node.id}>
            <Link className="i-title" to={node.fields.slug}>{node.frontmatter.title}</Link>
            <div className="i-date">{node.frontmatter.date}</div>
            <div className="i-excerpt">{node.excerpt}</div>
            {(node.frontmatter.tag != null) ? node.frontmatter.tag.split(",").map((tag, index) => (
              <div className="tag" key={`${node.id}-${tag.trim()}-${index}`}>
                <Link to={`/tag?tag=${encodeURIComponent(tag.trim())}`}>{tag.trim()}</Link>
              </div>
            )) : ""}

            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
