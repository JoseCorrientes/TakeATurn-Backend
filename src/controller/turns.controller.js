import { createTurnService, findTurnService, getTurnService, updateTurnService, deleteTurnService } from "../services/turns.service.js";
import weekday from "../tools/WeekDay.js";
import daysInAMonth from "../tools/daysInAMonth.js";
import { whatTurnIs } from "../tools/whatTurnIs.js";

const deleteTurn = async (req, res)=>{
    let result = await deleteTurnService(req.query._id)

    if (result==200) return res.status(200).send({status: 'Ok', messagge: 'Turn Erased'})
    else return res.status(500).send({status: 'Error', messagge: "Turn Didn't Erase"})
}




const getMonthTurn = async (req,res)=>{
    try{
        //claveAdmin viene del administrador encriptada y si es correcta se devuelve 
        //todos los horarios sin considerar idPatient
        const {year, month, emailPatient, claveAdmin, doctor} = req.query


        let yearNum = Number.parseInt(year)
        let monthNum = Number.parseInt(month)

        
        //Aca tengo que validar  la claveAdmin contra db
        //si es correcta pongo en true la variable admin



        let turnMonthDB = [];
        // vinene number, number, string
        let days = daysInAMonth(year, month);
        for(let x=0; x<days; x++) {
            let day=x+1;
            turnMonthDB.push({
                'type': 'day',
                'day': x+1,
                'offDuty': false,
                'turns': [
                    {
                        turnName: '0800',
                        status: 'free',
                        index: 0,
                        offDuty: false
                    },
                    {
                        turnName: '0830',
                        status: 'free',
                        index: 1,
                        offDuty: false
                    },
                    {
                        turnName: '0900',
                        status: 'free',
                        index: 2,
                        offDuty: false
                    },
                    {
                        turnName: '0930',
                        status: 'free',
                        index: 3,
                        offDuty: false
                    },
                    {
                        turnName: '1000',
                        status: 'free',
                        index: 4,
                        offDuty: false
                    },
                    {
                        turnName: '1030',
                        status: 'free',
                        index: 5,
                        offDuty: false
                    },
                    {
                        turnName: '1100',
                        status: 'free',
                        index: 6,
                        offDuty: false
                    },
                    {
                        turnName: '1130',
                        status: 'free',
                        index: 7,
                        offDuty: false
                    },
                    {
                        turnName: '1200',
                        status: 'free',
                        index: 8,
                        offDuty: false
                    },
                    {
                        turnName: '1230',
                        status: 'free',
                        index: 9,
                        offDuty: false
                    },
                    {
                        turnName: '1300',
                        status: 'free',
                        index: 10,
                        offDuty: false
                    },
                    {
                        turnName: '1330',
                        status: 'free',
                        index: 11,
                        offDuty: false
                    },
                    {
                        turnName: '1400',
                        status: 'free',
                        index: 12,
                        offDuty: false
                    },
                    {
                        turnName: '1430',
                        status: 'free',
                        index: 13,
                        offDuty: false
                    },
                    {
                        turnName: '1500',
                        status: 'free',
                        index: 14,
                        offDuty: false
                    },
                    {
                        turnName: '1530',
                        status: 'free',
                        index: 15,
                        offDuty: false
                    },
                    {
                        turnName: '1600',
                        status: 'free',
                        index: 16,
                        offDuty: false
                    },
                    {
                        turnName: '1630',
                        status: 'free',
                        index: 17,
                        offDuty: false
                    },
                    {
                        turnName: '1700',
                        status: 'free',
                        index: 18,
                        offDuty: false
                    },
                    {
                        turnName: '1730',
                        status: 'free',
                        index: 19,
                        offDuty: false
                    },
                    {
                        turnName: '1800',
                        status: 'free',
                        index: 20,
                        offDuty: false
                    },
                    {
                        turnName: '1830',
                        status: 'free',
                        index: 21,
                        offDuty: false
                    },
                    {
                        turnName: '1900',
                        status: 'free',
                        index: 22,
                        offDuty: false
                    },
                    {
                        turnName: '1930',
                        status: 'free',
                        index: 23,
                        offDuty: false
                    },
                    {
                        turnName: '2000',
                        status: 'free',
                        index: 24,
                        offDuty: false
                    },
                    {
                        turnName: '2030',
                        status: 'free',
                        index: 25,
                        offDuty: false
                    },
                    {
                        turnName: '2100',
                        status: 'free',
                        index: 26,
                        offDuty: false
                    },
                    {
                        turnName: '2130',
                        status: 'free',
                        index: 27,
                        offDuty: false
                    },
                    {
                        turnName: '2200',
                        status: 'free',
                        index: 28,
                        offDuty: false
                    },
                    {
                        turnName: '2230',
                        status: 'free',
                        index: 29,
                        offDuty: false
                    }
                ]
            })
        }


        const result = await getTurnService(year, month, doctor)

        //result es un arreglo de objetos si viene algo
        if (result==500) return res.status(200).json({status: 'Error', message: 'No se pudo recuperar los turnos guardados.'})

        //aca voy a guardar los dias que tienen turno del paciente buscado
        let dayWithOwnTurns= []
        result.forEach(item=>{
            if (item.email==emailPatient && claveAdmin=='false') {
                dayWithOwnTurns.push(item.day)
            }
        })


        //aca va la rutina que recorre result y va guardando lo obtenido en el turnMonthDB
        result.forEach(item=>{
            let turn = item.hour+item.minute;
            //desplazarse por turnMontDB hasta encontrar el dia exacto
            let indexBase=-1; 
            do {
                indexBase++;
            } while( turnMonthDB[indexBase].type!='day' || (turnMonthDB[indexBase].type=='day' && turnMonthDB[indexBase].day!=item.day))         
            let ordinal;
            switch(turn) {
                case '0800': 
                ordinal=0; 
                break;                
                case '0830': 
                ordinal=1; 
                break;                
                case '0900': 
                ordinal=2; 
                break;                
                case '0930': 
                ordinal=3; 
                break;                
                case '1000': 
                ordinal=4; 
                break;                
                case '1030': 
                ordinal=5; 
                break;                
                case '1100': 
                ordinal=6; 
                break;                
                case '1130': 
                ordinal=7; 
                break;                
                case '1200': 
                ordinal=8; 
                break;                
                case '1230': 
                ordinal=9; 
                break;                
                case '1300': 
                ordinal=10; 
                break;                
                case '1330': 
                ordinal=11; 
                break;                
                case '1400': 
                ordinal=12; 
                break;                
                case '1430': 
                ordinal=13; 
                break;                
                case '1500': 
                ordinal=14; 
                break;                
                case '1530': 
                ordinal=15; 
                break;                
                case '1600': 
                ordinal=16; 
                break;                
                case '1630': 
                ordinal=17; 
                break;                
                case '1700': 
                ordinal=18; 
                break;                
                case '1730': 
                ordinal=19; 
                break;                
                case '1800': 
                ordinal=20; 
                break;                
                case '1830': 
                ordinal=21; 
                break;                
                case '1900': 
                ordinal=22; 
                break;                
                case '1930': 
                ordinal=23; 
                break;                
                case '2000': 
                ordinal=24; 
                break;                
                case '2030': 
                ordinal=25; 
                break;                
                case '2100': 
                ordinal=26; 
                break;                
                case '2130': 
                ordinal=27; 
                break;                
                case '2200': 
                ordinal=28; 
                break;                
                default : 
                ordinal=29; 
            }

            if ( claveAdmin=='true' || item.email== emailPatient  ) {
                                         turnMonthDB[indexBase]['turns'][item.hourIndex]= {
                                         index: ordinal,
                                         turnName: item.hour+item.minute,
                                         status: (claveAdmin=='true')?'busy': 'busyOwner', 
                                         day: item.day,
                                         month: item.month,
                                         year: item.year,
                                         idPatient: item.idpatient,
                                         typeTreatment: item.typetreatment,
                                         ealthInsurance: item.healthinsurance,
                                         comment: item.comment,
                                         email: item.email,
                                         phone: item.phone,
                                         dbId: item._id,
                                         offDuty: turnMonthDB[indexBase]['turns'][item.hourIndex].offDuty,
                                         doctor: item.doctor
                                        }
                                        

                }else  {
                turnMonthDB[indexBase]['turns'][item.hourIndex]= {...turnMonthDB[indexBase]['turns'][item.hourIndex],
                                            status: 'busy'
                                            // turnName: nametime,
                                            // turn: 'busy',
                                            // offDuty: false
                }                   
            }
        })


        //HASTA ACA TODO BIEN EN turnMonthDb

        let calendar = [];
        
        let scrollPosition = weekday(year, month, '01') //lugares vacias a agregar en la grilla de 7*6 antes de los dias regualares
        for (let x=0; x<scrollPosition; x++) {
              calendar.push({
                type: 'blank',
                day:0,
              })  
        }
        turnMonthDB.forEach(item=>{
            let newObject = item;
            newObject.type='day';
            calendar.push(newObject)
        })

        for(let x=calendar.length; x<42; x++) {
            calendar.push({
                type: 'blank'
              })  
        }

        //calendar.push({dayWithOwnTurns});   //como ultimo elemento de mes paso el arreglo con los dias que tiene turno ocupados por el cliente En el indice 42
     
        return res.status(200).json({status: 'Ok', data: calendar, data2: dayWithOwnTurns})
    } catch(e) {
        return res.status(500).json({status: 'Error', message: 'No se pudo recuperar los turnos guardados.'})
    }    
}


