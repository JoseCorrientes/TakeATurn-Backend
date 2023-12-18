import Doctors from '../models/doctors.model.js';



async function findDoctorDB (data) {
    try {
        let result = await Doctors.find({email: data, active:true})
        return (result.length>0)?result[0]: 404
    }
    catch (e) { return 500}
}

export {findDoctorDB};