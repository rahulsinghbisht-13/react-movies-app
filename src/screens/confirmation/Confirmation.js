import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import './Confirmation.css';
import BookShow from '../../screens/bookshow/BookShow';
import Home from '../../screens/home/Home';
import Coupons from '../../common/coupons';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
    close: {
        width: theme.spacing(4),
        height: theme.spacing(4)
    },
    success: {
        color: green[600],
    }
});

class Confirmation extends Component {

    constructor() {
        super();

        this.state = {
            open: false,
            couponCode: "",
            totalPrice: 0,
            originalTotalPrice: 0
        }
    }

    componentDidMount() {
        let currentState = this.state;
        currentState.totalPrice = currentState.originalTotalPrice = parseInt(this.props.bookingSummary.unitPrice, 10) * parseInt(this.props.bookingSummary.tickets, 10);
        this.setState({ state: currentState });
    }

    backToBookShowHandler = () => {
        ReactDOM.render(<BookShow id={this.props.id} bookingSummary={this.props.bookingSummary} />, document.getElementById('root'));
    }

    confirmBookingHandler = () => {
        this.setState({ open: true });
    }

    snackBarCloseHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    couponCodeChangeHandler = (e) => {
        this.setState({ couponCode: e.target.value });
    }

    couponApplyHandler = () => {
        let currentState = this.state;
        let couponObj = Coupons.filter((coupon) => {
            return coupon.code === this.state.couponCode
        })[0];

        if (couponObj !== undefined && couponObj.value > 0) {
            currentState.totalPrice = this.state.originalTotalPrice - ((this.state.originalTotalPrice * couponObj.value) / 100);
            this.setState({ currentState });
        } else {
            currentState.totalPrice = this.state.originalTotalPrice;
            this.setState({ currentState });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="Details">
                <Header />

                <div className="confirmation marginTop16">
                    <div>
                        <Typography className="back" onClick={this.backToBookShowHandler}>
                            &#60;&#60; Back to Book Show
                        </Typography><br />

                        <Card className="cardStyle">
                            <CardContent>
                                <Typography variant="h4" component="h2">
                                    SUMMARY
                                </Typography>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Location:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.location}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Language:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.language}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Show Date:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.showDate}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Show Time:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.showTime}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Tickets:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.tickets}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <Typography>Unit Price:</Typography>
                                    </div>
                                    <div>
                                        <Typography>{this.props.bookingSummary.unitPrice}</Typography>
                                    </div>
                                </div>
                                <br />

                                <div className="coupon-container">
                                    <div>
                                        <FormControl className="formControl">
                                            <InputLabel htmlFor="coupon">
                                                <Typography>Coupon Code</Typography>
                                            </InputLabel>
                                            <Input id="coupon" onChange={this.couponCodeChangeHandler} />
                                        </FormControl>
                                    </div>
                                    <div className="marginApply">
                                        <Button variant="contained" onClick={this.couponApplyHandler.bind(this)} color="primary">Apply</Button>
                                    </div>
                                </div>
                                <br /><br />

                                <div className="coupon-container">
                                    <div className="confirmLeft">
                                        <span className="bold">Total Price:</span>
                                    </div>
                                    <div>{parseInt(this.state.totalPrice, 10)}</div>
                                </div>
                                <br />

                                <Button variant="contained" onClick={this.confirmBookingHandler} color="primary">
                                    Confirm Booking
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    className="snackbar"
                    open={this.state.open}
                    onClose={this.snackBarCloseHandler}
                    message={
                        <span id="client-snackbar" className={classes.success}>
                            <div className="confirm"><div><CheckCircleIcon /></div><div className="message"> Booking Confirmed!</div></div>
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.snackBarCloseHandler}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        )
    }
}

Confirmation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Confirmation);