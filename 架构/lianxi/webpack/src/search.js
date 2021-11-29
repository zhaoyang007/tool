import React from "react";
import ReactDOM from "react-dom";
import './search.less';

class Search extends React.Component {
    render() {
        return <div className="search-text">
            Search Test Content
            <input></input>
        </div>
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById('root')
)