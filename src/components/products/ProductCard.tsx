"use client";
import { Product, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeartButton from "../HeartButton";
import { fromNow } from "@/helpers/dayjs";

interface ProductCardProps {
  data: Product;
  currentUser?: User | null;
}

const PostCard = ({ data, currentUser }: ProductCardProps) => {
  const router = useRouter();
  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/products/${data.id}`)}
    >
      <div className="relative w-full overflow-hidden aspect-square rounded-xl">
        <Image
          fill
          sizes="auto"
          className="object-cover w-full h-full transition group-hover:scale-110"
          src={data.imageSrc}
          alt="Listing"
        />
        <div className="absolute top-3 right-3">
          <HeartButton productId={data.id} currentUser={currentUser} />
        </div>
      </div>
      <div className="text-lg font-semibold">{data.title}</div>
      <div className="font-light text-neutral-500">{data.category}</div>
      <div className="flex flex-row items-center justify-between gap-1">
        <div className="flex-semibold">
          {data.price} <span className="font-light">원</span>
        </div>
        <div>{fromNow(data.createAt)}</div>
      </div>
    </div>
  );
};

export default PostCard;
