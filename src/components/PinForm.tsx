"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GrFormUpload } from "react-icons/gr";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useToast } from "./ui/use-toast";
import app from "@/lib/firebase";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import cuid from "cuid";

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
};

type Props = {
  user: User | null | undefined;
};

interface Pin {
  title: string;
  description: string;
  tag: string;
  // imageFile?: File;
  imageUrl?: string;
  userName?: string | null;
  userProfile?: string | null;
}

const PinForm: React.FC<Props> = ({ user }) => {
  const imgRef = React.useRef<HTMLInputElement>(null);
  const storage = getStorage(app);
  const { toast } = useToast();
  const db = getFirestore(app);

  const [pinData, setPinData] = React.useState<Pin>({
    title: "",
    description: "",
    tag: "",
    imageUrl: "",
    userName: user?.name || null,
    userProfile: user?.image || null,
  });
  const [selectedImg, setSelectedImg] = React.useState<File>();
  const [busy, setBusy] = React.useState<Boolean | undefined>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImg = e.target.files?.[0];
    if (selectedImg) {
      setSelectedImg(selectedImg);
    }
  };

  // console.log(selectedImg);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPinData((prevPinData) => ({
      ...prevPinData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const storageRef = ref(storage, "pinterest/" + selectedImg?.name);

    try {
      await uploadBytes(storageRef, selectedImg as File);
      // console.log("File uploaded successfully!");

      const url = await getDownloadURL(storageRef);
      // console.log(url);
      // return url;
      const pinId = cuid();

      const pinDataToSave = {
        title: pinData.title,
        description: pinData.description,
        tag: pinData.tag,
        imageUrl: url,
        userName: pinData.userName,
        userProfile: pinData.userProfile,
        createdAt: new Date(),
      };

      // console.log(pinDataToSave);

      const pinRef = doc(db, "pins", pinId);
      await setDoc(pinRef, pinDataToSave).then(() => {
        // console.log("OK");
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedImg && selectedImg.size > 3 * 1024 * 1024) {
      toast({
        title: "Image size exceeds 3MB limit!",
        variant: "destructive",
      });
      return;
    }

    if (selectedImg) {
      try {
        setBusy(true);
        await handleSave().then(() => {
          setBusy(false);
        });

        toast({
          title: "Pin created successfully!",
          variant: "success",
        });
        setBusy(false);
      } catch (error) {
        setBusy(false);
        toast({
          title: "Error creating pin.",
          description: "There was an issue uploading the image.",
          variant: "destructive",
        });
      }
    } else {
      setBusy(false);
      toast({
        title: "Select an image file!",
        variant: "destructive",
      });
    }
  };

  // console.log(pinData);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row space-y-10">
        <div className="w-[15rem] h-[15rem] mt-16 md:mt-0 border-dashed border-2 rounded-lg md:h-[32rem] md:w-[32rem]">
          <div
            className="flex justify-center items-center h-full cursor-pointer bg-gray-100 rounded-lg"
            onClick={() => imgRef.current?.click()}
          >
            {selectedImg ? (
              <img
                src={URL.createObjectURL(selectedImg)}
                alt="Uploaded"
                className="h-full max-h-full w-full object-cover"
              />
            ) : (
              <>
                <span>
                  <GrFormUpload size={30} />
                </span>
                click to upload
              </>
            )}
            <input
              ref={imgRef}
              type="file"
              name="img"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {busy ? (
            <Button
              className="bg-red-500 absolute top-28 right-4 md:right-10 md:top-10 px-11 py-3 font-extrabold rounded-full"
              disabled={busy as boolean}
            >
              Saving...
            </Button>
          ) : (
            <Button className="bg-red-500 absolute top-28 right-4 md:right-10 md:top-10 px-11 py-3 font-extrabold rounded-full">
              Save
            </Button>
          )}
        </div>
        <div className="flex flex-col justify-center items-center w-full px-10 space-y-10">
          <div className="w-full">
            <Input
              placeholder="Add your title"
              name="title"
              onChange={handleChange}
              // required
            />
            <label htmlFor="name" className="px-[0.5rem] text-xs text-gray-600">
              The first 40 characters that show up in your feed
            </label>
            <div className="flex items-center mt-2 gap-x-2">
              <Avatar>
                <Image
                  src={user?.image || ""}
                  width={40}
                  height={40}
                  alt="user image"
                />
              </Avatar>
              <h2>{user?.name}</h2>
            </div>
          </div>
          <Textarea
            placeholder="Tell everyone what your pin is about"
            name="description"
            className="resize-none pl-2"
            onChange={handleChange}
          />
          <Input
            placeholder="Add a tag  (cats, Tech...)"
            name="tag"
            onChange={handleChange}
          />
        </div>
      </div>
    </form>
  );
};

export default PinForm;
