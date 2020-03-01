# Editor
## usage
```js
import {Transform} from 'slate';
```

## api

### insertNode
```js
(
  editor: Editor,
  nodes: Node | Node[],
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'highest'|'lowest',
    hanging?: boolean,
    select?: boolean,
    voids?: boolean,
  }
  )=>void
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|     editor      |   true   |       -       |
|      nodes      |   true   |       -       |
|   options.at    |  false   |       -       |
|  options.match  |  false   |       -       |
|  options.mode   |  false   |   'lowest'    |
| options.hanging |  false   |     false     |
| options.select  |  false   |       -       |
|  options.voids  |  false   |     false     |

函数行为:插入一段节点到指定的的位置

  - node: 插入的一组节点,如果仅有一个,则自动转化为\[node\]
  - at: 
    + 默认值: 
      * editor.selection存在: editor.selection
      * editor.selection不存在: 
        - 文档存在内容: 文档底部
        - 文档不存在内容: 文档首部
    + at `instanceof` Range:
      * isExpanded: 删除选中区后在尾部插入
      * isCollapsed: 在anchor点插入(接续后面的Point行为)
    + at `instanceof` Point:
      * 插入的是文本节点或inline节点: 在当前点插入(如果有必要,使用`Transform.splitNode`划分节点)
    + at `instanceif` Path: 在当前对应位置插入(插入位置后的所有节点向后移一位)
  + select: 是否在插入节点完成后`select`尾部.
  + hanging: 是否在at `instanceof` Range 时,对at做`Editor.unhanging`变化
  + match: 仅仅选取返回值为true的节点位置进行,如果有多个,选择第一个(仅在`Range|Point`时候有用),默认值为:
    * 插入节点为文本: n=>Text.isText(n);
    * 插入节点为inline: n=>Text.isText(n) || Editor.isInline(n)
    * 剩余默认值: n=>Editor.isBlock(n)(? 在叶节点可以插入block节点吗,正常情况,这会导致没有插入位置而返回) 
  
### liftNodes
```js
(
  editor: Editor,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'all'|'highest'|'lowest',
    voids: boolean,
  }
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.mode  |  false   |     'lowest'     |
| options.voids |  false   |      false       |

函数行为: 对于选取范围内的节点沿根节点方向移动一个单位长度(即把当前节点变为父节点的兄弟节点),并对特殊情况做补偿(删除没有children的节点,分割节点等)

  - match: 仅对选取范围内返回为true的进行操作,默认值为:
    + at `instanceof` Path: 仅仅选择当前path对应的节点
    + 其他情况: n=>Editor.isBlock(editor,n)
  - mode: 
    + mode `===` 'lowest': 仅仅命中叶节点或仅仅命中第一次命中节点
    + mode `===` 'highest': 仅仅命中最高节点

### mergeNodes
```js
(
  editor: Editor,
  options:{
    at?: Location,
    mode?: 'highest'|'lowest',
    hanging?: boolean,
    voids?: boolean,
  }
  )
=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.mode  |  false   |     'lowest'     |
| options.voids |  false   |      false       |

函数行为: 将所选领域的中序遍历的首个块级节点插入`Editor.previous`所确定的位置,同时自动处理特殊情况(移动后,原位置没有叶节点导致删除分支)

### moveNodes
```js
(
  editor: Editor,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'all'|'highest'|'lowest',
    voids: boolean,
    to: Path,
    voids?: boolean,
  }
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.mode  |  false   |     'lowest'     |
|  options.to   |   true   |      false       |
| options.voids |  false   |      false       |

函数行为: 将所选领域内的符合条件的节点移动至指定位置

  - match:仅处理返回为true的节点,默认值
    + at `instanceof` Path: 只处理Path对应的节点
    + other case: n=>Editor.isBlock('')


