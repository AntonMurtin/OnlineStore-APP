export const errorMessage={
    username:"Username shoud be 3-16 characters and shouldn't include any special characters! ",
    email: "It should be a valid email address",
    password: "Username shoud be 6-15 characters and  include at least 1 letter, 1 number and 1 special characters!",
    confirmPassword: "Password don't match!"
}

export const inputValidtion={
    email:'email',
    password:'^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$'
}