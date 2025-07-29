export const getUrls = () => {
  const data = localStorage.getItem('shortenedUrls');
  return data ? JSON.parse(data) : [];
};

export const saveUrls = (urls) => {
  localStorage.setItem('shortenedUrls', JSON.stringify(urls));
};