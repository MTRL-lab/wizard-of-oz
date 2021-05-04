import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";
import api, { url } from '../lib/api.js'
import { ChatMessage } from '../components/ChatDiscussion'


export default class ChatLog extends Component {


    state = {
        groupedMessages: [],
    }

    // group all the messages that belong to one video
    // videos are identified by the client's response id
    groupMessagesWithVideo = (result) => {

        const messages = result.data;

        const groupedMessages = []

        let i = 0;

        messages.forEach(message => {
            // init bucket
            if (!groupedMessages[i]) groupedMessages[i] = { messages: [] }

            groupedMessages[i].messages.push(message)

            // if client, than start new bucket
            if (message.username === 'client') {

                groupedMessages[i].video = message.id
                i++;
            }
        })

        return groupedMessages;

    }

    componentDidMount() {

        api.get('/messages')
            .then(result => this.groupMessagesWithVideo(result))
            .then(groupedMessages => this.setState({ groupedMessages }))
            .catch(error => console.error(error))

    }

    render() {

        const { groupedMessages } = this.state

        const videoStyle = {
            width:'100%',
            hight:'auto'
        }
        return (
            <Container>

                <h1>Chat log</h1>
                {
                    groupedMessages.map((group, i) => {
                        return <Row key={i}>
                            <Col xs="4">
                                {group.video && (
                                <video style={videoStyle} controls>
                                    <source src={`${url}/uploads/video${group.video}.mp4`} type="video/mp4" />
                                </video>)}
                            </Col>
                            <Col xs="8">
                                {group.messages.map((message, j) => <ChatMessage key={j} {...message} />)}

                            </Col>
                        </Row>
                    })
                }


            </Container>
        )
    }
}