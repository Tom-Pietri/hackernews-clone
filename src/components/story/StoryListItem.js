import React from 'react';
import './StoryListItem.css'
import { Link } from "react-router-dom";
import TimeAgo from '../TimeAgo';

class StoryListItem extends React.Component {
    render() {
        let storyTitleDiv = this.makeTitleDiv();

        return(
            <div className="storylistitem">
                {storyTitleDiv}
                <div className="subtext">
                    <span className="storypoint">{this.props.story.score} points</span>
                    <span className="hnuser">by {this.props.story.by} | </span>
                    <TimeAgo time={this.props.story.time}/>
                    <span> | </span>
                    <Link to={'/story/' + this.props.story.id}>{this.props.story.descendants} comment{this.props.story.descendants>1 ? 's' : ''}</Link>
                </div>
            </div>
        );
    }

    // Create the title div with the differents infos if it's an article or another type of story
    makeTitleDiv() {
        const storyIsArticle = this.props.story.url != null;
        let storyTitleDiv;
        if (storyIsArticle) {
            storyTitleDiv = (
                <div className="title">
                    <a className="storylink" href={this.props.story.url}>{this.props.story.title}</a>
                    <span className="sitebit">({new URL(this.props.story.url).hostname})</span>
                </div>
            );
        }
        else {
            storyTitleDiv = (
                <div className="title">
                    <a className="storylink" href={this.props.story.id}>{this.props.story.title}</a>
                </div>
            );
        }

        return storyTitleDiv;
    }
}

export default StoryListItem;