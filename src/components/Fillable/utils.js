export const cutDown = content => {
  const reg = /_{2,}([\s\S]*?)_{2,}/g;
  let temp = [];
  const tempAnswers = [];
  while ((temp = reg.exec(content)) !== null) {
    tempAnswers.push(temp[1]);
  }

  const getContent = (str = '') => {
    return str.replace(/_{2,}([\s\S]*?)_{2,}/g, '::@content::').split('::@content::');
  };
  return {
    answers: tempAnswers,
    cutDownArray: getContent(content) || [],
  };
};

export const mixUp = ({ cutDownArray, answers }) => {
  return cutDownArray.reduce((acc, item, i) => {
    return `${acc}${item ? item : ''}${answers[i] ? '__' + answers[i] + '__' : ''}`;
  }, '');
};