### removeNodes
```js
(
  editor: Editor,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'highest'|'lowest',
    hanging?: boolean,
    voids?: boolean,
  }
  )=>void
```
|    Arguments    | Required |  Default Value   |
|:---------------:|:--------:|:----------------:|
|     editor      |   true   |        -         |
|   options.at    |  false   | editor.selection |
|  options.match  |  false   |        -         |
|  options.mode   |  false   |     'lowest'     |
| options.hanging |  false   |      false       |
|  options.voids  |  false   |      false       |

函数行为: 删除`Editor.nodes`所确定范围内的所有符合条件的节点

### setNodes
```js
(
  editor: Editor,
  props: Partial<Node>,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'highest'|'lowest',
    hanging?: boolean,
    split?: boolean
    voids: boolean,
  }
  )=>void
```
|    Arguments    | Required |  Default Value   |
|:---------------:|:--------:|:----------------:|
|     editor      |   true   |        -         |
|      props      |   true   |        -         |
|   options.at    |  false   | editor.selection |
|  options.match  |  false   |        -         |
|  options.mode   |  false   |     'lowest'     |
| options.hanging |  false   |      false       |
|  options.split  |  false   |      false       |
|  options.void   |  false   |      false       |

函数行为: 设置选定范围内`Editor.nodes`所有符合条件的节点的属性值

  - split === 'true' && at `instanceof` Range: 尝试在区间的首尾两端调用`Transform.splitNode`

### splitNode
```js
(
  editor: Editor,
  options: {
    at?: Location
    match?: (node: Node) => boolean
    mode?: 'highest' | 'lowest'
    always?: boolean
    height?: number
    voids?: boolean
  })=>void
```
|   Arguments    | Required |  Default Value   |
|:--------------:|:--------:|:----------------:|
|     editor     |   true   |        -         |
|   options.at   |  false   | editor.selection |
| options.match  |  false   |        -         |
|  options.mode  |  false   |     'lowest'     |
| options.always |  false   |        -         |
| options.height |  false   |        -         |
|  options.void  |  false   |      false       |

函数行为: 在特定位置将一个Node划分为2个Node

### unsetNodes
```js
(
  editor: Editor,
  props: string| string[],
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'highest'|'lowest',
    hanging?: boolean,
    split?: boolean
    voids: boolean,
  }
  )=>void
```
|    Arguments    | Required |  Default Value   |
|:---------------:|:--------:|:----------------:|
|     editor      |   true   |        -         |
|      props      |   true   |        -         |
|   options.at    |  false   | editor.selection |
|  options.match  |  false   |        -         |
|  options.mode   |  false   |     'lowest'     |
| options.hanging |  false   |      false       |
|  options.split  |  false   |      false       |
|  options.void   |  false   |      false       |

函数行为: 设置选定范围内`Editor.nodes`所有符合条件的节点的特定属性值为null

  - split === 'true' && at `instanceof` Range: 尝试在区间的首尾两端调用`Transform.splitNode`

### unwrapNodes
```js
(
  editor: Editor,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'all'|'highest'|'lowest',
    split?: boolean,
    voids: boolean,
  }
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.mode  |  false   |     'lowest'     |
| options.split |  false   |      false       |
| options.voids |  false   |      false       |

函数行为: 将选定范围的所有节点的子节点提升一级(`Transform.liftNodes`)
  - split: 是否在必要时,调用`Editor.splitNode`来保证正确性

### wrapNodes
```js
(
  editor: Editor,
  element: Element,
  options:{
    at?: Location,
    match?: (node: Node)=>boolean,
    mode?: 'all'|'highest'|'lowest',
    split?: boolean,
    voids: boolean,
  }
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|    element    |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.mode  |  false   |     'lowest'     |
| options.split |  false   |      false       |
| options.voids |  false   |      false       |

函数行为: 在合适的位置插入一至多个Element并将特定范围内的节点包含在其中.
 
 - element
   + isInline: 操作的对象为选定范围内尾端块节点
   + other case: 操作对象为选定范围的节点

