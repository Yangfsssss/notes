公司的线上机器一般都是linux（参考阿里云）；
测试机也需要保持一致，用linux；
测试机或者线上机出了问题，本地又不能复现，需要去排查；

常用命令：
    ssh work@192.168.10.21;
    ls/ll -a;
    mkdir abc;
    rm -rf abc;
        -r：递归；-f：强制删除；
    cd dist;
    mv index.html index1.html;
        mv index.html ../;
    cp a.js a1.js;
    touch d.js;
    vi d.js;
    cat package.json;
    head/tail package.json;
    grep "babel" package.json;
