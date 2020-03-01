# Editor
## usage
```js
import {Point} from 'slate';
```

## interface
```js
export interface Point = {
  path: Path,
  offset: number,
  [key: string]: any
};

export type PointEntry = [Point, 'anchor' | 'focus'];
```

## api

### compare
```js
(
  path: Point,
  another: Point
  )=>-1 | 0 | 1
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：比较两个点的先后关系（类似与string比较大小)(以文档流方向)

### equal
```js
(
  path: Point,
  another: Point
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：比较两个点的是否相等

### is\[method\]
```js
(
  path: Point,
  another: Point
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

这是一组函数，具体行为为:

  - isAfter: 文档流方向上，path在another后面
  - isBefore: 文档流方向上，path在another后面

### levels
```js
(
  path: Path,
  options:{
    reverse?: boolean,
  }
  )=>Path[]
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      path       |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：沿路径方向逐步输出节点路径

  - reverse: 
    + reverse `===` false: 沿`highest`方向
    + reverse `===` true: 沿`lowest`方向

### next
```js
(
  path: Path
  )=>Path
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |

函数行为：返回下一个兄弟节点路径

### parent
```js
(
  path: Path
  )=>Path
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |

函数行为：返回直接父节点的路径

### previous
```js
(
  path: Path
  )=>Path
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |

函数行为：返回上一个兄弟节点路径

### relative
```js
(
  path: Path,
  another: Path
  )=>boolean
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：返回anoter相对与path的相对路径
