function phone(phone) {
    if (!phone || phone.length != 11) {
        throw new Error('Invalid Phone!');
    }
    let regExp = /([0-9]{3})([0-9]{4})([0-9]{4})/;
    let arr = phone.match(regExp);
    return arr[1]+' '+arr[2]+' '+arr[3];
}

function parseName(name,number) {
    if (!name) {
        throw new Error('Invalid name!');
    } else if(name.length <= 3){
        return name + "农庄";
    }
    if(!number){
        return name.match(/[^]{3}/g)[0]+"...";
    } else if(number == 5){
        if(name.length <= 5) return name;
        return name.match(/[^]{5}/g)[0]+"...";
    } else if(number == 7){
        if(name.length <= 7) return name;
        return name.match(/[^]{7}/g)[0]+"...";
    }
}

function subName(name){
    if (!name) {
        throw new Error('Invalid name!');
    } else {
        return name.substring(0,name.length-2);
    }
}

function parseNum(str){
    if (!str) {
        throw new Error('Invalid Number!');
    }
    let regExp = /([0-9]{1})/g;
    return str.match(regExp);
}

module.exports =  {
    phone,
    parseName,
    parseNum,
    subName
}
