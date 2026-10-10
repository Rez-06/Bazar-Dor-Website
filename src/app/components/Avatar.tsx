import Image from "next/image";
type Props = { name: string; image?: string | null; size?: number };

const Avatar = ({ name, image, size = 40 }: Props) =>
  image ? (

    <Image
      src={image}
      alt={name}
      width={size}
      height={size}
      referrerPolicy="no-referrer"
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  ) : (
    <div
      className="rounded-full bg-[#05893E] text-white font-bold flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );

export default Avatar;