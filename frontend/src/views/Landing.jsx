import React from 'react';

class Landing extends React.Component{
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick() {
        fetch('/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body:
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password})
        })
            .then(res => { return res.json(); })
            .then(res => { console.log(res); });
    }

    handleClick2() {
        fetch('/login2').then(res => { return res.json(); }).then(res => { console.log(res); });
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return(
            <div>
                <input type="text" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange}/>
                <input type="text" className="form-control" name="password" placeholder="Enter password" onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Login</button>
                <button onClick={this.handleClick2}>Login2</button>
            </div>
        )
    }
}

export default Landing;