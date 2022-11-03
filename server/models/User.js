const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    resources: {
        'wood': {type: Number, default: 30},
        'stone': {type: Number, default: 15},
        'food': {type: Number, default: 5},
        'villagers': {type: Number, default: 2},
        'soldiers': {type: Number, default: 0}
    },
    buildings: {
        'space1': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space2': {'name': {type: String, default: 'house'}, 'lvl' : {type: Number, default: 1}},
        'space3': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space4': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space5': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space6': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space7': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space8': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space9': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space10': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space11': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space12': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space13': {'name': {type: String, default: 'keep'}, 'lvl' : {type: Number, default: 1}},
        'space14': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space15': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space16': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space17': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space18': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space19': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space20': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space21': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space22': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space23': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space24': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'space25': {'name': {type: String, default: 'empty'}, 'lvl' : {type: Number, default: 1}},
        'wall': {'name': {type: String, default: 'wooden'}, 'lvl' : {type: Number, default: 1}}
    },
    position: {
        type: Number,
        required: true
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User