import React from "react";

interface AnimatedCardProps {
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export default function App({ frontContent, backContent }: AnimatedCardProps) {
  const customStyles = `

.container {
  background: var(--bg-primary);
  --gap: 5em;
  --line: 1px;
  --color: rgba(255, 255, 255, 0.2);

  background-image: linear-gradient(
      -90deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    ),
    linear-gradient(
      0deg,
      transparent calc(var(--gap) - var(--line)),
      var(--color) calc(var(--gap) - var(--line) + 1px),
      var(--color) var(--gap)
    );
  background-size: var(--gap) var(--gap);
}

    /* Front and Back Surfaces */
    .front-blur, .back-blur {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 0.75rem;
      overflow: hidden;
      transition: all 300ms ease-in-out;
    }

    .card-container:hover .back-blur {
      filter: blur(20px);
      opacity: 0;
      z-index: 0;
    }

    .card-container:hover .front-blur {
      filter: blur(0px);
      opacity: 1;
      z-index: 10;
    }

    .back-blur {
      filter: blur(0px);
      opacity: 1;
      z-index: 10;
    }

    .front-blur {
      filter: blur(20px);
      opacity: 0;
      z-index: 0;
    }

   .back-gradient {
      border-radius: 0.75rem;
    }
   
    .back-gradient::before {
      content: "";
      position: absolute;
      inset: 0;
      padding: 2px;
      border-radius: inherit;
      background: linear-gradient(var(--theme_1), var(--theme_3), var(--theme_2));
      -webkit-mask: 
         linear-gradient(#fff 0 0) content-box, 
         linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }

    .circle-anim {
      animation: floating 10s infinite linear;
    }

    @keyframes floating {
      0% {
        transform: translate(0, 0) rotate(0deg);
      }
      25% {
        transform: translate(20px, 20px) rotate(90deg);
      }
      50% {
        transform: translate(0, 40px) rotate(180deg);
      }
      75% {
        transform: translate(-20px, 20px) rotate(270deg);
      }
      100% {
        transform: translate(0, 0) rotate(360deg);
      }
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div className="card-container w-60 h-80 relative group rounded-xl shadow-2xl">
        <div className="h-full w-full shadow-xl shadow-[#000000ee] rounded-xl relative">
          <div className="back-blur back-gradient flex justify-center items-center bg-[#151515]">
            <div className="absolute inset-0 back-gradient rounded-xl" />

            <div className="container absolute w-[99%] h-[99%] bg-[#0f0f0f] rounded-2xl text-white flex flex-col justify-center items-center gap-8 p-4">
              {frontContent || (
                <>
                  <h2 className="text-2xl font-bold">Front Side</h2>
                  <p className="text-center text-sm text-gray-400">
                    Hover to see the blur transition effect
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="front-blur bg-[#151515] text-white">
            <div className="img absolute w-full h-full overflow-hidden rounded-xl">
              <div
                className="circle-anim rounded-full bg-blue-500 w-[90px] h-[90px] relative"
                style={{ filter: "blur(40px)" }}
              ></div>
              <div
                className="circle-anim rounded-full bg-cyan-400 w-[30px] h-[30px] relative"
                style={{
                  left: "160px",
                  top: "-80px",
                  animationDelay: "-1800ms",
                  filter: "blur(25px)",
                }}
              ></div>
              <div
                className="circle-anim rounded-full bg-purple-500 w-[150px] h-[150px] relative"
                style={{
                  left: "50px",
                  top: "0px",
                  animationDelay: "-800ms",
                  filter: "blur(50px)",
                }}
              ></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-20">
              {backContent || (
                <>
                  <h2 className="text-2xl font-bold mb-4">Back Side</h2>
                  <p className="text-center text-sm text-gray-300">
                    Beautiful blue gradient background with animated blur
                    effects
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
