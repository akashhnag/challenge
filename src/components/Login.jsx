import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import './Login.css'
import users from './users.json'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', toDashboard: false }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0
  }

  async handleSubmit(event) {
    try {
      const userId = await this.findUser(users.users, this.state)
      if (userId === parseInt(localStorage.getItem('token'))) {
        this.props.tokenHandler(true)
        this.props.history.push('/panel')
      }
    } catch (err) {
      alert('Wrong email or password')
      this.setState({ email: '', password: '' })
    }
  }

  findUser(users, state) {
    return new Promise((resolve, reject) => {
      users.forEach(user => {
        if (state.email === user.email && state.password === user.password) {
          localStorage.setItem('token', user.user_id)
          resolve(user.user_id)
        }
      })
      reject()
    })
  }

  handleInput(e) {
    switch (e.target.type) {
      case 'email':
        this.setState({ email: e.target.value })
        break
      case 'password':
        this.setState({ password: e.target.value })
        break
      default:
    }
  }

  render() {
    return (
      <div className="Login">
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              onChange={e => this.handleInput(e)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={e => this.handleInput(e)} />
          </Form.Group>
          <Button block size="lg" onClick={this.handleSubmit}>
            Login
          </Button>
        </Form>
      </div>
    )
  }
}
