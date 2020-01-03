import React from 'react'
import { connect } from 'react-redux'
import { Container, Message } from 'semantic-ui-react'

const Notification = (props) => {

  if (props.notification.length === 0) {
    return null
  }

  return (
    <div>
      <Container>
        <Message>
          {props.notification}
        </Message>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  notification: state.notification
})

export default connect(mapStateToProps)(Notification)