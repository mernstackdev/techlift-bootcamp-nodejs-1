
const FormateCategoryObj = (categoryObj) => {
    const obj = {};
    obj.id = categoryObj.id;
    obj.name = categoryObj.name;
    obj.image = categoryObj.image;
    return obj;
};

module.exports = {
    FormateCategoryObj
};