import React from "react";
import {Link} from 'gatsby';

const TagList = ({ tags, selectedTag}) => {

    return (
      <div className="tag-list">
        <div classNAme="tag-list">
          {tags.map((tag) => (
            <Link
              to={tag.fieldValue === selectedTag ? '/tag' : `/tag?tag=${encodeURIComponent(tag.fieldValue)}`} 
              className={`tag ${selectedTag === tag.fieldValue ? 'selected' : ''}`} 
              key={tag.fieldValue} 
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          ))}
        </div>
        <div className="verticalSpace"></div>
      </div>
    );
  };
  

export default TagList;