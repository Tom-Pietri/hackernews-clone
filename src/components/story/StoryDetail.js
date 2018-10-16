import React from "react";  
import StoryListItem from "./StoryListItem";
import CommentList from "../comment/CommentList";

//Show the details of a story
class StoryDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(this.props.match.params.id, 10),
            story : undefined,
            comments: undefined
        }
    }

    render() {
        // Wait for the story and comments to load
        if(!this.state.story || !this.state.comments) {
            return(<div></div>)
        }
        else {
            const storyIsArticle = this.state.story.url != null;
            let storyText = (<div></div>);
            if(!storyIsArticle) {
                //using dangerouslySetInnerHTML to avoid react escaping hex character
                storyText = (
                    <p  dangerouslySetInnerHTML={{__html: this.state.story.text}}></p>
                )
            }
            return(
                <div>
                    <StoryListItem story={this.state.story} key={this.state.story.id} />
                    {storyText}
                    <CommentList comments={this.state.comments} />
                </div>
            )
        }
    }


    componentDidMount() {
        //Getting the story
        fetch(`https://hacker-news.firebaseio.com/v0/item/${this.state.id}.json`)
            .then(res => res.json())
            .then(story => {
                this.setState({
                    story: story,
                    comments: []
                });
                //Getting all the top comments of the story
                story.kids.forEach((commentId, index) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
                        .then(res => res.json())
                        .then(comment => {
                            let storyClone =  this.state.story;
                            let cloneComments = this.state.comments.slice(0);
                            cloneComments[index] = comment;
                            //storyClone.comments = [...storyClone.comments, comment]
                            this.setState({
                                story: storyClone,
                                comments: cloneComments
                            });
                        });
                }); 
            });
    }
}

export default StoryDetails;