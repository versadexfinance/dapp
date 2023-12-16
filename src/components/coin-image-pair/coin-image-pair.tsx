// Import necessary modules from Stitches
import { styled } from '@/styled';

import React from 'react';
import { CoinImagePairProps } from './interfaces';

// Styled components

const Container = styled('div', {
  display: 'flex',
  width: 'min-content',
  position: 'relative'
});

const ImageCoin = styled('img', {
  borderRadius: '50%',
  border: '1px solid black'
});

const CoinImagePair = (props: CoinImagePairProps) => {
  const { size, coin1_src, coin2_src } = props;

  return (
    <Container>
      <ImageCoin src={coin1_src} width={size} height={size} />
      <ImageCoin
        src={coin2_src}
        width={size}
        height={size}
        css={{ marginLeft: '-20%' }} // Use margin-left instead of translateX
      />
    </Container>
  );
};

export default CoinImagePair;
