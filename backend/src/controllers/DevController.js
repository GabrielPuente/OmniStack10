const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../Utils/parseStringAsArray');

module.exports = {
    async index(request,response){
        const devs = await Dev.find();
        response.json(devs);
    },

    async store (request, responde) {
        const { github_username, techs, latitude, longitude} = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const APIresponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = APIresponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates:[ longitude, latitude ]
            };
        
            dev = await Dev.create({
                name,
                github_username,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
        return responde.json(dev);
    },

    async destroy(request, response){
        const github_username = request.params.github_username;
        await Dev.deleteOne({ 'github_username': github_username })
        return response.json({ message: {user: github_username, status: 'removido'} });
    }
};