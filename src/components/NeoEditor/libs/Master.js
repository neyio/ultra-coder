let blobURL = null;

const MasterWorker = (markdownString, timeoutLimit) => {
  const blob = new Blob([document.querySelector('#markedWorker').textContent]);

  blobURL = blobURL || window.URL.createObjectURL(blob); //createObjectURL 会在整个浏览器生命周期持续

  const markedWorker = new Worker(blobURL);

  markedWorker.addEventListener('error', function(event) {
    console.error('转码出错', event);
  });

  return new Promise((resolve, reject) => {
    const markedTimeout = setTimeout(() => {
      markedWorker.terminate();
      throw new Error('Marked took too long!');
    }, timeoutLimit);
    markedWorker.onmessage = e => {
      clearTimeout(markedTimeout);
      const html = e.data;
      markedWorker.terminate();
      resolve(html);
    };
    markedWorker.postMessage(markdownString);
  });
};

export default MasterWorker;
