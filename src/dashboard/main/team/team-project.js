import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import { graphql } from "react-apollo";
import {
  getQueryTempUser,
  getUidProject
} from "../../../gql";
import TeamSelectDropdown from "./team-select-dropdown";
import TeamDescription from "./team-description";
import { Query } from "react-apollo";
import Loader from "../loader/loader";
import Button from "@material-ui/core/Button"

class TeamProject extends React.Component {
  constructor() {
    super();
    this.tempGetter = this.tempGetter.bind(this);
    this.state = {
      value: null,
      data: null
    };
    this.getValue = this.getValue.bind(this);
    this.getUid = this.getUid.bind(this);
  }

  getValue(e) {
    this.setState({
      value: e
    });
    this.props.getUid(e);
  }

  getUid(data) {
    if (data.project === null) {
      return <Typography variant="caption"> Choose a project... </Typography>;
    } else {
      return  (
         <Table   >
              <TableHead>
                <TableRow>
                  <TableCell numeric={true} padding="dense">
                    No
                  </TableCell>
                  <TableCell>Nama</TableCell>
                  <TableCell>Stream</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.project.uid.map((e, i)  =>   (
       <TableRow  key={i}  style={{ background: i % 2 === 0 ? "lightskyblue" : null }}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell><Button onClick={() => this.props.displayMember(true, e.user)} size="small" fullWidth  >{e.namalengkap}</Button></TableCell>
                  <TableCell>{e.stream}</TableCell>
                </TableRow>
                ))}
         
        </TableBody>
            </Table>
    
      );
    }
  }

  tempGetter() {
    return (
      <Query
        query={getUidProject}
        variables={{
          id: this.state.value
        }}
      >
        {({ loading, data, error }) => {
          if (loading)
             return <Loader />;
          return (
           <div style={{position:"relative"}} > {this.getUid(data)} </div>
          );
        }}
      </Query>
    );
  }

  render() {
    const classes = this.props.classes;
    return (
      <Card className={classes.teamProjectContainer}>
        <CardContent>
          <CardHeader
            title="Project"
            action={<TeamSelectDropdown getValue={this.getValue} />}
          />
          <TeamDescription classed={classes} passValue={this.state.value} />
        </CardContent>
        <CardContent>
          <CardHeader title="Member" />
          <CardContent style={{ position: "relative" }}>
            {this.tempGetter()}
          </CardContent>
        </CardContent>
      </Card>
    );
  }
}

export default graphql(getQueryTempUser)(TeamProject);
