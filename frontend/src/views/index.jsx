import React from 'react';
import Header from './components/header.jsx';
import Head from './components/head.jsx';
import Body from './components/body.jsx';

class App extends React.Component {
    render() {
        return (
            <html>
                <Head title={"Index"}/>
                <Header />
                <Body />
            </html>
        )
    }
}

export default App;