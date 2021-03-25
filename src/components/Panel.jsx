import React, { Component } from "react";
import { Table } from "react-bootstrap";
import invitations from "./invitations.json";
import invitations_update from "./invitations_update.json";

export default class Panel extends Component {
  constructor() {
    super();
    this.state = { invites: invitations.invites };
    this.handleButton = this.handleButton.bind(this);
  }
  handleButton(e, obj) {
    console.log("obj", obj);
    if (obj.status === "read") {
      obj.status = "unread";
    } else {
      obj.status = "read";
    }
    console.log(obj);
    this.setState({
      invites: [...this.state.invites, obj],
    });
  }
  renderHeader() {
    let header = Object.keys(this.state.invites[0]);
    return header.map((cols) => {
      return <th key={cols}>{cols}</th>;
    });
  }
  renderTable() {
    let header = Object.keys(this.state.invites[0]);
    return this.state.invites.map((invites, ind1) => {
      return (
        <tr key={invites.invite_id}>
          {header.map((cols, ind) => {
            return <td key={ind}>{invites[cols]}</td>;
          })}
        </tr>
      );
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ invites: invitations_update.invites });
    }, 5000);
  }
  render() {
    return (
      <div className="mt-4">
        <h3 className="mb-4">User event notifications</h3>
        <Table striped bordered hover>
          <thead>
            <tr>{this.renderHeader()}</tr>
          </thead>
          <tbody>{this.renderTable()}</tbody>
        </Table>
      </div>
    );
  }
}
