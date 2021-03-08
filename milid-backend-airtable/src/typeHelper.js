const { readFileSync } = require('fs');

let dictionary = null;

class TypeHelper
{

    static convert_digrammes(text){
        if(!text){
            return text;
        }
        if(!dictionary){
            dictionary = JSON.parse(readFileSync('./src/digrammes_fr.json'));
        }
        let result = text;

        for(let val of dictionary['oe']){
            let correct = val.replace('oe', "œ");
            result = result.replace(new RegExp(val, "g"), correct);  
        }

        for(let val of dictionary['ae']){
            let correct = val.replace('ae', "æ");
            result = result.replace(new RegExp(val, "g"), correct);            
        }

        return result;
    }

    static super_script_html(text){
        if(!text){
            return text;
        }

        let result = text;

        result = result.replace(/(\d+h)(\d+)/g, "$1<sup>$2</sup>");
        result = result.replace(/(\d)(er?e?)\b/g, "$1<sup>$2</sup>");
        result = result.replace(/(\d)(ère?)\b/g, "$1<sup>$2</sup>");
        result = result.replace(/(\d)((e|è)me)\b/g, "$1<sup>$2</sup>");
        result = result.replace(/([V|I|X])(er?)\b/g, "$1<sup>$2</sup>");
        result = result.replace(/([V|I|X])((e|è)me)\b/g, "$1<sup>$2</sup>");

        result = result.replace(/(^|\s|\d)([m|M])(2)/g, "$1$2<sup>$3</sup>");
        result = result.replace(/(^|\s|\d)(cm)(2)/g, "$1$2<sup>$3</sup>");
        result = result.replace(/(^|\s|\d)(CM)(2)/g, "$1$2<sup>$3</sup>");

        return result;
    }

    static insecables(text){
        if(!text){
            return text;
        }

        let result = text;

        result = result.replace(/([:!;?])/g, "&#8201;$1");
        result = result.replace(/(\()\s*&#8201;(\?)\s*(\))/g, "$1&#8201;$2&#8201;$3");
        result = result.replace(/\s&#8201;/g, "&#8201;");
        // word of two letters should not end line
        result = result.replace(/(\s\w{1,2})(\s)(\w+)/g, "$1&nbsp;$3");
        
        // catch words with hyphens
        // result = result.replace(/([a-zàâçéèêëîïôûùüÿñæœ.-]+(?:\-+[a-zàâçéèêëîïôûùüÿñæœ.-]+)+)/ig, "<nobr>$1</nobr>"); 

        return result;
    }

    static ensureCapitals(text){
        if(!text){
            return text;
        }

        let result = text;
        result = result.replace(/^(\s*)(\w)(.*)/, (fullstring, a, b, c) => `${a}${b.toUpperCase()}${c}`);
        return result;
    }
}

module.exports = TypeHelper;