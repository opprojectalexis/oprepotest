const answers = {
    data: []
  };
  
  export function addAnswer(pageId, answer) {
    answers.data.push({ pageId, answer });
    console.log('Current answers:', JSON.stringify(answers, null, 2));
  }
  
  export default answers;
  