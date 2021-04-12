const got = require('got');

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// [min, max]
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateName(){
    const users = ["paul", "alice", "bob", ]
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
    const length = randomInt(3, 6);
    let result = "";
    for(let i = 0; i < length; i++){
        const next = (i % 2) == 0 ? vowels[randomInt(0, vowels.length - 1)] : consonants[randomInt(0, consonants.length - 1)];
        result = result.concat(next);
    }

    return result;
}

function generateUser(){
    return {
        uid: uuidv4(),
        username: generateName(),
    };
}

function userCompletesModuleLessonWithState(user, module, lesson, state){
    const result = {...user, module, lesson, state};
    return result;
}


const lessonsPerModule = {
    "1": 5,
    "2": 8,
    "3": 5,
    "4": 5,
};

function generateStory(m1CompletedLessons = 0, m2CompletedLessons = 0, m3CompletedLessons = 0, m4CompletedLessons = 0){
    const user = generateUser();

    const result = [];

    result.push(userCompletesModuleLessonWithState(user, "landing", "landing", "done"));
    result.push(userCompletesModuleLessonWithState(user, "home", "home", "done"));

    for(let i = 0; i < m1CompletedLessons; i ++){
        result.push(userCompletesModuleLessonWithState(user, "1", (i + 1).toString(), "doing"));
        result.push(userCompletesModuleLessonWithState(user, "1", (i + 1).toString(), "done"));
    }
    
    for(let i = 0; i < m2CompletedLessons; i ++){
        result.push(userCompletesModuleLessonWithState(user, "2", (i + 1).toString(), "doing"));
        result.push(userCompletesModuleLessonWithState(user, "2", (i + 1).toString(), "done"));
    }
    
    for(let i = 0; i < m3CompletedLessons; i ++){
        result.push(userCompletesModuleLessonWithState(user, "3", (i + 1).toString(), "doing"));
        result.push(userCompletesModuleLessonWithState(user, "3", (i + 1).toString(), "done"));
    }
    
    for(let i = 0; i < m4CompletedLessons; i ++){
        result.push(userCompletesModuleLessonWithState(user, "4", (i + 1).toString(), "doing"));
        result.push(userCompletesModuleLessonWithState(user, "4", (i + 1).toString(), "done"));
    }

    return result;

}

async function sendCalls(calls){
    for(let i = 0; i < calls.length; i ++){

        try{
            const payload = calls[i];
            console.log(payload);

            await got.post('http://localhost:4000/api/event', {
                json: payload,
                responseType: 'json'
            });
        }catch(e){
            console.error("process exited with error", e);
            process.exit(1);
        }
    }
}

const calls = generateStory(5, 4, 0, 0);

sendCalls(calls);