const createTurn =async (req, res)=>{
    try {
        let data= req.body;
        let result = await findTurnService(data.year, data.month, data.day, data.hour, data.minute, data.doctor)        
        if (result==500) { 
            return res.status(500).json({status: 'Error', message: 'Error en la busqueda de Turno.'})
        }
        if (result==null) { 
            data.hourIndex = whatTurnIs(data.hour, data.minute);
            let result2 = await createTurnService(data);
            if (result2==500) {
                return res.status(500).json({status: 'Error', message: 'Error en la creación de Turno.'})
            } 
            return res.status(200).json({status: 'Ok', message: 'Turno creado correctamente.'})
        }
        if(result.status=='busy') {   
            return res.status(200).json({status: 'Error', message: 'Turno no disponible.'})
        }

        if(result.status=='offDuty') {   //esta inhabilitado por la dra
            return res.status(200).json({status: 'Error', message: 'Turno inhabilitado.'})
        }
        if(result.status=='free') {  //esta libre se puede ocupar - posiblemente alguien cancelo
            let result2 = await updateTurnService(data);
            if (result2==500) {
                return res.status(500).json({status: 'Error', message: 'Error en la creación de Turno.'})
            } 
            return res.status(200).json({status: 'Ok', message: 'Turno creado correctamente.'})
        }
        return res.status(200).json({status: 'Error', message: 'Horario no disponible.'})
    } catch(e) {
        return res.status(500).json({status: 'Error', message: 'Server Error - No se pudo crear el turno.'})
    }    
}

