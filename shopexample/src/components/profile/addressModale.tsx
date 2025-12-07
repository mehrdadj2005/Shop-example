"use client";

import { Api } from "@/services/api";
import { Icons } from "@/types/ui/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface NewAddressProps {
  newAddressModal: boolean;
  setNewAddressModal: (value: boolean) => void;
}
interface EditAddressProps {
  id: number;
  editAddressModal: boolean;
  setEditAddressModal: (value: boolean) => void;
}

function NewAddress({ newAddressModal, setNewAddressModal }: NewAddressProps) {
  const [icons, setIcons] = useState<Icons>({});

  useEffect(() => {
    async function getData() {
      const data = await Api("icons");
      setIcons(await data[0].items[0]);
    }
    getData();
  }, []);

  return (
    <div className="w-full h-screen bg-[#00000040] absolute top-0 ring-0 left-0">
      <div className="bg-white rounded-2xl w-10/12 h-80 absolute top-1/6 left-0 right-0 mx-auto flex items-center px-2 flex-col py-4">
        <div className="w-full flex justify-between">
          <h3 className="text-lg font-medium pl-2 text-stone-700">
            NEW ADDRESS
          </h3>
          <Image
            onClick={() => setNewAddressModal(!newAddressModal)}
            className="mr-2 ml-auto mb-6"
            src={icons.close}
            alt="arrow left"
            width={24}
            height={24}
          />
        </div>
        <div className="w-full px-4">
          <Textarea className="min-h-36 max-h-36 border-2 border-primary text-stone-700" />
        </div>

        <Button
          variant={"secondary"}
          className="mt-8 border-2 text-stone-500 font-medium text-lg"
          onClick={() => setNewAddressModal(!newAddressModal)}
        >
          ADD
        </Button>
      </div>
    </div>
  );
}

function EditAddres({
  id,
  editAddressModal,
  setEditAddressModal,
}: EditAddressProps) {
  const [icons, setIcons] = useState<Icons>({});

  useEffect(() => {
    async function getData() {
      const data = await Api("icons");
      setIcons(await data[0].items[0]);
    }
    getData();
  }, []);

  return (
    <div className="w-full h-screen bg-[#00000040] absolute top-0 ring-0 left-0">
      <div className="bg-white rounded-2xl w-10/12 h-80 absolute top-1/6 left-0 right-0 mx-auto flex items-center px-2 flex-col py-4">
        <div className="w-full flex justify-between">
          <h3 className="text-lg font-medium pl-2 text-stone-700">
            EDIT ADDRESS
          </h3>
          <Image
            onClick={() => setEditAddressModal(!editAddressModal)}
            className="mr-2 ml-auto mb-6"
            src={icons.close}
            alt="arrow left"
            width={24}
            height={24}
          />
        </div>

        <div className="w-full px-4">
          <Textarea className="min-h-36 max-h-36 border-2 border-primary text-stone-700" />
        </div>

        <Button
          variant={"secondary"}
          className="mt-8 border-2 text-stone-500 font-medium text-lg"
          onClick={() => setEditAddressModal(!editAddressModal)}
        >
          OK
        </Button>
      </div>
    </div>
  );
}

export { EditAddres, NewAddress };
