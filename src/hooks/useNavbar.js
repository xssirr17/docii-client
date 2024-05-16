const authenticationRoutes = ['login', 'signup', 'forgot-password' , 'top-doctors']

function useNavbar(pathName) {
  for (const route of authenticationRoutes) {
    if (pathName.includes(route)) return false
  }
  return true
}

export default useNavbar