export { 
    createTurn,
    getMonthTurn,
    deleteTurn,
}












































// import { createTurnService, findTurnService, getTurnService, updateTurnService, deleteTurnService } from "../services/turns.service.js";
// import weekday from "../tools/WeekDay.js";
// import daysInAMonth from "../tools/daysInAMonth.js";
// import { whatTurnIs } from "../tools/whatTurnIs.js";

// const deleteTurn = async (req, res)=>{
//     let result = await deleteTurnService(req.query._id)
//     if (result==200) return res.status(200).send({status: 'Ok', messagge: 'Turn Erased'})
//     else return res.status(500).send({status: 'Error', messagge: "Turn Didn't Erase"})
// }




// const getMonthTurn = async (req,res)=>{
//     try{
//         //claveAdmin viene del administrador encriptada y si es correcta se devuelve 
//         //todos los horarios sin considerar idPatient
//         const {year, month, emailPatient, claveAdmin, doctor} = req.query
//         let yearNum = Number.parseInt(year)
//         let monthNum = Number.parseInt(month)

        
//         //Aca tengo que validar  la claveAdmin contra db
//         //si es correcta pongo en true la variable admin



//         let turnMonthDB = [];
//         // vinene number, number, string
//         let days = daysInAMonth(year, month);
//         for(let x=0; x<days; x++) {
//             let day=x+1;
//             turnMonthDB.push({
//                 'type': 'day',
//                 'day': x+1,
//                 'offDuty': false,
//                 'turns': [
//                     {
//                         turnName: '0800',
//                         status: 'free',
//                         index: 0,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '0830',
//                         status: 'free',
//                         index: 1,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '0900',
//                         status: 'free',
//                         index: 2,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '0930',
//                         status: 'free',
//                         index: 3,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1000',
//                         status: 'free',
//                         index: 4,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1030',
//                         status: 'free',
//                         index: 5,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1100',
//                         status: 'free',
//                         index: 6,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1130',
//                         status: 'free',
//                         index: 7,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1200',
//                         status: 'free',
//                         index: 8,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1230',
//                         status: 'free',
//                         index: 9,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1300',
//                         status: 'free',
//                         index: 10,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1330',
//                         status: 'free',
//                         index: 11,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1400',
//                         status: 'free',
//                         index: 12,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1430',
//                         status: 'free',
//                         index: 13,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1500',
//                         status: 'free',
//                         index: 14,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1530',
//                         status: 'free',
//                         index: 15,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1600',
//                         status: 'free',
//                         index: 16,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1630',
//                         status: 'free',
//                         index: 17,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1700',
//                         status: 'free',
//                         index: 18,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1730',
//                         status: 'free',
//                         index: 19,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1800',
//                         status: 'free',
//                         index: 20,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1830',
//                         status: 'free',
//                         index: 21,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1900',
//                         status: 'free',
//                         index: 22,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '1930',
//                         status: 'free',
//                         index: 23,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2000',
//                         status: 'free',
//                         index: 24,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2030',
//                         status: 'free',
//                         index: 25,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2100',
//                         status: 'free',
//                         index: 26,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2130',
//                         status: 'free',
//                         index: 27,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2200',
//                         status: 'free',
//                         index: 28,
//                         offDuty: false
//                     },
//                     {
//                         turnName: '2230',
//                         status: 'free',
//                         index: 29,
//                         offDuty: false
//                     }
//                 ]
//             })
//         }





