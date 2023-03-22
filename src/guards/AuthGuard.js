import PropTypes from 'prop-types';
import useAuth from '../hook/useAuth';
import Login from '../scenes/login/Login';

AuthGuard.propTypes={
  children:PropTypes.node
}
function AuthGuard({ children }) {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return (children)
}

export default AuthGuard