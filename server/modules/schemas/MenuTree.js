'use strict'

const mongoose = require('../../db/connections/MongoCon.js').getMongo();
const Schema = mongoose.Schema;
const menuTree = new Schema({
        menu_tree : Array
    },
    { timestamps: { createdAt: 'created_at',updatedAt : 'updated_at' }
    });

const MenuTreeModel = mongoose.model('menuTree',menuTree);
module.exports = {
    MenuTreeModel
};