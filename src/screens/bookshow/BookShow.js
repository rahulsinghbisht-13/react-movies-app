import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import './BookShow.css';
import Details from '../details/Details';
import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuList from '@material-ui/core/MenuItem';

class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: ""
        }
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Details />, document.getElementById('root'));
    }

    locationChangeHandler = (event) => {
        this.setState({location: event.target.value});
    }

    render() {
        return (
            <div>
                <Header />
                <div className="bookShow">
                    <Typography className="back" onClick={this.backToDetailsHandler}>
                        &#60;&#60; Back to Movie Details
                    </Typography>
                    <br />
                    <Card className="cardStyle">
                        <CardContent>
                            <Typography variant="h4" component="h4" className="red">
                                BOOK SHOW
                            </Typography>
                            <br />
                            <FormControl required className="formControl">
                                <InputLabel htmlFor="location">Choose Location</InputLabel>
                                <Select
                                    value={this.state.location}
                                    onChange={this.locationChangeHandler}>
                                    {location.map(loc => (
                                        <MenuList key={"loc" + loc.id} value={loc.location}>
                                            {loc.location}
                                        </MenuList>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }
}

export default BookShow;