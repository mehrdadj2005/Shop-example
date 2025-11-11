export type ProductCardType = {
  id: number;
  label: string;
  images: {
    main: string;
    moreImages: string[];
  };
  description: string;
  sizes: number[];
  colors: {
    all: string[];
    classic: string[];
    limited: string[];
  };
  price: number;
  discountedPrice: number;
};
