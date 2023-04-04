import PropTypes from 'prop-types';
import LoadingScreen from '../components/loading/LoadingScreen';
import useAuth from '../hook/useAuth';
import Login from '../scenes/login/Login';

AuthGuard.propTypes={
  children:PropTypes.node
}
function AuthGuard({ children }) {
  const { user,loading } = useAuth()

  if(loading){
    return <LoadingScreen/>
  }
  if (!user) {
    return <Login />
  }

  return (children)
}

export default AuthGuard