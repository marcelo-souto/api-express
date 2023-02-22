const Dia = require('../models/Dia.js');
const validate = require('../functions/validate.js');

const diaController = {

    create:async(req,res)=>{

        const {date}= req.body;
        console.log(date)

        try {

            validate({date:date, type:'data', isRequired:true});

            const findData = await  Dia.findOne({where:{data:date}})

            if(findData) throw new Error('Data já costa no banco de dados;')

            const dataCreate = await Dia.create({
                data:date
            })

            return res.status(200).json(`Data criada com sucesso: ${date}`)

        } catch (erro) {
            return res.json({erro: erro.message})
        }

    }

}
module.exports = diaController