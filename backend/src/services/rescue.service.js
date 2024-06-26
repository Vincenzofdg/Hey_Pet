const models = require('../database/models');
const { rescue: validation } = require('../validations');
const { authentication } = require('../tools');

module.exports = {
    getAll: async (accepted, token) => {
        const { region } = authentication.verifyToken(token);

        if (accepted === undefined || region === 'all') {
            const result = await models.rescue.findAll();
            return {status: 200, result};
        }

        const result = await models.rescue.findAll({
            where: {
                region,
                new: JSON.parse(accepted)
              }
        });

        return {status: 200, result};
    },
    getById: async (id) => {
        const rescue = await models.rescue.findByPk(id);

        if (!rescue) return {status: 404, result: []}; 
        return {status: 200, result: rescue};
    },
    update: async(obj, id) => {
        const [updatedRescue] = await models.rescue.update(obj, {
            where: { id }
        });

        if (updatedRescue !== 1) return {status: 204, result: null};

        return {status: 200, result: 'rescue updated'};
    },
    create: async(obj, token) => {
        const {email, region} = authentication.verifyToken(token);
        const validatedObj = await validation.new(obj)
        
        const newRescue = await models.rescue.create({
            ...validatedObj,
            user: email,
            region,
        });
        return {status: 201, result: newRescue};
    },
    destroy: async (id) => {
        const rescueDeleted = await models.rescue.destroy({ where: { id } });

        if (rescueDeleted !== 1) return {status: 204, result: null};

        return {status: 200, result: 'rescue deleted'};
    }
}