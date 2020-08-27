import React from 'react'
import '../scss/styles.scss'
import { LogIn, InvoiceForm, UserRegistry, UsersAdmin } from '.'

class TimbradoModule extends React.Component {

  render(){
    return(
      //Background
      <div className="background">
        {/* <LogIn /> */}
        {/* <InvoiceForm/> */}
        {/* <UserRegistry/> */}
        <UsersAdmin />
      </div>
    )
  }
}

export default TimbradoModule
