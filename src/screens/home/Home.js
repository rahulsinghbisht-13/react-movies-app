import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import { withStyles } from '@material-ui/core/styles';
import moviesData from '../../common/movieData';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    },
    upcomingMoviesHeading: {
        textAlign: 'center',
        background: '#ff9999',
        padding: '8px',
        fontSize: '1rem'
    },
    gridListUpcomingMovies: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
        width: '100%'
    }
});

class Home extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Header />
                <div className={classes.upcomingMoviesHeading}>
                    <span>Upcoming Movies</span>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Home);