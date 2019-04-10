module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "google",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "no-console": 0,
        "no-invalid-this": 0,
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "max-len": ["error", { "code": 340 }],
        // disable rules from base configurations
        "prefer-const": "off",
    }
};
