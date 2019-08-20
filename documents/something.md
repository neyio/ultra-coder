### 解构赋值理解
```js
const func = (a,{ appName = 'appName' } = {})=>{
    console.log(3,appName)
}
func('3');//3 appName,
func(3,{appName:"ultra code"})//3 ultra code
```