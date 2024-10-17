"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useRegister } from "@/lib/action";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { useTrigger } from "./trigger";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type schemaData = z.infer<typeof schema>;

const RegisForm = () => {
  const router = useRouter();
  const [isSucessOpen, setSucessOpen] = useState(false);
  const { inc } = useTrigger();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<schemaData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const onSubmit: SubmitHandler<schemaData> = async (data) => {
    try {
      const result = await useRegister(data.email);
      if (result && "data" in result && result.data) {
        setSucessOpen(true);
        reset();
        inc();
      } else if (!result || "message" in result) {
        const errors = (result as any).message;
        if (
          errors &&
          errors.includes("This email has already been registered 6 times.")
        ) {
          toast.error(errors, {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          });
        }
      } else {
        toast.error("Connection Failed, Try Again Later", {
          position: "top-center",
          autoClose: 2000,
          transition: Bounce,
        });
      }
    } catch (error: unknown) {
      toast.error("An unexpected error occurred.", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-wrap items-center justify-center gap-4 w-full max-w-[700px] mx-auto"
      >
        <div className="flex items-center gap-2 w-full">
          <p className="font-bold text-[24px] drop-shadow-[1px_1px_0px_#DF8C01] md:drop-shadow-[3px_3px_0px_#DF8C01] md:text-[40px] text-primary-1 leading-none">
            Email:
          </p>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email to register."
            className="px-4 py-2 rounded-full w-full border-primary-1 border-2"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-1 rounded-full p-1 w-fit drop-shadow-[4px_3px_0px_#DF8C01] text-[17px] font-bold text-white"
        >
          <p className="w-full h-full py-2 px-5 border-2 border-white border-dashed rounded-full leading-none">
            Submit
          </p>
        </button>
      </form>
      <Dialog open={isSucessOpen} onOpenChange={setSucessOpen}>
        <DialogContent className="border-none dialog-content p-2 min-h-[200px] w-full max-w-[800px]">
          <div className="m-2 p-4 py-8 border-2 border-primary-1 rounded-lg flex">
            <div className="text-center m-auto">
              <div className="w-full relative flex items-center justify-center">
                <Image
                  alt="Confetti"
                  src="/confetti.png"
                  width={993}
                  height={236}
                  className="absolute min-w-[130%]"
                />
                <Image
                  alt="Succes"
                  src="/success.png"
                  width={963}
                  height={129}
                  className="min-w-[120%] relative"
                />
              </div>
              <p className="text-primary-1 text-[25px] font-bold">
                Thank you for registering!
              </p>
              <DialogTrigger className="px-4 py-2 rounded-lg bg-primary-1 text-white font-bold mt-6">
                CLOSE
              </DialogTrigger>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RegisForm;
