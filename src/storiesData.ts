export interface Story {
  id: string;
  imageUrl: string;
  altText: string;
}

export const storiesData: Story[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=700&fit=crop',
    altText: 'Mountain landscape'
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=400&h=700&fit=crop',
    altText: 'Forest path'
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=700&fit=crop',
    altText: 'Sunset over hills'
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=700&fit=crop',
    altText: 'Misty forest'
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=700&fit=crop',
    altText: 'Beach sunset'
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=400&h=700&fit=crop',
    altText: 'Northern lights'
  }
];