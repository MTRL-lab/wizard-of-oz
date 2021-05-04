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
  activateVideo = () => {};
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
          <Col>
            <h2>
              Structuring and modeling design conversations between humans and
              artificial intelligence
            </h2>
            <p>Principal Investigator: Aaron Sprecher</p>
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <h1>Informed Consent Form</h1>

            <p>Dear Participant,</p>
            <p>
              The study goal is to test artificial intelligence chat-bot
              software and learn about design conversations with humans. In this
              study, you will be asked to think about your dream home and have a
              chat with a chat-bot about your dream house requirements and
              filling a questionnaire.
            </p>

            <p>
              The questionnaire is anonymous. There is no risk in filling out
              the participating, there are no correct or incorrect answers. The
              purpose of the study is to learn about design conversations.
            </p>

            <p>
              The records of this study will be kept private. In any sort of
              report we make public we will not include any information that
              will make it possible to identify you without your explicit
              consent. Research records will be kept in on a secured private
              computer; only the researchers will have access to the records.
            </p>

            <p>
              Taking part in this study is completely voluntary. If you decide
              not to take part or to skip some of the questions, it will not
              affect you. If you decide to take part, you are free to withdraw
              at any time.
            </p>

            <p>
              If you have questions, you may contact Prof.{" "}
              <a href="mailto:asprecher@technion.ac.il">Aaron Sprecher</a> or{" "}
              <a href="mailto:jonathan@dortheimer.com">Jonathan Dortheimer</a>.
            </p>

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
                    label="I consent to take part in the study"
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
