没有属性：HTML暂停解析，下载JS，执行JS，再继续解析HTML。
defer：HTML继续解析，并行下载JS，HTML解析完再执行JS（默认）。
async：HTML继续解析，并行下载JS，执行JS，再解析HTML。

连环问：prefetch和dns-prefetch有什么区别？
    preload和prefetch：
        preload资源在当前页面使用，会优先加载。
        prefetch资源在未来页面使用，空闲时加载。
```html
<head>
  <!-- preload -->
  <link rel="preload" href="style.css" as="style">
  <link rel="preload" href="main.js" as="script">

  <!-- prefetch -->
  <link rel="prefetch" href="other.js" as="script">

  <!-- 引用css -->
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <!-- 引用js -->
  <script src="main.js" defer></script>
```

    dns-prefetch和preconnect：
        dns-prefetch即DNS预查询。
        preconnect即DNS预连接。
```html
<head>
  <link rel="dns-prefetch" href="https://fonts.gstatic.com/">
  <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
</head>
```

答案：
    prefetch是资源预获取（和preload相关）。
    dns-prefetch是DNS预查询（和preconnect相关）。
