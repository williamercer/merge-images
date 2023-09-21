import React, { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Stack from '@mui/material/Stack';

import { mergeImages } from '../../utils/merge-images';

async function downloadImage(imageUrl: string) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`,
    );
  }
  const imageBuffer = await response.arrayBuffer();
  return Buffer.from(imageBuffer);
}

function HomePage() {
  const [mergedImage, setMergedImage] = useState<any>();

  const handleMerge = async () => {
    const buffer = await downloadImage(
      'https://i5.walmartimages.com/dfw/4ff9c6c9-255e/k2-_fe858d7c-a0d6-461a-bd89-cefe81142a49.v1.jpg',
    );

    const mergedBase64Content = await mergeImages(
      [
        {
          src: `data:image/jpeg;base64,${buffer.toString('base64')}`,
        },
        {
          src: `data:image/jpeg;base64,${buffer.toString('base64')}`,
        },
        {
          src: `data:image/jpeg;base64,${buffer.toString('base64')}`,
        },
        {
          src: `data:image/jpeg;base64,${buffer.toString('base64')}`,
        },
      ],
      {
        width: 600,
        height: 400,
        // format: 'image/jpeg',
        // quality: 1,
      },
    );

    setMergedImage(mergedBase64Content);
  };

  useEffect(() => {
    handleMerge();
  }, []);

  return (
    <Stack sx={{ pt: 10 }}>
      <img alt="merged_image" src={mergedImage} width={600} height={400} />
    </Stack>
  );
}

export default HomePage;
