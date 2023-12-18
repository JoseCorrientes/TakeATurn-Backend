import {findDoctorDB} from "../services/doctors.service.js";
import { encryptData, decryptData } from "../tools/crypto.js";
import jwt from 'jsonwebtoken'

// async function login  (req, res) {
//     const { user} = req.body
//     //const {prueba} = req.query
//     //console.log(prueba);
//     let userData='';
//     if (user) {
//         userData = await decryptLoginService(user);
//         console.log('userData')
//         console.log(userData)

//         let result = await findDoctorDB(userData.email);
//         console.log('el resultado que llega a controller es')
//         if (result==404) console.log('el usuario no existe')
//         else console.log(result)

//         //recuperar contrasena si existe usuario en db documento doctores


//     }  



// }

//funcion que logear al doctor
async function loginDoctor (req, res) {
    const {SECRET_JWT} = process.env;
   
    const user = req.body.user
    const userDecrypted = decryptData(user);
    // console.log(userDecrypted);
    let result = await findDoctorDB(userDecrypted.email);

    if (result==500) return res.status(200).json({status: 'Error', message: 'Server Error Try Again'})
    //return res.status(200).json({status: 'Error', message: 'Server Error Try Again'})

    if (result==404) return res.status(200).json({status: 'Error', message: 'Invalid User'})


    const passwordUser=userDecrypted.password;
    const emailUser=userDecrypted.email;
    const passwordDB = decryptData(result.password)
    const emailDB = result.email;
    let userToken={
        passwordDB,
        emailDB,
    }


    //Proceso de verificacion
    if (passwordDB==passwordUser && emailDB==emailUser) {
        let token = jwt.sign(userToken,SECRET_JWT,{expiresIn: '2m'});
        
        let sendData={
            email: emailDB,
            name:result.name,
            lastName: result.lastName,
            stringName: result.stringName,
            title: result.title,
            active: result.active,
            admin: result.admin,
            password:result.password,
            token
        }

        let encryptedSendData = encryptData(sendData);
        //devuelvo al front aprobado, con un mensaje y una data encriptada con token y datos del user
        res.status(200).json({ status: 'Ok',
                               message: 'User Authenticated',
                               data: encryptedSendData, 
                               })
    
    }else {
        res.status(200).json({ status: 'Error', message: 'Invalid User'})
    }
}







export {loginDoctor}