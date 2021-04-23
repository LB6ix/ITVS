// import decode from 'jwt-decode';
// const checkAdminAuth = () => {
//   const token = localStorage.getItem('token');
//   if (!token) return false;

//   try {
//     const { user, role } = decode(token);

//     if (!user) {
//       return false;
//     }
//     if (role !== 'admin') {
//       return false;
//     }
//   } catch (e) {
//     return false;
//   }

//   return true;
// };

// export default checkAdminAuth;
