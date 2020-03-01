# Editor
## usage
```js
import {Node} from 'slate';
```

## concept
Node的遍历方式

  - 中序遍历：reverse用来控制每个非Text节点是否从左到右遍历
  - 沿路径遍历：
    + highest: 从根节点到叶节点，从上到下
    + lowest: 从叶节点到根节点，从下到上
## interface
```js
export type Node = Node = Editor | Element | Text;
export type NodeEntry<T extends Node = Node> = [T,Path]; 
export type Descendant = Element | Text;
export type Ancestor = Editor | Element;
```
## api
### ancestor
```js
(
  root:Node,
  path:Path
  )=>Ancestor
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为：返回以root为根，path为路径的非Text节点

### ancestors
```js
*(
  root: Node,
  path: Path,
  options:{
    reverse?: boolean,
  }
  )=>Iterable<NodeEntry<Ancestor>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|      path       |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：沿`highest`方向逐步输出节点

### child
```js
(
  root: Node,
  index: number,
  )=>Descendant
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   index   |   true   |       -       |

函数行为：返回root节点的index位置的直接子元素

### children
```js
(
  root: Node,
  path: Path,
  options:{
    reverse?: boolean,
  }
  )=>Descendant
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|      path       |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：逐步返回root节点的的直接子元素

### common
```js
(
  root: Node,
  path: Path,
  another: Path
  )=>NodeEntry
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |
|  anoterh  |   true   |       -       |

函数行为：返回两个节点的最近公共祖先

### descendant
```js
(
  root:Node,
  path:Path
  )=>Ancestor
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为：返回以root为根，path为路径的子元素

### descendants
```js
*(
  root: Node,
  options:{
    from?: Path,
    to?: Path,
    reverse?: boolean,
    pass?: (node: NodeEntry)=>boolean
  }
  )=>Iterable<NodeEntry<Ancestor>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|  options.from   |  false   |      []       |
|   options.to    |  false   |     null      |
| options.reverse |  false   |     false     |
|  options.pass   |  false   |     null      |

函数行为：逐步返回`[from,to]`范围内的所有后代元素(中序遍历)

  - pass: 如果存在，这跳过所有返回为true的元素及其后代

### elements
```js
*(
  root: Node,
  options:{
    from?: Path,
    to?: Path,
    reverse?: boolean,
    pass?: (node: NodeEntry)=>boolean
  )=>Iterable<NodeEntry<Element>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|  options.from   |  false   |      []       |
|   options.to    |  false   |     null      |
| options.reverse |  false   |     false     |
|  options.pass   |  false   |     null      |

函数行为：逐步返回`[from,to]`范围内的所有element元素

  - pass: 如果存在，这跳过所有返回为true的元素及其后代

### first
```js
(
  root: Node, 
  path: Path
  )=>NodeEntry
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为： 返回当前路径上对应节点第一个非叶节点


### fragment
```js
(
  root:Node,
  range:Range
  )=>Descendant[]
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   range    |   true   |       -       |

函数行为：返回`Location`对应区域内的`Fragment`(包含所有区域内所有内容的slate元素树

### get
```js
(
  root: Node,
  path: Path)=>Node
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为：返回以root为根，path为路径的节点

### has
```js
(
  root: Node,
  path: Path)=>Node
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为：判断以root为根，path为路径的节点是否存在

### last
```js
(
  root: Node, 
  path: Path
  )=>NodeEntry
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为： 返回当前路径上对应节点最后一个非叶节点

### leaf
```js
(
  root:Node,
  path:Path
  )=>Ancestor
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|   root    |   true   |       -       |
|   path    |   true   |       -       |

函数行为：返回以root为根，path为路径的叶节点

### levels
```js
*(
  root: Node,
  path: Path,
  options:{
    reverse?: boolean,
  }
  )=>Iterable<NodeEntry>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|      path       |   true   |       -       |
| options.reverse |  false   |     false     |

函数行为：沿路径方向逐步输出节点

  - reverse: 
    + reverse `===` false: 沿`highest`方向
    + reverse `===` true: 沿`lowest`方向

### matches
```js
(
  node: Node,
  props: Partial<Element>
  )=>boolean
```

函数行为：使用`===`判断Node是否满足一组属性

### nodes
```js
*(
  root: Node,
  options:{
    from?: Path,
    to?: Path,
    reverse?: boolean,
    pass?: (node: NodeEntry)=>boolean
  }
  )=>Iterable<NodeEntry<Node>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|  options.from   |  false   |      []       |
|   options.to    |  false   |     null      |
| options.reverse |  false   |     false     |
|  options.pass   |  false   |     null      |

函数行为：逐步返回`[from,to]`范围内的所有节点(中序遍历)

  - pass: 如果存在，这跳过所有返回为true的元素及其后代

### string
```js
(
  node: Node,
  )=>string
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  Node   |   true   |       -       |

函数行为：返回Node的文本内容

### texts
```js
*(
  root: Node,
  options:{
    from?: Path,
    to?: Path,
    reverse?: boolean,
    pass?: (node: NodeEntry)=>boolean
  }
  )=>Iterable<NodeEntry<Node>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|      root       |   true   |       -       |
|  options.from   |  false   |      []       |
|   options.to    |  false   |     null      |
| options.reverse |  false   |     false     |
|  options.pass   |  false   |     null      |

函数行为：逐步返回`[from,to]`范围内的所有Text节点(中序遍历)

  - pass: 如果存在，这跳过所有返回为true的元素及其后代
