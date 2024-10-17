"use client";
import { items } from "@/constants";
import Bar from "./Bar";
import Card from "./Card";
import Carousel from "react-multi-carousel";
import { useQuery } from "@tanstack/react-query";
import { getCount } from "@/lib/action";
import { useEffect } from "react";
import { useTrigger } from "./trigger";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

const Progress = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Count"],
    queryFn: async () => await getCount(),
  });
  const { trigger } = useTrigger();

  useEffect(() => {
    refetch();
  }, [trigger]);

  if (isLoading)
    return (
      <div className="w-full relative mx-auto max-w-[1400px] mt-[5vh] pt-[320px] mb-[5vh] px-[90px] flex items-center justify-center">
        <p className="animate-pulse text-[clamp(1rem,5vw,30px)] font-bold text-primary-1 drop-shadow-sm px-4 py-2 bg-white rounded-xl">
          Loading...
        </p>
      </div>
    );

  if (isError || !data)
    return (
      <div className="w-full relative mx-auto max-w-[1400px] mt-[5vh] pt-[320px] mb-[5vh] px-[90px] flex items-center justify-center">
        <p className="text-[clamp(1rem,5vw,30px)] font-bold text-primary-1 drop-shadow-sm px-4 py-2 bg-white rounded-xl">
          Unexpected Error occured please try again.
        </p>
      </div>
    );

  const currentNumber = data.total_count;
  const maxNumber = 3000;

  return (
    <>
      <div className="w-full relative mx-auto max-w-[1400px] mt-auto pt-[320px] mb-[6vh] px-[90px] hidden xl:block">
        <div className="w-full relative flex px">
          {items.map(({ goalNumber, image, title, position }, index) => {
            const isLastItem = index === items.length - 1;

            return (
              <div
                key={title}
                className="absolute bottom-3 min-w-[160px]"
                style={{
                  transform: "translateX(-50%)",
                  left: `${(position / maxNumber) * 100}%`,
                }}
              >
                <Card
                  goalNumber={goalNumber}
                  image={image}
                  title={title}
                  state={
                    currentNumber >= goalNumber &&
                    (isLastItem || currentNumber < items[index + 1].goalNumber)
                      ? "Active"
                      : currentNumber > goalNumber
                      ? "Passed"
                      : "InActive"
                  }
                />
              </div>
            );
          })}
        </div>
        <Bar currentNumber={currentNumber} />
      </div>
      <div className="mt-auto mb-[5vh] xl:hidden w-full space-y-8 relative">
        <Carousel
          responsive={responsive}
          className="w-full"
          infinite
          itemClass="justify-center flex"
        >
          {items.map(({ goalNumber, image, title }, index) => {
            const isLastItem = index === items.length - 1;
            return (
              <div key={title} className="pt-10">
                <Card
                  goalNumber={goalNumber}
                  image={image}
                  title={title}
                  state={
                    currentNumber >= goalNumber &&
                    (isLastItem || currentNumber < items[index + 1].goalNumber)
                      ? "Active"
                      : currentNumber > goalNumber
                      ? "Passed"
                      : "InActive"
                  }
                />
              </div>
            );
          })}
        </Carousel>
        <div className="p-2 bg-primary-1 rounded-lg font-bold w-fit mx-auto text-[20px]">
          <div className="p-1 w-full border-white border border-dashed text-white px-4">
            <p>Registered : {currentNumber}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Progress;
