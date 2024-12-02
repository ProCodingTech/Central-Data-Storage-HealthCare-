const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preTrainedModel = new Schema({
    modelId: {
        type: String,
        format: 'uuid',
        required: true,
    },
    modelName: {
        type: String,
        required: true,
    },
    modelFile: {
        type: String,
        format: 'uri',
        required: true,
    },
    metaData: {
        type: new mongoose.Schema({
            disease: {
                type: String,
                required: true,
            },
            feature: {
                type: [String],
                required: true,
            },
            target: {
                type: [String],
                required: true,
            },
            explanation: {
                type: String,
                required: true,
            }
        }),
        required: true,
    },
});


const PreTrainedModel = mongoose.model('preTrainedModel', preTrainedModel);

module.exports = PreTrainedModel;
