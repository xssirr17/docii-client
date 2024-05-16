export const onRequestFulfilled = (request) => {
  return request;
};

export const onRequestRejected = (error) => {
  return Promise.reject(error);
};
