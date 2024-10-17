import classNames from "classnames";
import Image from "next/image";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";

type Props = {
  goalNumber: number;
  state: "Passed" | "Active" | "InActive";
  title: string;
  image: string;
};

const Card = ({ goalNumber, image, state, title }: Props) => {
  return (
    <div
      className={classNames(
        "w-full max-w-[160px]",
        state === "Active" && "scale-105 -translate-y-4"
      )}
    >
      <div
        className={classNames(
          "w-full aspect-square p-1.5 rounded-xl flex",
          state === "InActive"
            ? "bg-white"
            : "bg-gradient-to-br from-primary-1 to-primary-2"
        )}
      >
        <div
          className={classNames(
            "p-1 flex-auto border-2 flex flex-col gap-2 border-dashed rounded-xl",
            state === "InActive" ? "border-primary-1" : "border-white"
          )}
        >
          <div className="relative flex-auto w-full">
            <Image
              alt={title}
              src={image}
              fill
              className={classNames(
                "object-contain object-center max-h-[80%] m-auto",
                state === "InActive" && "grayscale"
              )}
            />
          </div>
          <h1
            className={classNames(
              "font-bold text-center leading-tight drop-shadow-md text-[13px]",
              state === "InActive" ? "text-primary-1" : "text-gray-600"
            )}
          >
            {title}
          </h1>
        </div>
      </div>
      <div
        className={classNames(
          "mt-2 bg-white p-2 py-1 rounded-xl border-2 w-full flex items-center gap-2 justify-center",
          state === "InActive"
            ? "text-gray-400 border-gray-400"
            : "border-primary-1 text-primary-1"
        )}
      >
        {state === "InActive" ? <FaLock size={20} /> : <FaLockOpen size={20} />}
        <span className="font-bold">{goalNumber}</span>
      </div>
    </div>
  );
};

export default Card;
