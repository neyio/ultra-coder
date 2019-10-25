const markdownString = `# 判题机Judger

# 判题系统的编年史

## 2号段落

1. 基础环境依赖 [Seccomp](https://blog.csdn.net/ATOOHOO/article/details/88957596)

\`\`\`bash
FROM ubuntu:16.04
RUN apt-get update && apt-get install -y cmake python python3 libseccomp-dev gcc g++
WORKDIR /src
======== 18.04 =========
\`\`\`


2. 随便画的概念流程图
![](Image.jpeg)

3. 判题机的构想
明确操作的流程 [ 请在 调度（master）里保证每个判题机的并发量为1（也就是说 在调度时需要设立Flag或者询问是否还存在空闲的判题机，否则需要等待 ），因为判题对资源敏感，请防止争抢资源导致结果不准确 ] [master和judger必须能相互访问]
	1. 读取队列事件Request(POST)过来的请求，将请求的syntax转化为为实体文件。放入文件夹 /code,此时的Request的Promise会一直打开,可以建议将请求服务器的超时设置为60s。
	2. 将对应的syntax进行build,将结果放入 /builded, 文件名为 \`\${timestamp}-\${random(3)}-\${id}\`，并对编译时间进行设置（默认超过10秒就终结），防止恶意代码
		* 如果编译出错或编译超时，就输出 Compilation Error
		* 如果编译通过，则设置 该文件的用户组 以及 给予 拥有者可以写可以执行权限（4+1）， 0o500。[Linux chmod命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-chmod.html)
	3. scecomp(SecurityCompute)安全执行build出来的文件[在未来这是一个Serverless的执行项目，只要环境正确，执行完成后进行Proxy端口处理就可以对工程项目的演进和部署]，生成output文件，放入output文件夹并与 /builded中的文件名相同，后缀修改为.out。注意：在执行的过程中需要对cpu和内存以及时间进行限制，并且记录真实的开销（需要通过相关的辅助程序记录，一般好像大家都使用了python的库）。中间有几个流程：
        * 1.执行超时 就输出 Time Limit Exceeded Error
        
【开机的时候，需要启动 node server ，并向调度机发起在线的操作，也可以是通过socket进行维持 】

4. 调度机（Master）构想
	1. 接受Post过来的代码，写入缓存Redis的队列中。
	2. 定期读取队列中的相关的代码队列，并获取当前的 存活的cluster，并设置空闲为非空闲，对该机IP发起判题请求转发操作。结束时标志该题的判题结果，并标志为空闲。


# other
`;
export default markdownString;
