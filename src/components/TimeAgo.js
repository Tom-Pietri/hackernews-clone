import React from 'react';

//Display how long ago the time is (ie : x minutes | y hours | z days)
class TimeAgo extends React.Component {
    render() {
        let denominator = null;
        let time = null;

        // Get the current time as seconds from epoch
        const currentTime = Math.round(new Date().getTime() / 1000);
        const timeSinceStoryPost = currentTime - this.props.time;
        
        // less than an hour ago
        if (timeSinceStoryPost < 3600) {
            time = Math.floor(timeSinceStoryPost / 60);
            denominator = "minute";
        }
        // less than 1 day ago
        else if (timeSinceStoryPost < 86400) {
            time = Math.floor(timeSinceStoryPost / 3600);
            denominator = "hour";
        }
        // More than 1 day ago
        else {
            time = Math.floor(timeSinceStoryPost / 86400);
            denominator = "day";
        }

        return this.makeSpan(denominator, time);
    }

    //Create the span to display the time
    makeSpan(denominator, time) {
        return (
            <span>{time} {denominator}{time > 1 ? 's' : ''} ago </span>
        )
    }
}

export default TimeAgo;