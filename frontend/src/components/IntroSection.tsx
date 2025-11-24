import { HighlightText } from "./ui/shadcn-io/highlight-text";
import { WavyBackground } from "./ui/shadcn-io/wavy-background";
const IntroSection = () => (
  <WavyBackground
    backgroundFill="black"
    colors={["#38bdf8", "#818cf8", "#c084fc"]}
    waveWidth={30}
    blur={8}
    speed="fast"
    waveOpacity={0.3}
    containerClassName="h-[400px] w-full rounded-lg  overflow-hidden  my-10"
    className="w-full h-full flex items-center justify-center"
  >
    <div
      className="mx-auto h-full flex rounded-3xl overflow-hidden border"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className="h-full rounded-3xl overflow-hidden">
        {" "}
        <img
          src="/assets/pics/my-img.jpg"
          alt=""
          className="h-full object-cover"
        />
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
          , I’m a developer focused on building fast, responsive, and accessible
          web applications using React, Next.js, and Tailwind CSS. Aspriring
          Full stack developer, I love writing clean code, learning new things,
          and creating experiences users enjoy.
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
            <div className="absolute z-10 -translate-x-44 group-hover:translate-x-[30rem] ease-in transistion-all duration-700 h-full rounded-2xl w-44 bg-gradient-to-r from-gray-500 to-white/10 opacity-30 -skew-x-12 "></div>

            <div className="absolute flex items-center justify-center text-white z-[1] rounded-[0.5rem] opacity-90 inset-0.5 bg-black ">
              <a className="font-semibold text-lg h-full opacity-90 w-full content-center text-center rounded-2xl cursor-pointer">
                RESUME
              </a>
            </div>
            <div className="absolute duration-1000 group-hover:animate-spin w-full h-[100px] bg-gradient-to-r from-blue-500 to-purple-500 blur-[30px]"></div>
          </div>
        </div>
      </div>
    </div>
  </WavyBackground>
);
export default IntroSection;
