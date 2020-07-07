~function(){

    let DATA = null,
        xhr = new XMLHttpRequest;
    xhr.open('get','json/product.json',false);
    xhr.onreadystatechange = function() {
        if( xhr.status === 200 && xhr.readyState ===4 ){
            DATA = xhr.responseText;
        }
    }
    xhr.send();
    DATA = JSON.parse(DATA);

    //把获取的数据展示在页面中
    let htmlStr = '';
    DATA.forEach( item=>{
        htmlStr += `<div class="card" 
                    data-price="${item.price}" 
                    data-hot="${item.hot}" 
                    data-time="${item.time}">
        <img src="${item.img}" class="card-img-top" alt="">
        <div class="card-body">
            <h6 class="card-title">${item.title}</h6>
            <p class="card-text">价格:￥${item.price}</p>
            <p class="card-text">好评：${item.hot}</p>
            <p class="card-text">
                <small class="text-muted">上架时间：${item.time}</small>
            </p>
        </div>
    </div>`
    });
    //console.log(htmlStr);

    var cardDeck = document.querySelector('.card-deck');
    cardDeck.innerHTML = htmlStr;

    //点击价格/热度/上架时间，可以把内容按照升降序排列
    let navList = document.querySelectorAll('.navbar-nav li'),
        cardList = cardDeck.querySelectorAll('.card');

    //给所有按钮绑定点击事件,点击的时候按照指定的规则排序
    for (let i =0;i <navList.length; i++){
        let item = navList[i];

        item['data-type'] = -1;//控制升降序

        item.onclick = function() {
            this['data-type'] *= -1;
            cardList = [].slice.call(cardList,0);
            cardList.sort((next,cur)=>{
                //获取当前按钮记录的排序方式
                let pai = this.getAttribute('data-pai');
                cur = cur.getAttribute(pai);
                next = next.getAttribute(pai);
                if(pai === 'data-time'){
                    cur = cur.replace(/-/g,'');
                    next = next.replace(/-/g,'');
                }
                return (next-cur)*this['data-type'];

            });
            cardList.forEach(item=>{
                cardDeck.appendChild(item);
            })
        }
    }
    
    //价格排序-升序
    // navList[1]['data-type'] = -1;//设置自定义属性，记录排序状态，1升序，-1降序
    // navList[1].onclick = function() {

    //     this['data-type'] *= -1;

    //     //把类数组变成数组
    //     cardList = Array.prototype.slice.call(cardList,0);
    //     cardList.sort((next,cur)=>{
    //         //next/cur存储的是每个元素对象
    //         cur = cur.getAttribute('data-price');
    //         next = next.getAttribute('data-price');
            
    //         return (next-cur)*this['data-type'];

    //     });
        
    //     //把排好序的数据重新增加到容器中
    //     cardList.forEach(item=>{
    //         cardDeck.appendChild(item);
    //     })


    // }


 
    
    




}();