module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base"
    ],
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "single"],
        "import/prefer-default-export": "off",
    }
};
