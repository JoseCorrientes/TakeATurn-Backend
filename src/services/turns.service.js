import Turns from '../models/turns.model.js'

const deleteTurnService = async(data)=>{
    let result = await Turns.deleteOne({_id:data } )
    // let result = await Turns.deleteOne({_id:data } )
    if (result.acknowledged && result.deletedCount ==1) return 200
    else return 500
    return result;

}


const updateTurnService = async (data)=>{
    try{
        let result = await Turns.updateOne({
            day:data.day,
            month: data.month,
            year:data.year,
            hour: data.hour,
            minute: data.minute
            },
            {
            $set: {
                status: 'busy',
                idpaciente: data.idpaciente,
                typetreatment: data.typetreatment,
                healthinsurance: data.healthinsurance,
                comment: data.comment,
            }    
            }
        )
        return result;

    }catch(e) {
        return 500
    }
}


const createTurnService = async (data)=>{
    try {
        let result = await Turns.create(data) 
        return result;
    }catch (e) {
        return 500
    }
}

const findTurnService = async (year, month, day, hour, minute, doctor) =>{
    try{ 
        let result = await Turns.findOne({year, month, day, hour, minute, doctor})
        return result
    }catch(e) {
        return 500;
    }
}








const getTurnService = async(year, month, doctor, day)=>{
    try {
        if (!day) {
            let result = await Turns.find({
                year, month, doctor
            })
            return result
        }
        let result = await Turns.find({
            year,
            month,
            day,
            doctor
        })
        return result;
    }catch(e) {
        return 500
    }
}


export {
    createTurnService,
    findTurnService,
    updateTurnService,
    getTurnService,
    deleteTurnService,
}