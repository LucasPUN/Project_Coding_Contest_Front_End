import HttpHelper from './HttpHelper';

class CompilerApi {
  static requestHeaders() {
    return { 'Content-Type': 'application/json' };
  }

  static getTask(lang, questionId) {
    return HttpHelper.fetch(
      `${process.env.API_URL}/api/file/${lang}/${questionId}`,
      'GET',
      this.requestHeaders(),
      null,
    );
  }

  static run(answer, questionId) {
    const userId = JSON.parse(localStorage.getItem('loginUser')).id;
    const userName = JSON.parse(localStorage.getItem('loginUser')).userName;
    const requestBody = {
      ...answer,
      userId: userId,
      userName: userName
    };
    return HttpHelper.fetch(
        `${process.env.API_URL}/api/run/${questionId}`,
        'POST',
        this.requestHeaders(),
        JSON.stringify(requestBody),
    );
  }
}

export default CompilerApi;
