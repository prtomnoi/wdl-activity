import Image from "next/image";

type Props = {
  currentNumber: number;
};

const Bar = ({ currentNumber }: Props) => {
  const numberToPercentage = (currentNumber: number) => {
    if (currentNumber <= 0) return 0;
    if (currentNumber <= 500) {
      // Interpolate between 0 and 25% for 0 to 500
      return (currentNumber / 500) * 25;
    }
    if (currentNumber <= 1000) {
      // Interpolate between 25% and 50% for 500 to 1000
      return 25 + ((currentNumber - 500) / 500) * 25;
    }
    if (currentNumber <= 2000) {
      // Interpolate between 50% and 75% for 1000 to 2000
      return 50 + ((currentNumber - 1000) / 1000) * 25;
    }
    if (currentNumber <= 3000) {
      // Interpolate between 75% and 100% for 2000 to 3000
      return 75 + ((currentNumber - 2000) / 1000) * 25;
    }
    // If the number exceeds 3000, return 100%
    return 100;
  };

  const percentage = numberToPercentage(currentNumber);

  return (
    <div className="w-full p-1 rounded-full border-4 border-primary-1 bg-[#272727]">
      <div
        className="relative bg-gradient-to-r from-primary-1 to-primary-2 h-8 rounded-full transition-all min-w-[35px] flex max-w-full"
        style={{
          width: `${percentage}%`,
        }}
      >
        <div className="relative h-full ml-auto flex justify-center items-center">
          <div className="absolute p-1.5 aspect-square h-[240%] rounded-full bg-primary-2">
            <div className="w-full h-full border-2 border-dashed border-primary-1 rounded-full" />
          </div>
          <Image
            alt="box"
            src="/box.png"
            width={997}
            height={1154}
            className="min-h-[140%] h-full w-fit relative"
          />
          <div className="text-center font-bold text-white text-[20px] leading-none absolute min-w-[250%] p-1.5 bg-primary-1 -bottom-[180%] rounded-md shadow-md">
            {currentNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bar;
