{() => {
    if (role === 'analyst'){
      return (
      <div>
        <Redirect exact from="/signin" to="/dashboard"/>
        {/* <Redirect exact from="/users" to="/"/>
        <Redirect exact from="/" to="/dashboard"/> */}
      </div>
      )
    } else if ( role === 'manager'){
      return(
      <div>
        <Redirect exact from="/signin" to="/users"/>
        {/* <Redirect exact from="/dashboard" to="/"/>
        <Redirect exact from="/" to="/users"/> */}
      </div>
      )
    }
  }}