const mongoose = require('mongoose');
const bcryp = require('bcrypt');

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        match:[/^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,' Invalid Name!'],
        minLength: [3, 'Name shoud be at least 4 characters'],

    },
    lastname: {
        type: String,
        required: [true, 'Last Name is required!'],
        match:[/^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,' Invalid LastName!'],
        minLength: [3, 'Last Name shoud be at least 3 characters'],
        
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,' Invalid Email!'],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone is required!'],
        match:[/^([0]{1}[8]{1}[7-9]{1}[7-9]{1}[0-9]{6})$/,' Invalid Password!'],

    },
    
    town: {
        type: String,
        required: [true, 'Town is required!'],
        minLength: [3, 'Town shoud be at least 3 characters'],
        
    },
    street: {
        type: String,
        required: [true, 'Street is required!'],
        minLength: [3, 'Street shoud be at least 3 characters'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        match:[/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,' Invalid Password!'],

    },
});

userShema.virtual('repeatPassword')
    .set(function (value) {
        if (this.password !== value) {
            throw new Error('password missmatch');
        };
    });

userShema.pre('save', async function () {
    const hash = await bcryp.hash(this.password, 10);
    this.password = hash;
})

const User = mongoose.model('User', userShema);

module.exports = User;