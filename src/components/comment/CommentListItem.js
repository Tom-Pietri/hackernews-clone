import React from 'react';
import CommentList from "./CommentList";
import './CommentListItem.css'
import TimeAgo from '../TimeAgo';

//Display a list of comments
class CommentListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            shown: true,
            kidComments: []
        } 
    }
    
    render() {
        const commentHeadSpan = (
            <span className="comhead">
                <span className="hnuser">{this.props.comment.by} </span>
                <TimeAgo time={this.props.comment.time} />
                <span onClick={this.handleClick.bind(this)}>{this.state.shown ? '[-]' : '[+]'}</span>
            </span>);
        const commentTextP = (
            <p dangerouslySetInnerHTML={{ __html: this.props.comment.text }} className="commtext"></p>
        )
        //if the comment has childs
        if(this.state.shown) {
            if(this.props.comment.kids) {
                return (
                    <div className="comment" >
                        {commentHeadSpan}
                        {commentTextP}
                        <div className="childs">
                            <CommentList comments={this.state.kidComments} />
                        </div>
                    </div>
                );
            }
            else {
                return (
                    <div className="comment" >
                        {commentHeadSpan}
                        {commentTextP}
                    </div>
                );
            }
        }
        else {
           return (
               <div className="comment">
                   {commentHeadSpan}
               </div>
           );
        }
    }

    componentDidMount() {
        //check if the comment has kids
        if (this.props.comment.kids) {
            //Getting the child comments
            this.props.comment.kids.forEach(kidCommentId => {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${kidCommentId}.json`)
                    .then(res => res.json())
                    .then(kidComment => {
                        this.setState({
                            kidComments: [...this.state.kidComments, kidComment]
                        });
                    })
            })
        }
    }

    handleClick() {
        this.setState(state => {
            return{
                shown: !(state.shown),
                kidComments: state.kidComments
            }
        });
    }
}

export default CommentListItem;