//         const result = await getTurnService(year, month, doctor)
//         //result es un arreglo de objetos si viene algo
//         if (result==500) return res.status(200).json({status: 'Error', message: 'No se pudo recuperar los turnos guardados.'})
//         //aca va la rutina que recorre result y va guardando lo obtenido en el turnMonthDB
//         result.forEach((item)=>{
//             let turn = item.hour+item.minute;
//             //desplazarse por turnMontDB hasta encontrar el dia exacto
//             let indexBase=-1; 
//             do {
//                 indexBase++;
//             } while( turnMonthDB[indexBase].type!='day' || (turnMonthDB[indexBase].type=='day' && turnMonthDB[indexBase].day!=item.day))         
//             let ordinal;
//             switch(turn) {
//                 case '0800': 
//                 ordinal=0; 
//                 break;                
//                 case '0830': 
//                 ordinal=1; 
//                 break;                
//                 case '0900': 
//                 ordinal=2; 
//                 break;                
//                 case '0930': 
//                 ordinal=3; 
//                 break;                
//                 case '1000': 
//                 ordinal=4; 
//                 break;                
//                 case '1030': 
//                 ordinal=5; 
//                 break;                
//                 case '1100': 
//                 ordinal=6; 
//                 break;                
//                 case '1130': 
//                 ordinal=7; 
//                 break;                
//                 case '1200': 
//                 ordinal=8; 
//                 break;                
//                 case '1230': 
//                 ordinal=9; 
//                 break;                
//                 case '1300': 
//                 ordinal=10; 
//                 break;                
//                 case '1330': 
//                 ordinal=11; 
//                 break;                
//                 case '1400': 
//                 ordinal=12; 
//                 break;                
//                 case '1430': 
//                 ordinal=13; 
//                 break;                
//                 case '1500': 
//                 ordinal=14; 
//                 break;                
//                 case '1530': 
//                 ordinal=15; 
//                 break;                
//                 case '1600': 
//                 ordinal=16; 
//                 break;                
//                 case '1630': 
//                 ordinal=17; 
//                 break;                
//                 case '1700': 
//                 ordinal=18; 
//                 break;                
//                 case '1730': 
//                 ordinal=19; 
//                 break;                
//                 case '1800': 
//                 ordinal=20; 
//                 break;                
//                 case '1830': 
//                 ordinal=21; 
//                 break;                
//                 case '1900': 
//                 ordinal=22; 
//                 break;                
//                 case '1930': 
//                 ordinal=23; 
//                 break;                
//                 case '2000': 
//                 ordinal=24; 
//                 break;                
//                 case '2030': 
//                 ordinal=25; 
//                 break;                
//                 case '2100': 
//                 ordinal=26; 
//                 break;                
//                 case '2130': 
//                 ordinal=27; 
//                 break;                
//                 case '2200': 
//                 ordinal=28; 
//                 break;                
//                 default : 
//                 ordinal=29; 
//             }








