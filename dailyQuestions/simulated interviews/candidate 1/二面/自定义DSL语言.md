DSL：Domain Specific Language

```XML
<mail>
  <to>123@qq.com</to>
  <from>456@qq.com</from>
  <title color="red">title</title>
  <body>body</body>
</mail>
```

```XML
<processGraph>
  <start to="firstProcess">开始</start>
  <firstProcess to="audit">流程1</firstProcess>

  <audit to="">
    审核

    <secondProcess to="end">流程2</secondProcess>
  </audit>

  <end>结束</end>
</processGraph>
```

答案：
```XML
    <chart>
      <start-end id="start">开始</start-end>
      <flow id="flow1">流程1</flow>
      <judge id="judge">评审</judge>
      <flow id="flow2">流程2</flow>
      <start-end id="end">结束</start-end>

      <arrow from="start" to="flow1"/>
      <arrow from="flow1" to="judge"/>
      <arrow from="judge" to="flow2">Y</arrow>
      <arrow from="judge" to="end">N</arrow>
      <arrow from="flow2" to="end"></arrow>
    </chart>
    <!-- 每个节点还可以加上 x y 的定位信息，尺寸，边框HTML -->
```

面试官想知道什么？
    新知识的学习能力；
    是否主动沟通、咨询问题；
    逻辑思维能力；