import * as React from 'react';
import { render } from 'react-dom';
import { PaperEditor, GlobalStyle } from './src/';
import Test from './src/extensions/test';
import Heading from './src/extensions/custom-block';
import extensions from './src/extensions/';

extensions.push(new Heading({
  tagName: 'h5',
  className: '',
  icon: 'H<span>5</span>'
}));

render(<>
  <GlobalStyle />
  <PaperEditor
    showBackBtn
    showTitle
    titlePlaceholder="ここにタイトルを入力"
    extensions={extensions}
    autoSave
    html={`
<p>Hello World</p>
<h2>Test</h2>
<ul>
  <li>リスト1</li>
  <li>リスト2</li>
</ul>
<table>
  <tr>
    <th>aaa</th>
    <td>ee</td>
  </tr>
</table>
<img src="https://appleple.github.io/SmartPhoto/assets/images/large-kuma.jpg" />
`}
    // json={{
    //   type: 'doc',
    //   content: [
    //   {
    //     type: 'paragraph',
    //     content: [{
    //       type: 'text',
    //       text: 'Example Paragraph'
    //     }]
    //   }
    // ]}}
    onChange={({ json, html }) => {
    }} /></>,
  document.querySelector('#app'));