//             if ( claveAdmin=='true' || item.email== emailPatient  )
//             // if ( claveAdmin=='true' || item.idpatient== idPatient  )
//                                          turnMonthDB[indexBase]['turns'][item.hourIndex]= {
//                                          index: ordinal,
//                                          turnName: item.hour+item.minute,
//                                          status: (claveAdmin=='true')?'busy': 'busyOwner', 
//                                          day: item.day,
//                                          month: item.month,
//                                          year: item.year,
//                                          idPatient: item.idpatient,
//                                          typeTreatment: item.typetreatment,
//                                          ealthInsurance: item.healthinsurance,
//                                          comment: item.comment,
//                                          email: item.email,
//                                          phone: item.phone,
//                                          dbId: item._id,
//                                          offDuty: turnMonthDB[indexBase]['turns'][item.hourIndex].offDuty,
//                                          doctor: item.doctor
//         }


//             else  {
//                 turnMonthDB[indexBase]['turns'][item.hourIndex]= {...turnMonthDB[indexBase]['turns'][item.hourIndex],
//                                             status: 'busy'
//                                             // turnName: nametime,
//                                             // turn: 'busy',
//                                             // offDuty: false
//                 }                   
//             }
//         })
//         let calendar = [];
        
//         let scrollPosition = weekday(year, month, '01') //lugares vacias a agregar en la grilla de 7*6 antes de los dias regualares
//         for (let x=0; x<scrollPosition; x++) {
//               calendar.push({
//                 type: 'blank',
//                 day:0,
//               })  
//         }
//         turnMonthDB.forEach(item=>{
//             let newObject = item;
//             newObject.type='day';
//             calendar.push(newObject)
//         })

//         for(let x=calendar.length; x<42; x++) {
//             calendar.push({
//                 type: 'blank'
//               })  
//         }
//         return res.status(200).json({status: 'Ok', data: calendar})
//     } catch(e) {
//         return res.status(500).json({status: 'Error', message: 'No se pudo recuperar los turnos guardados.'})
//     }    
// }




// const createTurn =async (req, res)=>{
//     try {
//         let data= req.body;
//         let result = await findTurnService(data.year, data.month, data.day, data.hour, data.minute)        
//         if (result==500) { 
//             return res.status(500).json({status: 'Error', message: 'Error en la busqueda de Turno.'})
//         }
//         if (result==null) { 
//             data.hourIndex = whatTurnIs(data.hour, data.minute);
//             let result2 = await createTurnService(data);
//             if (result2==500) {
//                 return res.status(500).json({status: 'Error', message: 'Error en la creación de Turno.'})
//             } 
//             return res.status(200).json({status: 'Ok', message: 'Turno creado correctamente.'})
//         }
//         if(result.status=='busy') {   
//             return res.status(200).json({status: 'Error', message: 'Turno no disponible.'})
//         }

//         if(result.status=='offDuty') {   //esta inhabilitado por la dra
//             return res.status(200).json({status: 'Error', message: 'Turno inhabilitado.'})
//         }
//         if(result.status=='free') {  //esta libre se puede ocupar - posiblemente alguien cancelo
//             let result2 = await updateTurnService(data);
//             if (result2==500) {
//                 return res.status(500).json({status: 'Error', message: 'Error en la creación de Turno.'})
//             } 
//             return res.status(200).json({status: 'Ok', message: 'Turno creado correctamente.'})
//         }
//         return res.status(200).json({status: 'Error', message: 'Horario no disponible.'})
//     } catch(e) {
//         return res.status(500).json({status: 'Error', message: 'Server Error - No se pudo crear el turno.'})
//     }    
// }

// export { 
//     createTurn,
//     getMonthTurn,
//     deleteTurn,
// }



























