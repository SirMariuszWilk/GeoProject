export const post = (path, projectForm) => {
  return new Promise((resolve, reject) => {
    const isRandomError = Math.random() < 0.1;

    setTimeout(() => {
      if (isRandomError) {
        reject(new Error("Something went wrong"));
      }

      resolve(projectForm);
    }, 500);
  });
};
