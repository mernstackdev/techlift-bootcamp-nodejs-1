
const FormateUserObj = (userObj) => {
    const obj = {};
    obj.id = userObj.id;
    obj.name = userObj.name;
    obj.email = userObj.email;
    obj.phone = userObj.phone;

    return obj;
};

module.exports = {
    FormateUserObj
};