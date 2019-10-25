const callback = eventService => (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      const { removedNodes, target } = mutation;
      // 如果编辑器执行了下法规代码，表示编辑器已经触发了bug
      if (removedNodes && removedNodes.length) {
        const hasTable = Array.from(removedNodes).some(
          node => node.nodeType === 1 && node.closest('table.ag-paragraph'),
        );
        if (hasTable) {
          eventService.dispatch('crashed');
          console.warn('There was a problem with the table deletion.');
        }
      }

      if (target.getAttribute('id') === 'ag-editor-id' && target.childElementCount === 0) {
        // TODO: 编辑器炸了
        eventService.dispatch('crashed');
        console.warn('editor crashed, and can not be input any more.');
      }
    }
  }
};

export default function mutationObserver({ container, eventService }) {
  const config = { childList: true, subtree: true }; // Options for the observer (which mutations to observe)

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback(eventService));

  // Start observing the target node for configured mutations
  observer.observe(container, config);
}
