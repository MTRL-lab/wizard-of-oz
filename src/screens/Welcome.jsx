import React, { Component } from "react";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { Container, Form, Button, Jumbotron, Col, Row } from "react-bootstrap";

import api from "../lib/api.js";
import { VideoCapture } from "../components/VideoCapture";

class Welcome extends Component {
  state = {
    done: false,
    read: false,
    answers: false,
    consent: false,
    name: "",
    consent_html: '<div></div>'
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const { read, answers, consent, name } = this.state;

    event.preventDefault();

    api
      .post("/agree", { read, answers, consent, name })
      .then(() => {
        this.setState({ done: true });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount = () => {
    api.get('consent_form/')
      .then(response => {
        const consent_html = JSON.parse(response.data.content)
        this.setState({consent_html})
      })

  };

  createMarkup = () => {
    const {consent_html} = this.state
    return {__html: consent_html};
  }
  render() {
    const { read, answers, consent, name, done } = this.state;

    if (done) {
      return (
        <Redirect
          to={{
            pathname: "/chat",
          }}
        />
      );
    }
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <h1>Informed Consent Form</h1>

            <div dangerouslySetInnerHTML={this.createMarkup()} />
            <Jumbotron>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="read">
                  <Form.Check
                    required
                    name="read"
                    checked={read}
                    onChange={this.handleChange}
                    type="checkbox"
                    label="I have read the above information"
                  />
                </Form.Group>
                <Form.Group controlId="answers">
                  <Form.Check
                    required
                    name="answers"
                    checked={answers}
                    onChange={this.handleChange}
                    type="checkbox"
                    label="I have received answers to any questions, and  I asked"
                  />
                </Form.Group>
                <Form.Group controlId="concent">
                  <Form.Check
                    required
                    name="consent"
                    checked={consent}
                    onChange={this.handleChange}
                    type="checkbox"
                    label="I agree to the above and signed a separate consent form"
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Name"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    value={moment().toDate()}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Continue{" "}
                </Button>
              </Form>
            </Jumbotron>
          </Col>
          <Col sm={4}>
            <VideoCapture />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Welcome;
