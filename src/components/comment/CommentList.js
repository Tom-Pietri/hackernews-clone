import React from 'react';
import CommentListItem from "./CommentListItem";

//Display a list of comments
class CommentList extends React.Component {
    render() {
        return(
            <div>
                {
                    this.props.comments.map(comment => {
                        return <CommentListItem comment={comment} key={comment.id}/>
                    })
                }
            </div>
        )
    }    
}

export default CommentList;