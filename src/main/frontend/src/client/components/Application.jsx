import React from 'react';
import $ from 'jquery';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './../styles/Application.scss';

class Application extends React.Component {
    constructor(props) {
        super(props);
        //this.context.insertCss = (...styles) => {
        //    const removeCss = styles.map(style => style._insertCss()); // eslint-disable-line no-underscore-dangle, max-len
        //    return () => {
        //        removeCss.forEach(f => f());
        //    };
        //};
        if(props.data) {
            this.data = props.data;
            this.state = {
                name: this.data.name,
                counter: this.data.counter,
                when: this.data.timestamp
            };
        } else {
            this.state = {
                name: 'Initial state',
                counter: -1,
                when: ''
            };
        }
    }
    fetchState() {
        $.ajax('/api/hello/Client').done((data) => this.setState(data));
    }
    render() {
        return (
            <div className={styles.appHelloMessage}>
                Hello {this.state.name} #{this.state.counter} at {this.state.timestamp}
            </div>
        );
    }
    componentDidMount() {
        this.interval = window.setInterval(this.fetchState.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
}

export default withStyles(styles)(Application);
