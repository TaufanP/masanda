interface ResultProps {
  [key: string]: any;
}

const mockApi = (cond = true) => {
  return new Promise<ResultProps>((resolve, reject) => {
    setTimeout(() => {
      if (cond) {
        resolve({ isSuccess: true });
        return;
      }
      reject({ isSuccess: false });
      return;
    }, 2000);
  });
};

export default mockApi;
