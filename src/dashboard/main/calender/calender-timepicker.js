import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import TextField from "@material-ui/core/TextField"
import moment from "moment";
import CalendarEvent from "./calendar-event.js";
class Timepicker extends React.Component {

	


	constructor (){
		super()
		this.state = {
			date : moment().format("YYYY-MM-DD[T]HH:mm:ss")
		}
		this.changeDate = this.changeDate.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	
	changeDate (e){
		this.setState({
			date :moment(e.target.value).format("YYYY-MM-DD[T]HH:mm:ss")
		});
	}

	onChange (e) {
		this.setState({
			date : moment(e).format("YYYY-MM-DD[T]HH:mm:ss")
		})
	}
	render(){
		const classes = this.props.classes

		return(
			<Card>
				<CardContent>
					<CardHeader
						title="Date"
					>
					</CardHeader>
				</CardContent>
				<CardContent className={classes.calenderContainer} >
					<TextField
				        id="date"
				        label="Date"
				        type="datetime-local"
				        onChange={e  => this.changeDate(e)}
				        value={this.state.date}
				        className={classes.textField}
				        InputLabelProps={{
				          shrink: true,
				        }}
				    /> 
				</CardContent>
				<CardContent className={classes.calenderContainer} >
					<CalendarEvent  onChange={this.onChange}  date={this.state.date} />
				</CardContent>
			</Card>
		);
	}
}


export default Timepicker;