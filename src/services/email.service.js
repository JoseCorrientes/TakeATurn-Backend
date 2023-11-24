import SibApi from "sib-api-v3-sdk"


export default async function sendEmailBrevo(data,destination) {
    try{

    const SibClient = SibApi.ApiClient.instance;
    SibClient.authentications['api-key'].apiKey=process.env.BREVO_API_PASS;

    const transactionEmailApi = new SibApi.TransactionalEmailsApi()
    let smtpMailData = new SibApi.SendSmtpEmail()

    smtpMailData.sender = {
        email: 'mayraarestiodontologa@gmail.com',
        name: 'Mayra Aresti Odontóloga - TURNOS'
    }


    smtpMailData.to = (destination=='professional')
    ?[{ email: 'josernestogarcia609@gmail.com', name: 'Dr. jose'}]
    :[{ email: data.email, name: data.idpatient}]

    smtpMailData.subject = (destination=='professional')
    ?'Cancelación de Turno.'
    :'Creación de Turno Odontológico.'

    

    smtpMailData.htmlContent = (destination=='professional')
    ?`<html><body>
    <h1>Cancelación de Turno</h1>
    <br>
    <p1><b>Id. del Paciente:</b> ${data.idPatient}</p1> 
    <p1><b>Email:</b> ${data.email}</p1> 
    <p1><b>Teléfono:</b> ${data.phone}</p1> 
    <hr>
    <h2>Turno Cancelado:</h2>
    <p1><b>Fecha:</b> ${data.day}/${data.month}/${data.year}</p1> 
    <p1><b>Hora:</b> ${data.turnName.slice(0,2)}:${data.turnName.slice(2)}</p1> 
    <hr>
    <p1>Cancelado el ${data.canceledDate} a las ${data.canceledHour}</p1>
    </body>
    </html>`
    
    :`<html><body>
    <h2>Hola <b>${data.idpatient.toUpperCase()}</b>!. Se ha reservado para Ud. el siguiente turno:</h2>
    <br>
    <p1><b>Fecha:</b> ${data.day}/${data.month}/${data.year}</p1> 
    <p1><b>Hora:</b> ${data.hour}/${data.minute}</p1> 
    <p>Lo espero...</p>
    <br>
    <p>dra.${data.doctor}</p>
    <hr>
    <p>Si por cualquier motivo no pudiera asistir le ruego cancele el turno a traves de la web: xxxxxxx</p>
    </body>
    </html>`

    let result;
    await transactionEmailApi.sendTransacEmail(smtpMailData)
        .then(response=>
            result =200
        )
        .catch(error=>
            result = 500
        )    
    return result;       
    
} catch(e) { return e }
    

}