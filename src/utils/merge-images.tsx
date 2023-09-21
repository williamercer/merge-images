import { Image, ImageSource, Options } from 'merge-images';

// Defaults
const defaultOptions: Options = {
  format: 'image/png',
  quality: 0.92,
  width: undefined,
  height: undefined,
  Canvas: undefined,
  crossOrigin: undefined,
};

const scaleIt = (source: any, scaleFactor: number) => {
  const c = window.document.createElement('canvas');
  const ctx = c.getContext('2d');
  const w = source.width * scaleFactor;
  const h = source.height * scaleFactor;
  c.width = w;
  c.height = h;

  ctx?.drawImage(source, 0, 0, w, h);
  return c;
};

// Return Promise
export const mergeImages = (
  sources: ImageSource[] = [],
  options: Options = {},
) =>
  new Promise((resolve) => {
    options = {
      ...defaultOptions,
      ...options,
    };

    // Setup browser/Node.js specific variables
    const canvas = options.Canvas
      ? new options.Canvas()
      : window.document.createElement('canvas');
    const ImageObj = options.Image || window.Image;

    // Load sources
    const images = sources.map(
      (source) =>
        new Promise((resolve, reject) => {
          // Convert sources to objects
          if (source.constructor.name !== 'Object') {
            source = { src: source as Image };
          }

          // Resolve source and img when loaded
          const img = new ImageObj();
          img.crossOrigin = options.crossOrigin;
          img.onerror = () => reject(new Error("Couldn't load image"));
          // eslint-disable-next-line prefer-object-spread
          img.onload = () => resolve(Object.assign({}, source, { img }));
          // @ts-ignore
          img.src = source.src;
        }),
    );

    // Get canvas context
    const ctx = canvas.getContext('2d');

    // When sources have loaded
    resolve(
      Promise.all(images).then((images) => {
        // Set canvas dimensions
        const getSize = (dim: any) =>
          // @ts-ignore
          options[dim] ||
          Math.max(...images.map((image: any) => image.img[dim]));
        canvas.width = getSize('width');
        canvas.height = getSize('height');

        // -------------Calculate image positions, width, height-------------
        const imagelen = images.length;
        const row = imagelen > 3 ? Math.ceil(imagelen / 3) : 1;
        const column = imagelen > 3 ? 3 : imagelen;

        const imageWidth = Math.floor(canvas.width / column);
        const imageHeight = Math.floor(canvas.height / row);
        const positions: any[] = [];
        for (let i = 0; i < row; i += 1) {
          for (let j = 0; j < column; j += 1) {
            positions.push({
              x: j * imageWidth,
              y: i * imageHeight,
              sx: imageWidth,
              sy: imageHeight,
            });
          }
        }

        const extendedImages = images.map((img: any, index: number) => {
          return {
            ...img,
            ...positions[index],
          };
        });
        // ----------------------------------------------------

        // Draw images to canvas
        extendedImages.forEach((image: any) => {
          const scaledImage = scaleIt(image.img, 0.5);
          ctx.globalAlpha = image.opacity ? image.opacity : 1;
          return ctx.drawImage(
            scaledImage,
            image.x || 0,
            image.y || 0,
            image.sx,
            image.sy,
          );
        });

        if (options.Canvas && options.format === 'image/jpeg') {
          // Resolve data URI for node-canvas jpeg async
          return new Promise((resolve, reject) => {
            canvas.toDataURL(
              options.format,
              {
                quality: options.quality,
                progressive: false,
              },
              (err: any, jpeg: any) => {
                if (err) {
                  reject(err);
                  return;
                }
                resolve(jpeg);
              },
            );
          });
        }

        // Resolve all other data URIs sync
        return canvas.toDataURL(options.format, options.quality);
      }),
    );
  });
