/**
 * @author yangdage
 * @date 2019-08-27
 * @Description: 给指定元素增加选择变色功能
 * @param: {
 *   el: 需要绑定的元素(最好id，或者class)
 *   backgroundColor: 选择后的背景色
 *   color: 选择后的字体颜色
 *   onSelect: 选择后的事件
 * }
 */
function addSelect(param) {
  let el = param.el;
  let backgroundColor = param.backgroundColor || '#fffb6c';
  let color = param.color;
  let onSelect = param.onSelect;
  let currentEle = null;


  document.onmouseup = function (e) {
    let resultEle = document.querySelector(el);
    let selected = window.getSelection();
    if (selected.type === 'None') {
      return;
    }
    let r = selected.getRangeAt(0);
    let selectedStr = selected.toString();

    if (r.startContainer === r.endContainer && selectedStr) {
      let children = resultEle.childNodes;
      let c;
      let result = [];
      for (let i = 0; i < children.length; i++) {
        if (children[i] === r.startContainer) {
          c = i;
        }
      }
      for (let i = 0; i < children.length; i++) {
        let node = children[i];
        if (node.toString() === '[object Text]') {
          if (i === c) {
            let start = node.nodeValue.substring(0, r.startOffset);
            let end = node.nodeValue.substring(r.endOffset);
            let span = document.createElement('span');
            span.innerText = selectedStr;
            span.style.backgroundColor = backgroundColor;
            span.style.color = color;
            start = new Text(start);
            end = new Text(end);
            result.push(start);
            result.push(span);
            result.push(end);
            currentEle = span;
            continue;
          }
          result.push(node);
        } else {
          result.push(node);
        }
      }
      resultEle.innerHTML = '';
      for (let i = 0;i < result.length; i++) {
        resultEle.appendChild(result[i]);
      }
      if (onSelect) {
        onSelect(e, currentEle);
      }
    }
  };

  return {
    clear: function () {
      if (currentEle) {
        currentEle.outerHTML = `${currentEle.innerText}`;
        currentEle = null;
      }
    },
    getSelect: function () {
      return currentEle;
    }
  }
}


