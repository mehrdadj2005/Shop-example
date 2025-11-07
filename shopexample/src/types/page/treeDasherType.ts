export type TreeDasherItems = {
  id: number;
  src: string;
  mode: string;
  title: string;
  hrefMen?: string;
  hrefWomen?: string;
  description: string;
  buttonLength: string;
};

export type TreeDasherTitle = {
  titl: string;
  buttons: {
    mode: string;
    buttonLength: string;
    hrefMen?: string;
    hrefWomen?: string;
  };
  description: string;
};
