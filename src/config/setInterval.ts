// import { AppDataSource } from '../../config/config'
// import { Users } from '../../entities/user.entities'
// import { ErrorHandling } from '../../exceptions/error.handling'
// import { Client } from './createClient'

// const SET_INTERVAL = async () => {
//   const cilint = await Client()

//   setInterval(async () => {
//     const postUsers = await cilint?.get('post')

//     if (postUsers) {
//       const userpost = await JSON.parse(postUsers)

//       if (userpost.length) {
//         for (const arr of userpost) {
//           const { first_name, last_name, email, gender, ip_address } = await arr

//             console.log(first_name);
//             console.log(last_name);
//             console.log(email);
//             console.log(gender);
//             console.log(ip_address);

//           const user = await AppDataSource.getRepository(Users)
//             .createQueryBuilder()
//             .insert()
//             .into(Users)
//             .values({ first_name, last_name, email, gender, ip_address })
//             .returning([first_name, last_name, email, gender, ip_address])
//             .execute()
//         }

//         await cilint?.del('get')
//         await cilint?.del('post')
//       }
//     }
//   }, 10000)
// }

// export { SET_INTERVAL }
