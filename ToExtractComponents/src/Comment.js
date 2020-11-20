import React from "react";

//时间格式操作函数
function formatDate(date) {
    return date.toLocaleDateString()//toLocaleDateString 提取日期
}

function Comment(param) {
    return (
        <div className="comment">
            <UserInfo  user={param.author} />
            <div>{param.text}</div>
            <div>dateline：{formatDate(param.date)}</div>
        </div>
    )
}

//提取img制作成组件
function Avatar(param) {
    return (
        <img className="Avatar"
            src={param.user.avatarUrl}
            alt={param.user.name}
        />
    )
}

//提取UserInfo制作成组件
function UserInfo (param){
    return (
        <div className="UserInfo">
            <Avatar  user={param.user} />
            <div className='UserInfo-name'> 
            {param.user.name}
            </div>
        </div>
    )
}


export default Comment;