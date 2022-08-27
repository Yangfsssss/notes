/**
 * 加载图片
 * @param src src
 */

function loadImg(src: string) {
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    const img = document.createElement('img');

    img.onload = () => {
      resolve(img);
    };

    img.onerror = () => {
      reject('图片加载失败');
    };

    img.src = src;
  });

  return promise;
}

const src = 'http://news-bos.cdn.bcebos.com/mvideo/log-news.png';
const res = loadImg(src);

res
  .then((img: HTMLImageElement) => {
    console.log(img.width);
    return img;
  })
  .then((img: HTMLImageElement) => {
    console.log(img.height);
  })
  .catch((err) => {
    console.log(err);
  });

  // 单一职责原则：每个then节点只处理一件事
  // 开放封闭原则：增添新的功能只需添加新的then节点
