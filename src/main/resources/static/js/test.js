window.onload = function(){
    // 获取当前页面的URL
    const url = window.location.href;
    // 使用URLSearchParams解析查询参数
    const userParams = new URLSearchParams(url.split('?')[1]);
    // 填充页面信息
    document.getElementById("userName").innerHTML = userParams.get("userName");
    console.log("员工所属科室为："+userParams.get("userOffice"));
    if (userParams.get("userOffice") === ""){
        document.getElementById("div_userOffice").hidden = true;
    } else {
        document.getElementById("userOffice").innerHTML = userParams.get("userOffice");
    }
}

function getRadioValue(){

    let finishTime = getNowDate();

    let finalGrade = 0;

    const answerList = [
        {'question':'question1','answer':'a'},
        {'question':'question2','answer':'c'},
        {'question':'question3','answer':'c'},
        {'question':'question4','answer':'c'},
        {'question':'question5','answer':'a'},
        {'question':'question6','answer':'c'},
        {'question':'question7','answer':'b'},
        {'question':'question8','answer':'c'},
        {'question':'question9','answer':'a'},
        {'question':'question10','answer':'c'},
        {'question':'question11','answer':'abc'},
        {'question':'question12','answer':'abc'},
        {'question':'question13','answer':'abc'},
        {'question':'question14','answer':'abc'},
        {'question':'question15','answer':'abc'},
        {'question':'question16','answer':'abc'},
        {'question':'question17','answer':'abc'},
        {'question':'question18','answer':'abc'},
    ];

    for (let i = 1; i <= 10; i++) {
        const radios = document.getElementsByName('question'+i);

        // 使用函数检查是否有单选按钮被选中
        // const isSelected = isRadioButtonSelected('question' + i); // 返回true或false
        // if (!isSelected){
        //     //弹窗请全部选择
        //     window.alert('请完成全部单选及多选题');
        //     return;
        // }

        for(let j=0; j < radios.length; j++){
            if(radios[j].checked){
                const chosenValue = radios[j].value;

                const rightValue = answerList.filter(
                    function(e){
                        return e.question === 'question'+i;
                    })[0]; // 筛选答案列表返回数组，不存在则返回空数组

                if (rightValue.answer === chosenValue){
                    finalGrade += 5;
                }
                break;
            }
        }
    }

    let chosenValue = "";
    for (let i = 11; i <= 18; i++) {
        chosenValue = "";
        for (let j = 1; j <= 3; j++) {
            const checkBox = document.getElementById('question' + i + j)
            if (checkBox.checked) {
                chosenValue += checkBox.value;
            }
        }
        const rightValue = answerList.filter(
            function(e){
                return e.question === 'question'+i;
            })[0]; // 筛选答案列表返回数组，不存在则返回空数组

        if (rightValue.answer === chosenValue){
            finalGrade += 6.25;
        }
    }

    document.getElementById('grade').innerHTML = finalGrade.toString();

    // 获取当前页面的URL
    const url = window.location.href;
    // 使用URLSearchParams解析查询参数
    const userParams = new URLSearchParams(url.split('?')[1]);

    userParams.set('finishTime', finishTime);
    userParams.set('finalGrade',finalGrade.toString());


    // console.log("127.0.0.1:8080/saveGrade?userName="+userParams.get('userJobID')+"&finalGrade="+finalGrade)
    fetch("/saveGrade?userName="+userParams.get('userJobID')+"&finalGrade="+finalGrade)
        .then(response => response.text())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

    // fetch("127.0.0.1:8080/saveGrade?userName="+userParams.get('userJobID')+"&finalGrade="+finalGrade)
    redirectWithParams('achievement.html', userParams);
}

// 假设你的单选按钮有相同的name属性值，例如 "radioName"
function isRadioButtonSelected(name) {
    return document.querySelector(`input[name='${name}']:checked`) !== null;
}

// 携带参数跳转
function redirectWithParams(page, userParams) {

    // 获取特定的查询参数
    const userName = userParams.get('userName');
    const userJobID = userParams.get('userJobID');
    const userOffice = userParams.get('userOffice');
    const userDepartment = userParams.get('userDepartment');
    const userEmail = userParams.get('userEmail');
    const startTime = userParams.get('startTime');
    const finalGrade = userParams.get('finalGrade');
    const finishTime = getNowDate();

    // 拼接String字符串
    const account =
        {'userName':userName,
            'userJobID':userJobID,
            'userDepartment':userDepartment,
            'userOffice':userOffice,
            'userEmail':userEmail,
            'startTime':startTime,
            'finishTime':finishTime,
            'finalGrade':finalGrade};

    // 检查params是否是一个对象
    if (typeof account === 'object') {
        // 将对象转换为查询字符串
        const queryString = Object.keys(account)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(account[key]))
            .join('&');
        // 将查询字符串添加到URL中
        window.location.href = page + '?' + queryString;
    } else {
        // 如果params不是对象，直接跳转到页面
        window.location.href = page;
    }
}

// 格式化日对象
function getNowDate (){
    let date = new Date();
    let sign2 = ":";
    let year = date.getFullYear() // 年
    let month = date.getMonth() + 1; // 月
    let day = date.getDate(); // 日
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
    let week = weekArr[date.getDay()];
    // 给一位数的数据前面加 “0”
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (day >= 0 && day <= 9) {
        day = "0" + day;
    }
    if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    return year + "-" + month + "-" + day + " " + hour + sign2 + minutes;
}
