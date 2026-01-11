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
    d
    containerClassName="h-[400px] w-full rounded-lg  overflow-hidden  my-10"
    className="w-full h-full flex items-center justify-center"
  >
    <div
      className="mx-auto h-full flex rounded-3xl overflow-hidden border"
      style={{ backdropFilter: "blur(20px)" }}
    >
      {about != undefined ? (
        <>
          <div className="h-full rounded-3xl overflow-hidden">
            {" "}
            <img src={about?.imageUrl} alt="" className="h-full object-cover" />
          </div>
          <div className="h-full w-2xl p-5 flex flex-col justify-center gap-5">
            <h1
              className={`text-4xl sm:text-3xl md:text-5xl`}
              style={{ fontFamily: "Lora, serif" }}
            >
              About Me
            </h1>
            <p
              className="sm:text-xs md:text-lg"
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
            {/* <a
          href="/My Resume.pdf"
          download
          className="flex items-center mt-10 z-10 justify-center self-end sm:self-start p-2 md:py-2 border border-[var(--theme)] text-[var(--theme)] text-lg sm:text-base md:text-base bg-transparent hover:bg-[var(--theme)] active:bg-[var(--theme)] hover:text-[var(--foreground)] active:text-[var(--foreground)] transition-all duration-300 font-light cursor-pointer"
        >
          Download Resume
        </a> */}
            <div className="relative group mt-10 ">
              <div className="relative w-40 h-14 opacity-90 overflow-hidden rounded-[0.5rem] bg-black z-10 hover:scale-105 transition-all duration-300 ">
                <div className="absolute z-10 -translate-x-44 group-hover:translate-x-120 ease-in transistion-all duration-700 h-full rounded-2xl w-44 bg-linear-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 "></div>

                <div className="absolute flex items-center justify-center text-white z-1 rounded-[0.5rem] opacity-90 inset-0.5 bg-black ">
                  <a
                    href={about?.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-lg h-full opacity-90 w-full content-center text-center rounded-2xl cursor-pointer"
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
        <div className="flex flex-col items-center justify-center h-full w-2xl gap-5">
          <Spinner size={35} />
          <h1 className="text-2xl">Loading About</h1>
        </div>
      )}
    </div>
  </WavyBackground>
);
export default IntroSection;
