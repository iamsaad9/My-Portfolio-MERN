import { HighlightText } from "../ui/shadcn-io/highlight-text";
import { WavyBackground } from "../ui/shadcn-io/wavy-background";
import { Spinner } from "../ui/Spinner";

interface About {
  bio: string;
  imageUrl: string;
  resumeUrl: string;
}

const IntroSection = ({ about }: { about: About | undefined }) => (
  <WavyBackground
    backgroundFill="black"
    colors={["#38bdf8", "#818cf8", "#c084fc"]}
    waveWidth={30}
    blur={8}
    speed="fast"
    waveOpacity={0.3}
    containerClassName="md:h-[400px]  w-full rounded-lg overflow-hidden"
    className="sm:w-[44rem] lg:w-[50rem] xl:w-[56rem]   flex items-center justify-center"
  >
    <div
      className="h-full rounded-3xl overflow-hidden flex flex-col-reverse sm:flex-row "
      style={{ backdropFilter: "blur(20px)" }}
    >
      {about != undefined ? (
        <>
          <div className="max-h-[24rem] sm:h-auto sm:w-[50%] overflow-hidden">
            <img
              src={about?.imageUrl}
              alt="saadmasood"
              className="h-full w-full object-cover object-top"
            />
          </div>
          <div className="h-full w-full p-5 flex flex-col justify-center gap-5">
            <h1
              className={`text-4xl sm:text-3xl md:text-4xl lg:text-5xl`}
              style={{ fontFamily: "Lora, serif" }}
            >
              About Me
            </h1>
            <p
              className="text-lg sm:text-sm md:text-base xl:text-lg"
              style={{ fontFamily: "Poiret One, sans-serif" }}
            >
              Hi, I am{" "}
              <HighlightText
                text="Saad"
                inView={true}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              . {about?.bio}
            </p>

            <div className="relative group lg:mt-5 ">
              <div className="relative w-26 md:w-30 lg:w-32 h-10 lg:h-12  opacity-90 overflow-hidden rounded-[0.5rem] bg-black z-10 hover:scale-105 transition-all duration-300 ">
                <div className="absolute z-10 -translate-x-44 group-hover:translate-x-120 ease-in transistion-all duration-700 h-full rounded-2xl w-44 bg-linear-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 "></div>

                <div className="absolute flex items-center justify-center text-white z-1 rounded-[0.5rem] opacity-90 inset-0.5 bg-black ">
                  <a
                    href={about?.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-sm md:text-base lg:text-lg h-full opacity-90 w-full content-center text-center rounded-2xl cursor-pointer"
                  >
                    RESUME
                  </a>
                </div>
                <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-linear-to-r from-blue-500 to-purple-500 blur-[30px]"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center  h-full w-2xl gap-5">
          <Spinner size={35} />
          <h1 className="text-2xl">Loading About</h1>
        </div>
      )}
    </div>
  </WavyBackground>
);
export default IntroSection;
