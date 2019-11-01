import React, { useEffect } from 'react';
const html = `
<h1>模拟编辑器</h1>
<ol start="1">
<li>String :includes,startsWith,endsWith,include用于判断字符串是否在字符串中，三个方法均返回boolean. repeat(n)方法返回 string的 ‘hello’.repeat(2)==> hello hello
</li><li>padStart , padEnd ,  str.padStart(长度,填补字符串) ,     ‘xx’.padStart(5,’ab’) ===> abaxx
</li><li>字符串模板可以嵌套
</li></ol>

<pre><code class='code-multiline' lang='js'><span class="sf_code_keyword">const</span> <span class="sf_code_function-variable">something</span> <span class="sf_code_operator">=</span> arr <span class="sf_code_operator">=&gt;</span> <span class="sf_code_punctuation">{</span>
  <span class="sf_code_keyword">return</span> <span class="sf_code_string">\`</span> <span class="sf_code_interpolation-punctuation">\${</span> <span class="sf_code_interpolation">arr</span> <span class="sf_code_punctuation">.</span> <span class="sf_code_function">map</span>
    <span class="sf_code_punctuation">((</span> <span class="sf_code_interpolation">item</span>
    <span class="sf_code_punctuation">,</span>
    <span class="sf_code_interpolation"> index</span>
    <span class="sf_code_punctuation">)</span> <span class="sf_code_interpolation"> </span> <span class="sf_code_operator">=&gt;</span> <span class="sf_code_interpolation"> \`$</span>
    <span class="sf_code_punctuation">{</span> <span class="sf_code_interpolation">index</span> <span class="sf_code_interpolation-punctuation">}</span> <span class="sf_code_string"> - </span> <span class="sf_code_interpolation-punctuation">\${</span> <span class="sf_code_interpolation">item</span> <span class="sf_code_interpolation-punctuation">}</span> <span class="sf_code_string">\`</span>
     <span class="sf_code_punctuation">).</span> <span class="sf_code_function">join</span> <span class="sf_code_punctuation">(</span> <span class="sf_code_string">"+"</span> <span class="sf_code_punctuation">)}</span>\`< span class="sf_code_punctuation" >;</span >
<span class="sf_code_punctuation">};</span>
console<span class="sf_code_punctuation">.</span><span class="sf_code_function">log</span><span class="sf_code_punctuation">(</span><span class="sf_code_function">something</span><span class="sf_code_punctuation">([</span><span class="sf_code_string">"a"</span><span class="sf_code_punctuation">,</span> <span class="sf_code_string">"b"</span><span class="sf_code_punctuation">,</span> <span class="sf_code_string">"c"</span><span class="sf_code_punctuation">]));</span>
</code></pre><h1>标题</h1><p>3232</p><ol start="1"><li></li><li></li><li></li><li></li></ol>
`;
const onKeyup = () => {
  console.log('keyup');
};
let i = 1;
const testHello = () => {
  console.log('testHello!');
  return 'testHello';
};
const Content = React.forwardRef((props, ref) => {
  const { dispatchEvent } = props;
  //   const ref = useRef();
  useEffect(() => {
    console.log(i++);
    const subscribe = (event, listener) => {
      dispatchEvent({
        type: 'attachCustomEvent',
        payload: [event, listener],
      });
    };

    subscribe('subChildCustomTest', testHello);

    const attach = (event, listener) => {
      dispatchEvent({
        type: 'attachDOMEvent',
        payload: [ref.current, 'keyup', onKeyup],
      });
    };

    //测试通过
    dispatchEvent({
      type: 'triggerCustomEvent',
      payload: ['subChildCustomTest', testHello],
    });
    attach();
    ref.current.setAttribute('data-medium-editor-element', true); //设置为editor的根，防止溢出查找
    return () => {
      console.log(dispatchEvent);
      dispatchEvent({
        type: 'detachAllDOMEvent',
      });
    };
  }, [dispatchEvent, ref]);
  return <div ref={ref} contentEditable={true} dangerouslySetInnerHTML={{ __html: html }}></div>;
});

export default Content;
