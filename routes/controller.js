const User = require('../models/User')
const Level = require('../models/Level')

class authController {

    async auth(req, res) {
        try{
            const {login, pass} = req.body
            let user = await User.findOne({ login });

            if (!user) {
                const userReg = new User({ login: login, password: pass });
                await userReg.save()
                res.json({user: userReg})
            }else{
                res.json({user});
            };

            return
        }catch(e){
            console.log(e)
            res.status(400).json({message : 'Ошибка на сервере! Перезагрузите приложение'})
        }
    };
    async delAcc(req, res) {
        try{
            const { _id } = req.body;
            await User.deleteOne({ _id })
            res.json({ result: true })
            return
        }catch(e){
            console.log(e);
            res.status(400).json({message : 'Ошибка на серверe! Перезагрузите приложение'});
        }
    };
    async setName(req, res) {
        try{
            const {_id, name} = req.body
            let user = await User.updateOne({ _id }, {name: name});

            res.json({user})
            return
        }catch(e){
            console.log(e)
            res.status(400).json({message : 'Ошибка на сервере! Перезагрузите приложение'})
        }
    };
    
    async setLevel(req, res) {
        try{
            const { level, typeLevel, tasks, answers } = req.body
            const newLevel = new Level({ level, typeLevel, tasks, answers });
            await newLevel.save()
            res.json({newLevel})
            return
        }catch(e){
            console.log(e);
            res.status(400).json({message : 'Ошибка на серверe! Перезагрузите приложение'});
        }
    }

    async getLevel(req, res) {
        try{
            const { level } = req.body
            const levelRes = await Level.findOne({ level: level })
            res.json({ level: levelRes })
            return
        }catch(e){
            console.log(e);
            res.status(400).json({message : 'Ошибка на серверe! Перезагрузите приложение'});
        }
    }
    async completeLevel(req, res) {
        try{
            const { login } = req.body
            await User.updateOne({ login: login }, { $inc: { level : 1} })
            let levelRes = await User.findOne({ login: login })
            res.json({ level: levelRes })
            return
        }catch(e){
            console.log(e);
            res.status(400).json({message : 'Ошибка на серверe! Перезагрузите приложение'});
        }
    }



};

module.exports = new authController();