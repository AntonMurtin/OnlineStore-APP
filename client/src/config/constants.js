export const admin='antonmurtin@gmail.com';

export const productName = {
   waterpomps:'Water Pomp',
    irigationSystems:'Irigation Systems',
    parts:'Parts',
   powerMachines:'Power Mashines',
    pipes:'Pipes',
    tools:'Tools',
}

export const errorMessageInput={
    name:"Name shoud be 3-16 characters and shouldn't include any special characters!",
    email: "It should be a valid email address",
    lastname: "Last Name shoud be 3-16 characters and shouldn't include any special characters!",
    password: "Username shoud be 6-15 characters and  include at least 1 letter, 1 number and 1 special characters!",
    confirmPassword: "Password don't match!", 
    town: "It should be at least 3 characters",
    phone:"It should be a valid phone number",
    street:"It should be at least 3 characters",

}

export const initialValuesRegister={
    name:'',
    lastname: '',
    email: '',
    phone:'',
    town: '',
    street:'',
    password:'',
    confirmPassword: '',
}

export const initialFocusregister={
   
        name:false,
        lastname: false,
        email: false,
        phone:false,
        town: false,
        street:false,
        password:false,
        confirmPassword: false,
}


export const initialValuesLogin={
    email: '',
    password:'',
}

export const initialFocusLogin={
        email: false,
        password:false,
}

export const inputValidtion={
    password:'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$',
    phone:'^([0]{1}[8]{1}[7-9]{1}[7-9]{1}[0-9]{6})$',
    name:'^(?=.{3,15}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
}