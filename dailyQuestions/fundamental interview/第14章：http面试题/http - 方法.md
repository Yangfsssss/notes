http methods：
    传统的methods：
        get获取服务器的数据；
        post向服务器提交数据；
        简单的网页功能，就这两个操作；

    现在的methods：
        get获取数据；
        post新建数据；
        patch/put更新数据；
        delete删除数据；

    Restful API：
        一种新的API设计方法（早已推广使用）；
        传统API设计：把每个url当做一个功能；
        Restful API设计：把每个url当做一个唯一的资源；

        如何设计成一个资源？
            尽量不用url参数：
                传统API设计：/api/list?pageIndex=2；
                Restful API设计：/api/list/2；

            用method表示操作类型：操作类型不重要，实现功能为主；
                传统API设计：
                    post请求：/api/create-blog；
                    post请求：/api/update-blog?id=100；
                    get请求：/api/get-blog?id=100；

                Restful API设计：资源位置 + 操作类型；
                    post请求：/api/blog；
                    patch请求：/api/blog/100；
                    get请求：/api/blog/100；
