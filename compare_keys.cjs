const fs = require('fs');

const ko = JSON.parse(fs.readFileSync('E:/project/cm-homepage/src/locales/ko/translation.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('E:/project/cm-homepage/src/locales/en/translation.json', 'utf8'));

function getAllKeys(obj, prefix = '') {
    let keys = [];
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(getAllKeys(obj[key], prefix + key + '.'));
        } else {
            keys.push(prefix + key);
        }
    }
    return keys;
}

const koKeys = getAllKeys(ko);
const enKeys = getAllKeys(en);

const missingInEn = koKeys.filter(k => !enKeys.includes(k));
const missingInKo = enKeys.filter(k => !koKeys.includes(k));

console.log('Missing in EN:');
console.log(JSON.stringify(missingInEn, null, 2));
console.log('\nMissing in KO:');
console.log(JSON.stringify(missingInKo, null, 2));
