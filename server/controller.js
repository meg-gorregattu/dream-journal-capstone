
const fs = require("fs");
const path = require('path')


const dreams = JSON.parse(fs.readFileSync(path.join(__dirname, './dreams.json'), "utf8"));


const save = () => {
    fs.writeFile(path.join(__dirname, './dreams.json'), JSON.stringify(dreams, null, 2), err => {
        if (err) console.log(err)
      }); //savedreams functions
}




module.exports = {
    getDreams: (req, res) => {
        const {id} = req.params;
    
        res.status(200).send(dreams.dreams[id])
    },
    deleteDream: (req, res) => {
        const id = req.headers['x-auth-token']
        console.log(req.headers) 
        let index = dreams.dreams[id].findIndex(elem => elem.id === +req.params.id);
        dreams.dreams[id].splice(index, 1);

        save();

        res.status(200).send(dreams.dreams[id]);
    },
    createDream: (req, res) => {
        const {id, date, title, dreamType, dreamDescription, mood, activityLevel, hoursSlept} = req.body;
        let idNum;
        if (dreams.dreams[id]) {
            idNum = +dreams.dreams[id][dreams.dreams[id].length-1].id+1
        } else {
            idNum = 1
        }

        let newDream = {
            id: String(idNum),
            date,
            title,
            dreamType,
            dreamDescription,
            mood,
            activityLevel,
            hoursSlept
        }
        if (dreams.dreams[id]) {
        dreams.dreams[id].push(newDream);
        } else {
            dreams.dreams[id] = [newDream]
        }
        res.status(201).send(dreams.dreams[id])

        save();

    },
    login: (req,res) => {
        const {password} = req.body;
        for (let i = 0; i < dreams.users.length; i++) {
            if (password === dreams.users[i].password) {
                res.status(200).send({id:dreams.users[i].id})
            }
        } 
        const newUser = {
            id:dreams.users.length+1,
            password
        } 
        dreams.users.push(newUser)
        res.status(200).send({id:newUser.id})
        save();
    },
}
