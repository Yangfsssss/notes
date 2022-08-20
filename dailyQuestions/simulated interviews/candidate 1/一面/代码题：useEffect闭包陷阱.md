代码见 closure_trap_demo.tsx；

注意事项：
    这种问题，肯定不是简单的“表面答案”；
    遇到setTimeout/setInterval一定要小心；
    遇到useEffect一定要注意依赖项（第二个参数）；

面试官想知道什么：
    经典的useEffect闭包陷阱，看候选人之前是否遇到过；
    了解候选人对React Hooks的熟悉程度；
    了解候选人是否熟悉JS闭包；