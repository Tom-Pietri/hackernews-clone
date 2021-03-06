import React, {Component} from 'react';
import { Link } from "react-router-dom";

import StoryList from "./StoryList";

/**
 * Display the list of the latest 'show' stories
 */
class ShowStories extends Component {

    // Up to 200 stories for showStories
    maxStoryNumber = 200;

    render() {
        return (
            <div>
                <StoryList url={"https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty"}
                    listStart={30 * (this.getPageNumber() - 1)} listEnd={30 * this.getPageNumber()} />
                <Link to={`/top/${this.getPageNumber() + 1}`}>More</Link>
            </div>
        );
    }

    getPageNumber() {
        let pageNumber = parseInt(this.props.match.params.page, 10);
        // Check that the url parameter is a number
        if (isNaN(pageNumber)) {
            pageNumber = 1;
        } 
        // Check that we don't try to load stories after the last one of the list
        else if (((pageNumber - 1) * 30) > this.maxStoryNumber) {
            pageNumber = 1;
        }
        return pageNumber;
    }
}

export default ShowStories;