import React from 'react';
import { ImageWithCaption, Quote, Text } from './slices';

/**
 * Post slice zone component
 */
const SliceZone = ({ sliceZone }) => {
  const sliceComponents = {
    image_with_caption: ImageWithCaption,
    quote: Quote,
    text: Text,
  };

  return (
    sliceZone.map((slice, index) => {
      const SliceComponent = sliceComponents[slice.type];
      if (SliceComponent) {
        return (
          <SliceComponent
            slice={slice}
            key={`slice-${index}`}
          />
        );
      }
      return null;
    })
  );
};

export default SliceZone;
