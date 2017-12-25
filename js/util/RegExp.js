function testPhone(value) {
    if (/^1[34578][0-9]{9}$/g.test(value)){
        return true;
    }
    return false;
}

function testCode(value) {
    if (/^[0-9]{6}$/g.test(value)){
        return true;
    }
    return false;
}

// function testPassword(value) {
//     if (/.{6,16}/g.test(value)) {
//         return true;
//     }
//     return false;
// } 

function testPassword(value) {
    if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/g.test(value)) {
        return true;
    }
    return false;
}

function testName(value) {
    if(/^([\u4e00-\u9fa5]){2,15}$/g.test(value)){
        return true;
    }
    return false;
}

function testAddress(value) {
    if(/^([a-zA-Z0-9\u4e00-\u9fa5]){5,60}$/g.test(value)){
        return true;
    }
    return false;
}

function testId(value) {
    if (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/g.test(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/g.test(value)) {
        return true;
    }
    return false;
}

function testTxPwd(value) {
    if (/^[0-9]{6}$/g.test(value)) {
        return true;
    }
    return false;
}

export default {
    testPhone: testPhone,
    testCode: testCode,
    testPassword: testPassword,
    testName: testName,
    testAddress: testAddress,
    testId: testId,
    testTxPwd: testTxPwd,
}