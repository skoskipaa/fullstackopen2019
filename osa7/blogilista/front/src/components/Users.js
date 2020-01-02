import React from 'react'
import User from './User'
import { connect } from 'react-redux'

const Users = (props) => {

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><th>Name</th><th>blogs</th></tr>
          {props.users.map(user =>
            <User
              key={user.id}
              user={user}
            />
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps)(Users)