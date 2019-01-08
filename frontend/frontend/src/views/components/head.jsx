const React = require('react');

class Head extends React.Component {
    render() {
        return (
             <head>
                 <title>{this.props.title}</title>
                 <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous"/>
                 <link rel="stylesheet" href="/css/main.css"/>
             </head>
        )
    }
}

module.exports = Head;