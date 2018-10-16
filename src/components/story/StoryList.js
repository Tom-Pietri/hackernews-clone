import React from 'react';
import StoryListItem from "./StoryListItem";

/**
 * Component to load and display a list of stories
 * 
 * Input props :
 * url : the url to fetch the list of stories
 * listStart : the index of the first story to load
 * listEnd : the index of the last story to load
 */
class StoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
    }

    render() {
        return(
            <div className="storylist">
                {
                    this.state.stories.map((story) => {
                        return <StoryListItem story={story} key={story.id}/>
                    })
                }
            </div>
        )
    }

    //Reload the stories when the props change
    componentWillReceiveProps() {
        this.setState({
            stories: []
        });
        this.loadStories();
    }

    componentDidMount() {
        this.loadStories();
    }

    loadStories() {
        fetch(this.props.url)
            .then(res => res.json())
            .then((storiesIds) => {
                //Get the details for the stories between start and end of the list
                storiesIds.slice(this.props.listStart, this.props.listEnd).forEach((storyId, index) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`)
                        .then(res => res.json())
                        .then(story => {
                            if(story != null) {
                                //Keep the stories in order
                                let storiesCopy = this.state.stories.slice(0);
                                storiesCopy[index] = story;
                                this.setState({
                                    stories: storiesCopy,
                                });
                            }
                        })
                });
            });
    }
}

export default StoryList;