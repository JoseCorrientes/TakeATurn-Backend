import sendEmailBrevo from "../services/email.service.js"

async function sendMailAboutCancelTurn (req, res) {
    const data = req.body
    let result = await sendEmailBrevo(data, 'professional')  
    return res.status(200).json({status: 'ok', message: 'email sended to Professional'})
}

async function sendMailAboutCreateTurn (req, res) {
    const data = req.body
    let result = await sendEmailBrevo(data,'patient')
    return res.status(200).json({statu: 'ok', message: 'email sended to Patient'})
}

export {sendMailAboutCancelTurn, sendMailAboutCreateTurn}