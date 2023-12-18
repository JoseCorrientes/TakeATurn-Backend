import Doctors from '../models/doctors.model.js';
import { encryptData } from '../tools/crypto.js';

const existAdminService = async ()=>{
    let creation;
   
    const result = await Doctors.find({
        active:true,
        admin:true,
    })
    if (result.length>0) return {status:200,
                                password: result[0].password,
                                email: result[0].email,
                                email: result[0].email,
                                name: result[0].name,
                                lastName: result[0].lastName,
                                stringName: result[0].stringName,
                                title: result[0].title,
                                active: result[0].active,
                                admin: result[0].admin
                            
                            
                            }  //existe una semilla en la db


    let messageResponse;
    if (result.length==0) {
        console.log('trata de crear la semilla')
        const adminSeed = {
            name: 'admin',
            lastName: 'admin',
            stringName: 'admin',
            title: 'Dra.',
            email: 'admin@gmail.com',
            password: 'U2FsdGVkX18Di0ibeV+Lviuyk72IsjieKUa4o5I3RjxQk4DSIK3KIugXQmEM5svx', //'admin',
            active: true,
            admin: true
        }
        await Doctors.create(adminSeed)
        .then(resolve=>{
            //la semilla admin fue creada
            console.log('la semilla fue creada')
            messageResponse = {status:201,
                password: adminSeed.password,
                email: adminSeed.email,
                name: adminSeed.name,
                lastName: adminSeed.lastName,
                stringName: adminSeed.stringName,
                title: adminSeed.title,
                active: adminSeed.active,
                admin: adminSeed.admin
            }
        })
        .catch(error=>{
            console.log('la se milla no pudo ser creada')
            // la semilla admin no existia y no pudo ser creada tiene que reintenar
            messageResponse = {status:500, password: '', email: ''}
        })
    }
    return messageResponse;
}














const createDoctorAdmin = async (data)=>{
    const {name, lastName, stringName, title, email, password, active, admin} = data;
    const encryptedPassword = encryptData(password)
    let response;
    const data1 = {
        name,
        lastName,
        stringName,
        title,
        email,
        password: encryptedPassword,
        active,
        admin
    }

    await Doctors.create(data1)
    .then((resolve) => {
        console.log('Se creo correctamente')
         response = 201
    })
    .catch ((error)=>{
        console.log( 'Hubo un error en la creacion')
        response = 500
    })
    return response;


}  



export {
    existAdminService,
    createDoctorAdmin,
}
