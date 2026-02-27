type AboutItem = {
  text: string;
  src: string;
};

type BigPicture = {
  text: string;
  src: string;
};

export type AboutData = {
  firstText: string;
  items: AboutItem[];
  bigPicturs: BigPicture;
};
