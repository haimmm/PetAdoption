const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;
const MAX_NAME_LENGTH = 10;
const EMAIL_PATTERN = '^.+@.+$';
const PHONE_PATTERN = '^\\d{3}-?\\d{7}$';
const PASSWORD_PATTERNS = ['[A-Z]','[a-z]', '\\d'];

const ERROR_MESSAGES = {
    email: "Invalid Email address.",
    password: `Password's must include ${MIN_PASSWORD_LENGTH} - ${MAX_PASSWORD_LENGTH} chars, capital letters, small letters and numbers.`,
    passConfirm: "Confirm password doesn't match.",
    name: `Name must include 1 - ${MAX_NAME_LENGTH} chars.`,
    phone: `Phone number must contain 10 digits only.`,
}

const emailValidator = email => new RegExp(EMAIL_PATTERN).test(email);
const passwordValidator = password => {
    
    if(password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) return false;
    for(const p of PASSWORD_PATTERNS){
        if(!(new RegExp(p).test(password))) return false
    }
    
    return true;
};
const nameValidator = name => name.length && name.length <= MAX_NAME_LENGTH;
const phoneValidator = phone => new RegExp(PHONE_PATTERN).test(phone);

/* EXPORTS */

export const loginValidator = ({email, password}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!password) throw new Error("Password is required");
}

export const registerValidator = ({email, password, passwordConfirm, name, phone}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!passwordValidator(password)) throw new Error(ERROR_MESSAGES.password);
    if(password !== passwordConfirm) throw new Error(ERROR_MESSAGES.passConfirm);
    if(!nameValidator(name)) throw new Error(ERROR_MESSAGES.name);
    if(!phoneValidator(phone)) throw new Error(ERROR_MESSAGES.phone);
}

export const userProfileValidator = ({email, name, phone, currentPassword, newPassword}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!nameValidator(name)) throw new Error(ERROR_MESSAGES.name);
    if(!phoneValidator(phone)) throw new Error(ERROR_MESSAGES.phone);
    if(newPassword){
        if(!currentPassword) throw new Error("You must enter current password to change");
        if(currentPassword === newPassword) throw new Error("New password must be different from current");
        if(!passwordValidator(newPassword)) throw new Error(ERROR_MESSAGES.password);
    }  
}

export const allFieldsValidator = form => {
    for(const key in form){
        if(!form[key] && typeof(form[key]) !== 'boolean') throw new Error(`${key} field must be filled!`);
    }
}


