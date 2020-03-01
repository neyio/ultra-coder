# Editor
## usage
```js
import {Path} from 'slate';
```

## interface
```js
export type Path = number[];
```

## api

### ancestors
```js
(
  path: Path,
  options:{
    reverse?: boolean,
  }
  )=>Iterable<NodeEntry<Ancestor>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      path       |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：沿`highest`方向逐步输出祖先节点路径(不包含本身)

### common
```js
(
  path: Path,
  another: Path
  )=>NodeEntry
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：返回两个路径的最近公共路径

### compare
```js
(
  path: Path,
  another: Path
  )=>-1 | 0 | 1
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：比较两个路径的先后关系（类似与string比较大小)(以文档流方向)

### equal
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

函数行为：比较两个路径的是否相等

### is\[method\]
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

这是一组函数，具体行为为:

  - isAfter: 文档流方向上，path在another后面
  - isBefore: 文档流方向上，path在another后面
  - isAncestor: path为another的祖先节点
  - isChild: path为another的直接子节点
  - isDescendant: path为another的后代节点
  - isCommon: path和another的最小交集为path
  - isParent: path为another的直接父节点
  - isSlibing: path与another为兄弟节点

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
