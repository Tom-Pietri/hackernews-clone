import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'

import TopStories from "./story/TopStories";
import NewestStories from "./story/NewestStories";
import ShowStories from "./story/ShowStories";
import AskStories from "./story/AskStories";

class Main extends Component {
    render() {
        return(
            <main>
                <Switch>
                    <Route exact path='/' component={TopStories} />
                    <Route exact path='/top/:page?' component={TopStories} />
                    <Route exact path='/newest/:page?' component={NewestStories} />
                    <Route exact path='/show/:page?' component={ShowStories} />
                    <Route exact path='/ask/:page?' component={AskStories} />
                </Switch>
            </main>
        );
    }
}

export default Main;