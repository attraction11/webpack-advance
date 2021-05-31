const req = require.context("./en", true, /\.js$/);
const requireAll = (requireContext) =>
    requireContext.keys().map((key) => {
        return requireContext(key).default;
    });
const transMap = requireAll(req);

const translations = {
    demo_field: "Demo field",   
};

Object.assign(translations, ...transMap);
export default translations;
