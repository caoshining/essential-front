/**
 * Created by chenM on 2016/8/6.
 */
/**
 * Created by chenM on 2016/7/26.
 */

var articleId = GetQueryString("articleId");
//console.log(articleId)
commodity_article(articleId);
/*获取后台数据,显示文章*/

//commodity_article();
function  commodity_article(articleId){
    var parmaData = {
        articleId:articleId
    };
    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/article/queryArticleContent',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code ==1){
                $('title').html(res.info.groupName);
                /*文章title*/

                $('.article_con_box .article_title').html(res.info.articleName);
                /*时间*/
                $('.article_con_box .time').html(substringfn(res.info.createTime));
                /*作者*/
                $('.article_con_box .author').html(res.info.author)
                $('.article_con_box .groupName').html(res.info.groupName);
                /*文章*/
                $('.article_con .article').html(res.info.articleContent);
            }else{
                $('.article_con .article').html(res.msg);
            }
        },
        error:function (res){
            alert('网络连接失败，请稍后重试');
        }
    });
}


//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
}
/*截取时间*/

function substringfn(str){
    return str.substr(0,10);
}
function unescape(str) {
    var elem = document.createElement('div')
    elem.innerHTML = str
    return elem.innerText || elem.textContent
}