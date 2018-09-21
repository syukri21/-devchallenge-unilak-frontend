import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {calenderStyles} from "../../../styles";
import Timepicker from "./calender-timepicker";
import Schedule from "./calender-schedule";


class Calender extends React.Component {
	render(){
		const {classes} = this.props;
		return(
			<div className={classes.grid}>
				<Timepicker classes={classes} />
				<Schedule classes={classes}/>				
			</div>
		)
	}	
}


export default  withStyles(calenderStyles)(Calender);