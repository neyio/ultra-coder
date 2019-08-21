import { delay } from 'roadhog-api-doc';
import mockjs from 'mockjs';

const proxy = {
  'GET /api/problem/1': {
    title: '',
    description:
      // eslint-disable-next-line no-multi-str
      '对于字符串&nbsp;`S` 和&nbsp;`T` ，只有在 `S = T + ... + T` （ `T` &nbsp;与自身连接 1 次或多次）时，我们才认定&nbsp;&ldquo;`T` 能除尽 `S` &rdquo;。\
返回字符串&nbsp;`X` ，要求满足&nbsp;`X` 能除尽 `str1` 且&nbsp;`X` 能除尽 `str2` 。\
&nbsp;\
      \
**示例 1：**\
\
```\
输入：str1 = &quot;ABCABC&quot;, str2 = &quot;ABC&quot;\
输出：&quot;ABC&quot;\
```\
\
**示例 2：**\
\
```\
输入：str1 = &quot;ABABAB&quot;, str2 = &quot;ABAB&quot;\
输出：&quot;AB&quot;\
```\
\
**示例 3：**\
\
```\
输入：str1 = &quot;LEET&quot;, str2 = &quot;CODE&quot;\
输出：&quot;&quot;\
```\
\
&nbsp;\
\
**提示：**\
\
1. `1 &lt;= str1.length &lt;= 1000`\
2. `1 &lt;= str2.length &lt;= 1000`\
3. `str1[i]` 和&nbsp;`str2[i]` 为大写英文字母\
" class="notranslate">\
\
对于字符串  `S` 和  `T` ，只有在 `S = T + ... + T` （ `T`  与自身连接 1 次或多次）时，我们才认定 “ `T` 能除尽 `S` ”。\
\
返回字符串  `X` ，要求满足  `X` 能除尽 `str1` 且  `X` 能除尽 `str2` 。\
\
**示例 1：**\
\
```\
输入：str1 = "ABCABC", str2 = "ABC"\
输出："ABC"\
```\
\
**示例 2：**\
\
```\
输入：str1 = "ABABAB", str2 = "ABAB"\
输出："AB"\
```\
\
**示例 3：**\
\
```\
输入：str1 = "LEET", str2 = "CODE"\
输出：""\
```\
\
**提示：**\
\
1. `1 <= str1.length <= 1000`\
2. `1 <= str2.length <= 1000`\
3. `str1[i]` 和  `str2[i]` 为大写英文字母\n',
  },

  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
};

// 调用 delay 函数，统一处理
export default delay(proxy, 300);
