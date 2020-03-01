# Editor
## usage
```js
import {Editor} from 'slate';
```

## api

### above
函数签名：
```js
<T extends Ancestor>(
  editor: Editor,
  options:{
    at?: Location,
    match?: NodeMatch<T>,
    mode?: 'highest'|'lowest',
    voids?: boolean
  }
  )=>NodeEntry<T>|undefined
```

|   Arguments    | Required |  Default Value   |
|:--------------:|:--------:|:----------------:|
|     edtior     |   true   |        -         |
|   options.at   |  false   | editor.selection |
| options.mathch |  false   |     ()=>true     |
|  options.mode  |  false   |     'lowest'     |
| options.voids  |  false   |      false       |

函数行为：获取`Location`对应路径上第一个非叶节点

  - at: 
    + at `==` null(editor.selection不存在)　返回undefined
    + In other cases: at 通过 `Editor.path`计算获得最终值
  - match: 在遍历范围内，丢弃match函数返回为false的`NodeEntry`
  - mode: 
    + mode `===` 'lowest': 仅仅输出叶节点或仅仅输出第一次命中节点
    + mode `===` 'highest': 仅仅输出最高节点
  - voids: 在寻找过程中，遇见void节点是否退出寻找

>P.S.　该函数内部使用`Node.levels`来完成遍历，voids选项存在错误使用情况
 



### after
```js
(
  editor:Editor,
  at: Location,
  options:{
    distance?: number,
    unit?: 'offset' | 'character'|'word'|'line'|'block'
  }
  )=>Point|undefined
```
|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        at        |   true   |       -       |
| options.distance |  false   |       1       |
|   options.unit   |  false   |    offset     |

函数行为：在选定范围的后面寻早符合条件的下一个Point(光标位置)

  - at: 使用`Editor.end`选取`anchor`,`foucs`是文档的最末尾
  - distance:向后选取第几个符合条件的位置，即为步长
  - unit: 
    + unit `===` 'offset':以字符串长度为单位
    + unit `===` 'character':以字符为单位（兼容一些unicode字符）
    + unit `===` 'word':以一个单词为单位
    + unit `===` 'line':以一行为单位（这里的一行实际意义上是指叶节点的直接父元素）
    + unit `===` 'block':同'line'一个情况（？存疑)

### before
```js
(
  editor: Editor,
  at: Location,
  options:{
    distance?: number,
    unit?: 'offset'|'character'|'word'|'line'|'block',
  }
  )=>Point | undefined
```
|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        at        |   true   |       -       |
| options.distance |  false   |       1       |
|   options.unit   |  false   |    offset     |

函数行为：在特定范围内选取符合条件的上一个Point位置
>P.S. 函数具体行为类比于｀Editor.after`

### edges
```js
(
  editor: Editor,
  at: Location,
  )=>[Point,Point]
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：等价于`[Editor.start(editor,at),Editor.end(editor,at)]`

