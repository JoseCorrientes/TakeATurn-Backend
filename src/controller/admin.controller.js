import { createDoctorAdmin, existAdminService } from "../services/admin.service.js";
import { findDoctorDB } from "../services/doctors.service.js";
import { decryptData, encryptData } from "../tools/crypto.js";
import jwt from 'jsonwebtoken'



//funcion que logeal al administrador, primero se fija si existe un admin, si no existe crea el generico y luego recien trata de logearse
async function loginAdmin (req, res) {

    const {SECRET_JWT} = process.env;
   
    const user = req.body.user
    const userDecrypted = decryptData(user);
    console.log(userDecrypted);

    let result = await existAdminService();
    if (result.status==500) return res.status(200).json({status: 'Error', message: 'Server Error Try Again'})
    //return res.status(200).json({status: 'Error', message: 'Server Error Try Again'})

    const passwordUser=userDecrypted.password;
    const emailUser=userDecrypted.email;
    const passwordDB = decryptData(result.password)
    const emailDB = result.email;
    let userToken={
        passwordDB,
        emailDB,
    }
    //si existe un administrador o se creo se sigue el proceso de verificacion
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












//funcion para crear un nuevo doctor
async function createDoctor (req, res) {
    const data = req.body
    //pedir un servicio para ver si existe el email
    const result = await findDoctorDB(data.email)

    if (result==500) return res.status(500).json({status: 'Error', message: 'Ha Habido un error de Servidor.' });
    if (result!=404) return res.status(400).json({status: 'Error', message: 'El Doctor con ese email ya Existe.' });
    //crea el doctor
    const result2 = await createDoctorAdmin(data)

    if (result2==201) return res.status(201).json({status: 'Ok', message: 'El Doctor ha sido creado.' })
    else return res.status(500).json({ status: 'Error', message: 'El Doctor no pudo ser creado'})
}




export {
    createDoctor,
    loginAdmin,
}