### end
```js
(
  editor: Editor,
  at: Location,
  )=>Point
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：等价于`Editor.point(editor,at,{edge:'end'}`

### first
```js
(
  editor: Editor,
  at: Location,
  )=>NodeEntry
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：返回传入path对应节点的第一个子孙节点(左下)

### fragment
```js
(
  editor: Editor,
  at: Location
  )=>Descendant
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：返回`Location`对应区域内的`Fragment`(包含所有区域内所有内容的slate元素树)

### leaf
```js
(
  editor: Editor,
  at: Location,
  options:{
    depth?: number,
    edge?: 'start'|'end',
  }
  )=>NodeEntry<Text>
```
|   Arguments   | Required | Default Value |
|:-------------:|:--------:|:-------------:|
|    editor     |   true   |       -       |
|      at       |   true   |       -       |
| options.depth |  false   |   undefined   |
| options.edge  |  false   |   undefined   |

函数行为：使用`Editor.Path`获得`path`,在根据得到的｀path｀取得具体的叶节点

### levels
```js
*<T extends Node>(
  editor: Editor,
  options: {
    at?: Location,
    match?: NodeMatch<T>,
    reverse?: boolean,
    voids?: boolean,
  }
  )=>Iterable<NodeEntry<T>>
```
|    Arguments    | Required | Default Value |
|:---------------:|:--------:|:-------------:|
|     editor      |   true   |       -       |
|   options.at    |  false   |   ()=>true    |
| options.match?  |  false   |     false     |
| options.reverse |  false   |     false     |
|      voids      |  false   |     false     |

函数行为：　迭代输出特定路径上所有的节点，特定路径由｀Editor.path｀获得

  - at: 
    + at `==` null(editor.selection不存在)　返回undefined
    + In other cases: at 通过 `Editor.path`计算获得最终值
  - match: 在遍历范围内，丢弃match函数返回为false的`NodeEntry`
  - reverse: 
    + reverse `===` false:　从树的根节点到叶节点开始寻找 
    + mode `===` true: 从树的叶节点到根节点开始寻找
  - voids: 在寻找过程中，遇见void节点是否退出寻找

### marks
```js
(
  editor: Editor
  )=>Record<string,any>
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |

函数行为：返回当前选取对应Text节点的所有属性（除了text属性）,并根据当前选取情况：

  - 选区不闭合，选区内第一个Text节点
  - 选区闭合
    + offset `===` 0且前面兄弟节点存在：　左边靠的最近的兄弟Text节点
    + 当前path下第一个兄弟节点  

### next
```js
(
  editor: Editor,
  options:{
    at?: Location,
    match?: NodeMatch<T>,
    mode?:'all'|'highest'|'lowest',
    voids?:boolean,
  }
  )=>NodeEntry<T>|undefined
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.node  |  false   |     'lowest'     |
| options.voids |  false   |      false       |

函数行为：返回`[at,编辑器末端]`范围内遍历过程中(中序遍历)的下一个节点,当at为Path并且match为空的时候，遍历结果只覆盖到at所在层级

### node
```js
(
  editor: Editor,
  at: Path,
  options:{
    depth?: number,
    edge?: 'start'|'end'
  }
  )=>NodeEntry
```
|   Arguments   | Required | Default Value |
|:-------------:|:--------:|:-------------:|
|    editor     |   true   |       -       |
|      at       |   true   |       -       |
| options.depth |  false   |   undefined   |
| options.edge  |  false   |   undefined   |

函数行为：返回at对应路径上的节点

### nodes
```js
*<T extends Node>(
  editor: Editor,
  options?:{
    at?: Location,
    match?: NodeMatch<T>,
    universla?: boolean,
    reverse?: boolean,
    voids?: boolean,
  }
  )=>Iterable<NodeEntry<T>>
```
|     Arguments     | Required |  Default Value   |
|:-----------------:|:--------:|:----------------:|
|      editor       |   true   |        -         |
|    options.at     |   true   | editor.selection |
|   options.match   |  false   |     ()=>true     |
|   options.mode    |  false   |      'all'       |
| options.universal |  false   |      false       |
|   options.voids   |  false   |      false       |

函数行为：中序遍历返回选定范围内的结点

   - match: 是否在输出第一个结点前对所有的遍历结点执行match函数
   - reverse: 控制每棵树的遍历情况是否是从左到右
   - mode: 
     + mode `===` 'lowest': 仅仅输出叶节点或仅仅输出第一次命中节点
     + mode `===` 'highest': 仅仅输出最高节点

### normalize
```js
(
  editor: Editor,
  options:{
    force?:boolean,
  }
  )=>void
```
|   Arguments   | Required | Default Value |
|:-------------:|:--------:|:-------------:|
|    editor     |   true   |       -       |
| options.force |  false   |     false     |

函数行为：对标记在`DIRTY_PATHS`中的所有路径对应结点执行`editor.normalize`函数．

- force: 控制是否标记所有的结点为dirty path.

>P.S. 基本上所有的operation操作都会将有关的路径标记为dirty path,故在`editor.normalize`函数调用中使用`Transfomr`函数会动态更新当前处理结点．

### parent
```js
(
  editor:Editor,
  at: Location,
  options:{
    depth?: number,
    edge?: 'start'|'end'
  }
  )=>NodeEntry<Ancestor>
```
|   Arguments   | Required | Default Value |
|:-------------:|:--------:|:-------------:|
|    editor     |   true   |       -       |
|      at       |   true   |       -       |
| options.depth |  false   |   undefined   |
| options.edge  |  false   |   undefined   |

函数行为：返回特定位置内的父节点


### path
```js
(
  editor: Editor,
  at: Location,
  options: {
    depth?: number,
    edge?: 'start' | 'end',
  }
  )=>Path
```

|   Arguments   | Required | Default Value |
|:-------------:|:--------:|:-------------:|
|    editor     |   true   |       -       |
|      at       |   true   |       -       |
| options.depth |  false   |   undefined   |
| options.edge  |  false   |   undefined   |

函数行为:

  - at: Path | Range | Point
    + at `instanceof` Path: 
      * edge `===` start: 返回传入path对应节点的第一个子孙节点(左下)
      * edge `===` end: 返回传入path对应节点的最后一个的子孙节点(右下)
      * edge `==` null: 返回at本身
    + at `instanceof` Range:
      * edge `===` start: 返回传入range的首节点对应的path
      * edge `===` end: 返回传入range的尾节点对应的path
      * edge `==` null: 返回传入range两个节点的最小公共祖先对应的path
    + at `instanceof` Point: 返回　`at.path`
  - depth: 用来限制返回path的最大深度,等价于`path.slice(0,depth)`


### pathRef
```js
(
  editor: Editor,
  path: Path,
  options:{
    affinity?: 'backward'|'forward'|null
  }
  )=>PathRef
```

|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        at        |   true   |       -       |
| options.affinity |  false   |   'forward'   |

函数行为：关联一个path当前编辑器上，知道`path.unref()`调用前，任何operation在执行时，都会动态更新该Ref

### pathRefs
```js
(
  editor: Editor,
  )=>Set<PathRef>
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |

函数行为: 获得该编辑器关联的所有pathRefs

### point
```js
(
  editor: Editor,
  at: Location,
  options:{
    edge?: 'start'|'end',
  }
  )=>Point
```
|  Arguments   | Required | Default Value |
|:------------:|:--------:|:-------------:|
|    editor    |   true   |       -       |
|      at      |   true   |       -       |
| options.edge |  false   |    'start'    |

  - at: Path | Range | Point
    + at `instanceof` Path: 
      * edge `===` start: 返回传入path对应节点的第一个子孙节点首位置
      * edge `===` end: 返回传入path对应节点的最后一个的子孙节点末位置
    + at `instanceof` Range:
      * edge `===` start: 返回`at`中的`start`
      * edge `===` end: 返回`at`中的`end`
    + at `instanceof` Point: 返回　`at`

### pointRef
```js
(
  editor: Editor,
  path: Path,
  options:{
    affinity?: 'backward'|'forward'|null
  }
  )=>PointRef
```

|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        at        |   true   |       -       |
| options.affinity |  false   |   'forward'   |

函数行为：关联一个point当前编辑器上，知道`path.unref()`调用前，任何operation在执行时，都会动态更新该Ref

### pointRefs
```js
(
  editor: Editor,
  )=>Set<PointRef>
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |

函数行为: 获得该编辑器关联的所有pointRefs

### positions
```js
*(
  editor: Editor,
  options: {
    at?: Location,
    unit?: 'offset'|'character'|'word'|'line'|'block',
    reverse?: boolean,
  }
  )=>Iterable<Point>
```
|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        options.at        |   true   |       editor.selection       |
|   options.unit   |  false   |    offset     |
| options.reverse |  false   |       false       |

函数行为：逐步返回符合条件的所有Point位置

  - at: 使用`Editor.end`选取`anchor`,`foucs`是文档的最末尾
  - reverse: 是否是向前搜索
  - unit: 
    + unit `===` 'offset':以字符串长度为单位
    + unit `===` 'character':以字符为单位（兼容一些unicode字符）
    + unit `===` 'word':以一个单词为单位
    + unit `===` 'line':以一行为单位（这里的一行实际意义上是指叶节点的直接父元素）
    + unit `===` 'block':同'line'一个情况（？存疑)

### previous
```js
<T extends Node>(
  editor: Editor,
  options:{
    at?: Location,
    match?: NodeMatch<T>,
    mode?: 'all'|'highest'|'lowest',
    voids?: boolean,
  }
  )=>NodeEntry<T>|undefined
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.match |  false   |        -         |
| options.node  |  false   |     'lowest'     |
| options.voids |  false   |      false       |

函数行为：返回`[at,编辑器末端]`范围内遍历过程中(中序遍历)的下一个节点,当at为Path并且match为空的时候，遍历结果只覆盖到at所在层级

### range
```js
(
  editor: Editor,
  at:Location,
  to?:Location,
  )=>Range
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  at   |  true   | - |
|  to   |  false   | at |

函数行为：返回`[at,to]`对应的Range.

### rangeRef
```js
(
  editor: Editor,
  range: Range,
  options:{
    affinity?: 'backward'|'forward'|'outward'|'inward'|null
  }
  )=>PointRef
```

|    Arguments     | Required | Default Value |
|:----------------:|:--------:|:-------------:|
|      editor      |   true   |       -       |
|        at        |   true   |       -       |
| options.affinity |  false   |   'forward'   |

函数行为：关联一个range当前编辑器上，知道`range.unref()`调用前，任何operation在执行时，都会动态更新该Ref

### rangeRefs
```js
(
  editor: Editor,
  )=>Set<PointRef>
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |

函数行为: 获得该编辑器关联的所有rangeRefs

### start
```js
(
  editor: Editor,
  at: Location,
  )=>Point
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：等价于`Editor.point(editor,at,{edge:'start'}`

### string
```js
(
  editor: Editor,
  at: Location,
  )=>string
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    at     |   true   |       -       |

函数行为：返回选定范围内的文本内容

### unhangRange
```js
(
  editor: Editor,
  range: Range,
  options:{
    voids?: boolean,
  }
  )=>Range
```
| Arguments | Required | Default Value |
|:---------:|:--------:|:-------------:|
|  editor   |   true   |       -       |
|    range     |   true   |       -       |
|options.voids|false|false

函数作用：当range两端都位于不同Text的行首时，将range尾端调到上一个最近的Text尾端．

### void
```js
(
  editor: Editor,
  options:{
    at?: Location,
    mode?: 'highest'|'lowest',
    voids?: boolean
  }
  )=>NodeEntry<Element> | undefined
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  options.at   |  false   | editor.selection |
| options.node  |  false   |     'lowest'     |
| options.voids |  false   |      false       |

函数行为：返回当前路径上第一个Void的Element.

### withoutNormalizing
```js
(
  editor: Editor
  fn: ()=>void
  )=>void
```
|   Arguments   | Required |  Default Value   |
|:-------------:|:--------:|:----------------:|
|    editor     |   true   |        -         |
|  fn   |  false   | n |

函数作用：在执行一段组合操作时，组织所有的normalization过程的调用，并在完成后，调用normalization.通常来说，这用来组合一段类原子性的动作

>P.S.　该函数并不会导致任何ref关联失效．
